import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./publicRouting";
import Login from "../components/login/login";
import Register from "../components/register/register";
import PrivateRoute from "./privateRouting";
import home from "../components/home/home";
import productDetailTile from "../components/productDetailTile/productDetailTile";

class Routes extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <PublicRoute component={Login} path="/login" exact />
                    <PublicRoute component={Register} path="/register" exact />
                    <PrivateRoute component={home} path="/" exact />
                    <PrivateRoute component={productDetailTile} path="/productDetail" />
                </Switch>
            </Router>
        );
    }
}

export default Routes;