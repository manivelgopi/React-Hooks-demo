import {useContext} from "react"
import { Route, Redirect } from "react-router-dom";
import {ProductContext} from "./productContext";



export default function ProtectedRoute({component: Component, path,  ...rest}){  
 
 const { state } = useContext(ProductContext);
  
  return (
      <Route
        {...rest}
          render={(props) => state.isAuth === true
          ? <Component {...props} />
          : 
          <Redirect to={{pathname: '/', state: {from: props.location}}} />}
      />
    )
  }
