//Utviklet av: Gruppe 2
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authService from '../services/auth.service';

function ProtectedRouteVeileder({ component: Component, ...rest}) {

    var getAccessToken = authService.getToken();
    var getRole = authService.getRole();
    var isVeilAuth;
      
    if(getAccessToken) {
        if(getRole === '2') {
            isVeilAuth=true;
        }
        else{
            isVeilAuth=false;
        }
    }

    return (
     <Route {...rest} render={(props) => {
          if(isVeilAuth) {
              return <Component />
          } else {
              return <Redirect to={{pathname: "/", state: { from: props.location } }} />
          }
     }} />
    )
}

export default ProtectedRouteVeileder;
