import React from 'react';
import {Navigate} from 'react-router-dom';
import Header from './Header';

const ProtectedRoute = ({component: Component, ...props}) => {
  return(
    props.loggedIn ?
    <>
    <Header id="1" {...props} />
    <Component {...props} /> 
    </>
    : <Navigate to='/sign-up' replace />
  )
}

export default ProtectedRoute;