import React from "react";
import "./LogIn.css";
import {Link, Redirect} from "react-router-dom";
import $ from "jquery";

export const LogIn = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const error = sessionStorage.getItem("error");
    if (error !== null && error.match("true")) {
        let urlSearchParams = window.location.search;
        let errorMessage = "";
        for (let i = 0; i < urlSearchParams.length; i++) {
            if (urlSearchParams.charAt(i).match(/[a-zA-Z@!.-]/)) {
                errorMessage += urlSearchParams.charAt(i);
            } else if (urlSearchParams.charAt(i).match(/[%]/)) {
                errorMessage += " ";
            }
        }
        if (errorMessage.includes("email") || errorMessage.includes("username")) {
            $("#warningEmail").text(errorMessage).show();
            $("#warningPassword").hide();
        } else {
            $("#warningEmail").hide();
            $("#warningPassword").text(errorMessage).show();
        }
        sessionStorage.setItem("error", "false");
    }


    const handleSignIn = (event) => {
        event.preventDefault();

        let emailUsernameData = event.target.inputEmailUsername.value;
        let passwordData = event.target.inputPassword.value;

        const userLogInData = {
            usernameOrEmail: emailUsernameData,
            password: passwordData
        };
        props.logIn(userLogInData);
    };
    if (currentUser === null) {
        return (
            <div className="container">
                <br/>
                <br/>
                <div className="d-flex justify-content-center h-100">
                    <div className="card card-signin bg-dark">
                        <div className="card-header">
                            <h3>Log In</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSignIn}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control"
                                           placeholder="Email or username"
                                           required
                                           id={"inputEmailUsername"}
                                           name={"inputEmailUsername"}/>
                                </div>
                                <p className="text-warning" id={"warningEmail"} style={{display: 'hidden'}}></p>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control"
                                           placeholder="Password"
                                           required
                                           id={"inputPassword"}
                                           name={"inputPassword"}/>
                                </div>
                                <p className="text-warning" id={"warningPassword"} style={{display: 'hidden'}}></p>
                                <div className="row align-items-center remember">
                                    <input type="checkbox"/>Remember Me
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Login" className="btn login_btn"/>
                                </div>

                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<Link to={"/register"}>Register</Link>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link to={"/change-password"}>Forgot your password?</Link>
                                </div>
                            </form>
                            {/*<div className="card-footer">*/}
                            {/*    <div className="d-flex justify-content-center links">*/}
                            {/*        Don't have an account?<Link to={"/register"}>Register</Link>*/}
                            {/*    </div>*/}
                            {/*    <div className="d-flex justify-content-center">*/}
                            {/*        <Link to={"/change-password"}>Forgot your password?</Link>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to={"/profile"}/>
    }

};