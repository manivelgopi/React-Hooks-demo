import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({component: Component, path, auth,  ...rest}){  
    return (
      <Route
        {...rest}
          render={(props) => auth === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
      />
    )
  }
