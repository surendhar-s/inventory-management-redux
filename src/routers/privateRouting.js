import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLoggedIn from '../utils/authUtils';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} component={props => (
            isLoggedIn() ?
                <div>
                    {Component.WrappedComponent.name === "ProductDetailTile" ? <div>
                        {props.location.state === undefined ? <Redirect to="/" /> : <Component {...props} />}
                    </div> : <Component {...props} />}
                </div>
                :
                <Redirect to="/login" />
        )} />
    )
}

export default PrivateRoute