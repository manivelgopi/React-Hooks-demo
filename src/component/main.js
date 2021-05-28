import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from './productContext';
import { Link } from "react-router-dom";
export default function Main(props) {

    const { state } = useContext(ProductContext);
    const { searchKey, data} = state;
    //console.log(data);

    const [isLoading, setisLoading] = useState(false);
    const [productState, setProductState] = useState([]);

    const [allproducts, setAllproducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        if (allproducts.length > 0 && searchKey !== ""){
            setDisplayProducts(allproducts.filter( 
                product => new RegExp(searchKey.toLowerCase()).test((product.name).toLowerCase() ) ));
              console.log();
        }else if(allproducts.length > 0 && searchKey === ""){
            setDisplayProducts(allproducts);
        }
        else{
            setDisplayProducts([]);
        }    
        return () => {
            //cleanup
        }
    }, [searchKey, allproducts])
    
    
    useEffect(() => {
        const content=[];

        if(productState.length > 0){
		  productState.map((category, indx) => {
            category.products.map( (product,pid) =>
            {
                content.push(product);
                if(productState.length-1 === indx && 
                    category.products.length-1 === pid){
                        setAllproducts(content);
                        console.log("products",content)
                    }
                    return null
            }
            )
            return null
          })
        }else{
            setAllproducts([]);
        }
        return() => {}
	}, [productState])
    
        
    useEffect(() => {
        console.log("Main mount call", data);
        setisLoading(true);
        setProductState(data);
        setisLoading(false);

        return () => {
            setisLoading(false);
            console.log("Main unmount call");
        }
    }, [data]);

    return (
        <div id="main">
            <div className="container"><br/>
                <h1 className="display-5 text-primary">Today Offer</h1>
                <hr/>

                {isLoading && <p>Loading..</p>  }
                {/* No Product Row */}
                { !isLoading && displayProducts.length === 0 ?
                <div className="row">
                    <div className="col">No Product Found</div>
                </div>
                :
                <div className="row">

                    {
                       displayProducts.map((product, pidx)=>{
                                    return(
                                    <div key={pidx+1} className="col-lg-3 col-md-3 col-xs-1 my-2">
                                        <div className="card">
                                        <Link to={"/product/id="+product.id} className="">
                                            <img src="https://source.unsplash.com/collection/190727/1600x900" 
                                            className="card-img-top" alt={"Random"+pidx+1} />
                                        </Link>   
                                            <div className="card-body">
                                            <div className="card-title">{product.name}</div>
                                            <p className="card-text">$ {product.id} </p>
                                            <Link aria-label={"Read more about"+product.name} to={"/product/id="+product.id} className="btn btn-primary">Read more</Link>
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

