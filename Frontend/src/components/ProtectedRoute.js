//Utviklet av: Gruppe 2
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authService from '../services/auth.service';

function ProtectedRoute({ component: Component, ...rest}) {

    var getAccessToken = authService.getToken();
    var isAuth;

    if(getAccessToken) {
        isAuth=true;
    }
    else{
        isAuth=false;
    }

    return (
     <Route {...rest} render={(props) => {
          if(isAuth) {
              return <Component />
          } else {
              return <Redirect to={{pathname: "/", state: { from: props.location } }} />
          }
     }} />
    )
}

export default ProtectedRoute;
