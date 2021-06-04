import React, { useState, useEffect } from 'react';
import {useContext} from 'react';
import {ProductContext} from './productContext';
import {Link, useHistory} from "react-router-dom";
import DOMPurify from 'dompurify';

  
export default function Nav() {

    const { state, dispatch } = useContext(ProductContext);
    const { isAuth } = state;
    let history = useHistory();

    //console.log(state);
    const [productState, setProductState] = useState([]);

    useEffect(() => {
        if(state.data.length > 0)
        setProductState(state.data);
        else
        setProductState([]);

        return () => {
            setProductState([]);
        }
    }, [state.data])
    
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch({type:"UPDATEAUTH", payload: false })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch({type:"UPDATEAUTH", payload: true })
    }

    const handleOnChangeEvent = (e) => {
        e.preventDefault();
        dispatch({type:"SEARCHKEY", payload: DOMPurify.sanitize(e.target.value) })
    }

    const handleOnClickCategory = (categoryId) => {
        history.push('/home');
        dispatch({type:"SETCATEGORY", payload: Number(DOMPurify.sanitize(categoryId)) })
    }

    let content = [];
    let rowSet;

    if(productState.length >0){
    for(var i = 0; i < productState.length; i+=4) {
            rowSet = [];
            rowSet.push( productState.slice(i, i+4).map((category, n) => {
    
                return(
                      <div key={n} className="col">
                        
                        <button data-testid="category"  
                        onClick={()=>handleOnClickCategory(category.cid)} 
                        className="dropdown-item dropMenuHead">
                            {category.product}
                        </button>
                        <div className="dropdown-divider"></div>
    
                        {category.products.map( (product,pid) => {
                            return(
                                <Link data-testid="product" key={pid} className="dropdown-item" to={"/product/id="+product.id}>
                                    {product.name}
                                </Link>
                           )
                        })
                        }
                    </div>
                )
            })
            )
            content.push(rowSet.map( (itm, ro) => {return <div key={ro} className="row">{itm}</div>}))
        }//for
    }//if
    

    return (
       
        <header data-testid="header">  
            
            <nav data-testid="nav" className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link data-testid="brand" className="navbar-brand" to="/">
                    Shopi
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">Home</Link>
                        {/* <a className="nav-link" href="/">Home</a> */}
                    </li>
                    
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Products
                        </Link>
                        <div className="dropdown-menu mega-menu" aria-labelledby="navbarDropdown">
                        
                        {/* Dynamic content loading here.. */}
                        {content}
                        
                        {/* <div className="col">
                        <button onClick={()=>handleOnClickCategory(1)} 
                        data-testid="category" 
                        className="dropdown-item dropMenuHead">No Product found</button>
                        </div> */}
                          
                     </div> 
                    </li>
                    
                    </ul>
                    <form className="form-inline ml-4 my-2 my-lg-0">
                        <input data-testid="search" name="search" id="search" className="form-control mr-sm-2 home-search" type="search" placeholder="Search" aria-label="Search"
                        onChange={handleOnChangeEvent} />
                        {/* <button className="btn btn-light my-2 my-sm-0" type="submit">Search</button> */}
                    </form>

                    <ul className="navbar-nav ml-auto">
                    {!isAuth &&
                    <li className="nav-item">
                        <a data-testid="login" 
                        className="nav-link mr-4" href="#login" 
                        onClick={handleLogin}>
                            Click here to Login
                        </a>
                    </li>
                    }
                    <li className="nav-item">
                        <a className="nav-link mr-4" href="#cart">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            width="24" height="24" fill="currentColor" 
                            className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                            </svg>
                            <span className="badge badge-light cart-badge">0</span>
                        </a>
                    </li>
                    {isAuth &&
                    <li className="nav-item">
                        <a className="nav-link mr-4" href="#logout" 
                         data-testid="logout" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                        <path d="M7.5 1v7h1V1h-1z"/>
                        <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
                        </svg>
                        </a>
                    </li>
                    }
                    </ul>
                </div>
                </nav>
           
        </header>
       
    )
}
