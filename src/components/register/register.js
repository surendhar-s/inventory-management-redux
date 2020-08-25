import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import Axios from 'axios';
import bcrypt from 'bcryptjs'
import LoadingOverlay from 'react-loading-overlay'

class Register extends Component {

    flag = false;
    constructor(porps) {
        super(porps)
        this.state = {
            email: null,
            password: null,
            name: null,
            isValidPassword: false,
            isValidEmail: false,
            isNewEmail: false,
            isAllFieldFilled: false,
            isDataLoading: false
        }
    }

    setEmailValue = (e) => {
        this.setState({ email: e.target.value })
    }

    setPasswordValue = async (e) => {
        this.setState({ password: e.target.value })
    }

    setNameValue = (e) => {
        this.setState({ name: e.target.value })
    }

    async checkFileds() {
        if (this.state.name !== null && this.state.email !== null && this.state.password !== null) {
            this.setState({ isAllFieldFilled: true })
            await this.checkUserEmail()
            if (this.state.password.length >= 5) {
                this.setState({ isValidPassword: true })
            }
            else {
                this.setState({ isValidPassword: false })
            }
            if ((this.state.email.indexOf('@') !== -1) && (this.state.email.indexOf('.') !== -1)) {
                this.setState({ isValidEmail: true })
            }
            else {
                this.setState({ isValidEmail: false })
            }
            if (this.state.isValidEmail && this.state.isValidPassword) {
                return true
            }
        }
        else {
            this.setState({ isAllFieldFilled: false })
            return false
        }
    }
    checkUserEmail = async () => {
        const data = await Axios.get("http://localhost:3001/userDb?email=" + this.state.email)
        if (data.data.length === 0) {
            this.setState({
                isNewEmail: true
            })
        }
        else {
            this.setState({
                isNewEmail: false
            })
        }
    }

    handleSubmit = async () => {
        this.setState({
            isDataLoading: true
        })
        this.flag = true
        if (await this.checkFileds() && this.state.isNewEmail) {
            const details = {
                name: this.state.name,
                password: await bcrypt.hash(this.state.password, 12),
                // password: this.state.password,
                email: this.state.email
            }
            await Axios.post("http://localhost:3001/userDb", details)
            // console.log(data);
            this.setState({
                isDataLoading: false
            }, () => {
                this.props.history.replace("/login");
            })
        }
        this.setState({
            isDataLoading: false
        })
    }

    render() {
        return (
            <div className="form-container">
                <LoadingOverlay
                    active={this.state.isDataLoading}
                    spinner
                    text="Please wait..."
                >
                    <div className="con">
                        <header className="head-form login-header">
                            <h2>Sign up</h2>
                            <p>Sign up here using mail ID</p>
                        </header>
                        <br />
                        <div>
                            <input className="form-input" type="text" placeholder="Name*" onChange={this.setNameValue} required />
                            <br />
                            <input className="form-input" type="email" placeholder="Email*" onChange={this.setEmailValue} required />
                            <br />
                            <input className="form-input" type="password" placeholder="Password*" id="pwd" name="password" onChange={this.setPasswordValue} required />
                            <br />
                            <button className="button log-in" type="submit" onClick={this.handleSubmit}> Sign up </button>
                        </div>
                        <div>
                            {this.flag ? <div>{this.state.isAllFieldFilled ? <div>
                                {this.state.isValidPassword ? <div>
                                    {this.state.isValidEmail ? <div>
                                        {this.state.isNewEmail ? <div></div> : <div><span style={{ color: "red" }}>Email already registered.</span></div>}
                                    </div> : <div><span style={{ color: "red" }}>Please enter valid email</span></div>}
                                </div> : <div><span style={{ color: "red" }}>Password should have a minimum of 5 characters</span></div>}
                            </div> : <div><span style={{ color: "red" }}>Please fill all mandatory fields</span></div>}</div> : <div></div>}
                        </div>
                        <div>
                            <Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: "/login" }} ><button className="button sign-up">Login</button></Link>
                        </div>
                    </div>
                </LoadingOverlay>
            </div>
        );
    }
}

export default Register;