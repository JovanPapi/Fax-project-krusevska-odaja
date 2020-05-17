import React from "react";
import {Link, Redirect} from "react-router-dom";
import $ from "jquery";

export const ChangePassword = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const error = sessionStorage.getItem("error");
    if (error !== null && error.match("true")) {
        let urlSearchParams = window.location.search;
        let errorMessage = "";
        for (let i = 0; i < urlSearchParams.length; i++) {
            if (urlSearchParams.charAt(i).match(/[a-zA-Z!.]/)) {
                errorMessage += urlSearchParams.charAt(i);
            } else if (urlSearchParams.charAt(i).match(/[%]/)) {
                errorMessage += " ";
            }
        }
        if (errorMessage.includes("email")) {
            $("#warningEmail").text(errorMessage).show();
        } else {
            $("#warningEmail").hide();
        }
        sessionStorage.setItem("error", "false");
    }

    function handlePasswordChange(event) {
        event.preventDefault();

        let email = event.target.inputEmail.value;
        let password = event.target.inputPassword.value;
        let confirmPassword = event.target.inputConfirmPassword.value;

        if (!validateData(email, password, confirmPassword)) {
            return;
        }

        const userChangePasswordData = {
            userId: currentUser.id,
            email: email,
            oldPassword: currentUser.password,
            newPassword: password
        };
        props.changePassword(userChangePasswordData);
    }

    function validateData(email, password, confirmPassword) {
        if (!confirmPassword.match(password)) {
            $("#warningConfirmPassword").text("Confirm password doesnt match!" +
                " Please confirm the above password correctly").show();
            return false;
        } else {
            $("#warningConfirmPassword").text("").hide();
        }
        return true;

    }

    if (currentUser !== null) {
        return (
            <div className="container" style={{marginTop: 80}}>
                <br/>
                <br/>
                <div className="d-flex justify-content-center h-100">
                    <div className="card card-signin bg-dark">
                        <div className="card-header">
                            <h3>Change password</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handlePasswordChange}>
                                <br/>
                                <div className="row">
                                    <div className="col-md-11">
                                        <input type="email" className="form-control"
                                               placeholder="Email"
                                               required
                                               id={"inputEmail"}
                                               name={"inputEmail"}/>
                                        <p className="text-warning" id={"warningEmail"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>
                                    <div className="col-md-1">
                                        <i className="fa fa-warning" style={{color: 'red'}}
                                           title={"This field is to make sure you dont use another's email." +
                                           " Please enter your email."}></i>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-11">
                                        <input type="password" className="form-control"
                                               placeholder="Password"
                                               required
                                               id={"inputPassword"}
                                               name={"inputPassword"}/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-11">
                                        <input type="password" className="form-control"
                                               placeholder="Confirm password"
                                               required
                                               id={"inputConfirmPassword"}
                                               name={"inputConfirmPassword"}/>
                                        <p className="text-warning" id={"warningConfirmPassword"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>

                                </div>
                                <br/>
                                <div className="form-group">
                                    <input type="submit" value="Change" className="btn login_btn"/>
                                </div>
                            </form>
                        </div>
                        {/*<div className="card-footer">*/}
                        {/*    <div className="d-flex justify-content-center">*/}
                        {/*        Want to update your profile?<Link to={"/profile/update"}>UpdateProfile profile</Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to={"/log-in"}/>
    }

};