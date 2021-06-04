import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from './productContext';
import { Link } from "react-router-dom";
export default function Main() {

    const pageDefaultTitle = "Today Offer";

    const { state, dispatch } = useContext(ProductContext);
    const { searchKey, data, selectedCategoryId} = state;

    const [isLoading, setisLoading] = useState(true);
    const [productState, setProductState] = useState([]);

    const [allproducts, setAllproducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [pageTitle, setPageTitle] = useState(pageDefaultTitle);


    const clearSelectedId = () => {
        dispatch({type:"SETCATEGORY", payload: 0 });
    }

    useEffect(() => {
        if (allproducts.length > 0 && searchKey !== ""){
            setDisplayProducts(allproducts.filter( 
                product => new RegExp(searchKey.toLowerCase()).test((product.name).toLowerCase() ) ));
              
        }else if(allproducts.length > 0 && searchKey === ""){
            setDisplayProducts(allproducts);
        }
        else{
            setDisplayProducts([]);
        }  
        setisLoading(false);

        return () => {
            //cleanup
        }
    }, [searchKey, allproducts])
    
    
    useEffect(() => {
        const content=[];
        
        //console.log("selectedCategoryId:",selectedCategoryId);
      
        if(productState.length > 0){
		  productState.map((category, indx) => {
            
            if (selectedCategoryId === 0){
                setPageTitle(pageDefaultTitle);
                category.products.map( (product,pid) =>
                {
                    content.push(product);
                    if(productState.length-1 === indx && 
                        category.products.length-1 === pid){
                            setAllproducts(content);
                            //console.log("products",content);
                    }
                    return null
                })
            }//if
            else if(selectedCategoryId === category.cid){
                setPageTitle(category.product);
                category.products.map( (product,pid) =>
                {
                    content.push(product);
                    if( category.products.length-1 === pid){
                            setAllproducts(content);
                            //console.log("products",content);
                    }
                    return null
                })
            }else{

            }
            return null
          })
        }else{
            setisLoading(false);
            setAllproducts([]);
        }
        return() => {}
	}, [productState, selectedCategoryId])
    
        
    useEffect(() => {
        //console.log("Main mount call", data);
        setisLoading(true);
        setProductState(data);
        
        return () => {
            
            //console.log("Main unmount call");
        }
    }, [data]);

    return (
        <div data-testid="main" id="main">
            <div className="container"><br/>
                <div className="row">
                    <div className="col col-lg-10">
                        <h1 data-testid="pageTitle" className="display-5 text-primary">{pageTitle}</h1>
                    </div>
                    <div className="col col-lg-2">
                      { selectedCategoryId>0 &&  
                        <button 
                            onClick={clearSelectedId}
                            data-testid="categoryClose" 
                            type="button" 
                            className="close categoryClose"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>}
                    </div>
                </div> 
                {/* row */}
                <hr/>

                {isLoading && <p>Loading..</p>  }
                {/* No Product Row */}
                { !isLoading && allproducts.length === 0 ?
                <div className="row">
                    <div data-testid="nodatacard" className="col">No Product Found</div>
                </div>
                :
                <div className="row">
                    {
                       displayProducts.map((product, pidx)=>{
                                    return(
                                    <div data-testid="productcard" key={pidx+1} className="col-lg-3 col-md-3 col-xs-1 my-2">
                                        <div className="card">
                                        <Link data-testid="viewmore" to={"/product/id="+product.id} className="">
                                            <img src="https://source.unsplash.com/collection/190727/1600x900" 
                                            className="card-img-top" alt={"Random"+pidx+1} />
                                        </Link>   
                                            <div className="card-body">
                                            <div className="card-title">{product.name}</div>
                                            <p className="card-text">$ {product.id} </p>
                                            <Link data-testid="readmore" aria-label={"Read more about"+product.name} 
                                            to={"/product/id="+product.id} 
                                            className="btn btn-primary">Read more</Link>
                                        </div>
                                    </div>
                                    </div>
                                    )
                                })
                    }

                </div>
                }
                
            </div>
        </div>
    )
}

