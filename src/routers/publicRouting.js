import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import isLoggedIn from '../utils/authUtils';

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} component={props => (
            isLoggedIn() ?
                <Redirect to="/" /> :
                <Component {...props} />
        )} />
    );
};

export default PublicRoute;