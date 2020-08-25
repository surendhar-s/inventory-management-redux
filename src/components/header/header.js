import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './header.css'
import { Button } from '@material-ui/core';
class Header extends Component {
  handleLogout = () => {
    localStorage.removeItem("userId")
  }
  render() {
    return (
      <div>
        <div className="navbar-top">
          <div>
            <h2 className="title">Inventory Management</h2>
          </div>
          <div>
            <Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: "/login" }}><Button data-testid="logout-function" variant="contained" color="primary" size="small" className="logout-button" onClick={this.handleLogout}>Logout</Button></Link>
            {/* <Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: "/login" }}><button className="button logout-button" onClick={this.handleLogout}>Logout</button></Link> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
