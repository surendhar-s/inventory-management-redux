import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';
import './login.css';
import bcrypt from 'bcryptjs'
import Axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      valid: false,
      dataLoading: false
    }
  }

  setEmailValue = (e) => {
    const value = e.target.value
    this.setState({ email: value })
  }

  setPasswordValue = (e) => {
    const value = e.target.value
    this.setState({ password: value })
  }

  login = async () => {
    const data = await Axios.get("https://api.jsonbin.io/b/5f564b42993a2e110d4044b8/userDb?email=" + this.state.email)
    if (data.data.length !== 0) {
      if (await bcrypt.compare(this.state.password, data.data[0].password)) {
        localStorage.setItem("userId", data.data[0].id)
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({
      dataLoading: true
    })
    if (this.state.email !== null && this.state.password !== null) {
      this.login()
        .then(res => {
          if (res === false) {
            this.setState({ valid: true })
          }
          else {
            this.props.history.replace("/");
          }
        })
        .catch(err => {
          console.log(err)
          return err
        });
    }
    this.setState({
      dataLoading: false
    })
  }

  render() {
    return (
      <div className="form-container">
        <LoadingOverlay
          active={this.state.dataLoading}
          spinner
          text='Please wait...'>
          {/* {this.renderHome()} */}
          <div className="con">
            <header className="login-header head-form">
              <h2>Log In</h2>
              <p>login here using your email and password</p>
            </header>
            <br />
            <div>
              <form>
                <input className="form-input" type="text" placeholder="Email" onChange={this.setEmailValue} required />
                <br />
                <input className="form-input" type="password" placeholder="Password" name="password" onChange={this.setPasswordValue} required />
                <br />
                <button className="button log-in" onClick={this.handleFormSubmit}> Log In </button>
              </form>
            </div>
            {this.state.valid ? <div style={{ color: "red", textAlign: "center" }}>Invaild credentials!<br /></div> : <div></div>}
            <div>
              <Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: "/register" }} ><button className="button sign-up">Sign Up</button></Link>
            </div>
          </div>
        </LoadingOverlay>
      </div>
    );
  }
}

export default Login;
