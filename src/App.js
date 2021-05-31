import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {useEffect, useReducer, useState} from 'react';
import Home from './home';
import Product from './product';
import PageNotFound from './pageNotFound';
import Nav from './component/nav';
import Footer from './component/footer';
import useFetch from "./component/useFetch";
import {ProductContext} from "./component/productContext";
import ProtectedRoute from './component/protectedRoute';

const url = "http://localhost:8000/dbdata";

const initState = {
                        token: 0,
                        userName:"Manivel",
                        data: [],
                        isAuthnticated: false,
                        searchKey:""
                  };

const reducer =(state,action) => {
    switch(action.type){
      case 'UPDATEAUTH':
        return {...state, isAuthnticated: action.payload};
      case 'PRODUCT':
        //console.log("data updated", action.payload);
        return {...state, data: action.payload };
      case 'SEARCHKEY':
        return {...state, searchKey: action.payload}
      default :
        return state;
    }
}


// App Component
function App() {

  const [state, dispatch] = useReducer(reducer, initState);

  //console.log(state, " - ", authState);

  const [isLoading, setisLoading] = useState(true);
  const [urlerror, setUrlerror] = useState(null);

  const { data, isLoadingData, errorData} = useFetch(url);   

  useEffect(()=>{
      if(data){
        //console.log("data received",data);
        dispatch({type:"PRODUCT",  payload:data});
      }

      setisLoading(isLoadingData);
      setUrlerror(errorData);

      return () => {
       // console.log("App Unmounted");
      }
  },[data, errorData, isLoadingData])
    
  return (
  <ProductContext.Provider value={{ state, dispatch}}>
      <Router>
      <div id="app">
      { urlerror && <p> {urlerror} </p>}
      { isLoading ? <p> Loading...</p> :
       <>
       <Nav></Nav> 
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/product" exact component={Home} />
            {/* <Route path="/product/:id" component={Product} /> */}
            <ProtectedRoute path="/product/:id" component={Product} />
            <Route path="*" component={PageNotFound} />
         </Switch>
      <Footer></Footer> 
      </>
      }
       
    
    </div>
    </Router>
  </ProductContext.Provider>
    
  );
}

export default App;
