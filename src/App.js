import { Route, Switch } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import Home from './home';
import Product from './product';
import PageNotFound from './pageNotFound';
import Nav from './component/nav';
import Footer from './component/footer';
import useFetch from "./component/useFetch";
import ProtectedRoute from './component/protectedRoute';
import { useContext } from "react";
import { ProductContext } from "./component/productContext";

const url = "http://localhost:8000/dbdata";


// App Component
function App() {

  const {dispatch} = useContext(ProductContext);

  const [isLoading, setisLoading] = useState(true);
  const [urlerror, setUrlerror] = useState(null);

  const { data, isLoadingData, errorData} = useFetch(url);   

  useEffect(()=>{
      if(data){
        dispatch({type:"PRODUCT",  payload:data});
      }

      setisLoading(isLoadingData);
      setUrlerror(errorData);

      return () => {
       // console.log("App Unmounted");
      }
  },[data, errorData, isLoadingData, dispatch])
    
  return (
    <div data-testid="app" id="app">
      
      { urlerror && <p> {urlerror} </p>}
      { isLoading ? <p> Loading...</p> :
       <>
       <Nav data-testid="app-nav"></Nav> 
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/product" exact component={Home} />
            {/* <Route path="/product/:id" component={Product} /> */}
            <ProtectedRoute path="/product/:id" component={Product} />
            <Route path="*" component={PageNotFound} />
         </Switch>
     </>
      }
    <Footer data-testid="app-footer"></Footer> 
    </div>
  );
}

export default App;
