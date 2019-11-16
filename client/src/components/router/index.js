import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../..//services/auth';



const PrivateRoute = ({ component: Component, redirect, roles, ...rest }) => (
    <Route {...rest} render={props => {
        let currentUser = (a) => auth.currentUser(a);
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: redirect ? redirect : '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser('role')) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/login' }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)
export default PrivateRoute;