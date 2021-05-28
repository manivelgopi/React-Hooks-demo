import React, {useContext, useState, useEffect} from 'react';
import {
    useParams
  } from "react-router-dom";
import {ProductContext} from "./component/productContext";
import {Link} from 'react-router-dom';

export default function Product(props) {
    let {id} = useParams();
    id = id.split('id=');
    console.log(id[1]);

    const { state } = useContext(ProductContext);
    
    const initProduct = {productName:"", productId:0};
    let [selectedProduct, setSelectedProduct] = useState(initProduct);


    useEffect(() => {
        state.data.map((category, inx) => {
            return(
            category.products.map((product, pidx)=>{
                    if(product.id === id[1]){
                        setSelectedProduct( {productName:product.name, productId:product.id})
                    }
                    return null
            })    
            )               
        })

        return () => {
            //id=[];
        }
    }, [state.data, id])
   

    return (
        <div>
            <div className="row p-3">
                    <div className="col-md-4 p-2">
                        <img className="card-img-top" src="https://source.unsplash.com/collection/190727/1600x900" alt="randoe"/>
                    </div>
                    <div className="col-md-8">
                    <h1 className="display-5">{selectedProduct.productName}</h1>
                        <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                         when an unknown printer took a galley of type and scrambled it to make a type 
                         specimen book. </p>
                        <hr className="my-4"/>
                        <p>It has survived not only five centuries, 
                        but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        <Link className="btn btn-primary btn-lg" to="#" role="button">Buy Now</Link>
                    </div>
               </div>
               {/* row */}
          
        </div>
    )
}
