import React from "react";
import "../LogIn/LogIn.css";
import {Link, Redirect} from "react-router-dom";
import $ from "jquery";

export const Register = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const error = sessionStorage.getItem("error");
    if (error !== null && error.match("true")) {
        let urlSearchParams = window.location.search;
        let errorMessage = "";
        let phoneNumber = 1;
        for (let i = 0; i < urlSearchParams.length; i++) {
            if (urlSearchParams.charAt(i).match(/[a-zA-Z!.]/)) {
                errorMessage += urlSearchParams.charAt(i);
            } else if (urlSearchParams.charAt(i).match(/[%]/)) {
                errorMessage += " ";
            } else if (urlSearchParams.charAt(i).match(/[34]/)) {
                phoneNumber = urlSearchParams.charAt(i);
            }
        }

        $("#warningEmail").text("").hide();
        $("#warningUsername").text("").hide();
        $("#warningPhoneNumber1").text("").hide();
        $("#warningPhoneNumber2").text("").hide();

        if (errorMessage.includes("Email")) {
            $("#warningEmail").text(errorMessage).show();
        } else if (errorMessage.includes("Username")) {
            $("#warningUsername").text(errorMessage).show();
        } else if (errorMessage.includes("number") && phoneNumber !== 1) {
            phoneNumber -= 2;
            $("#warningPhoneNumber" + phoneNumber).text(errorMessage).show();
        }
        sessionStorage.setItem("error", "false");
    }
    const handleRegister = (event) => {
        event.preventDefault();

        let fullName = event.target.inputFullName.value;
        let username = event.target.inputUsername.value;
        let email = event.target.inputEmail.value;
        let password = event.target.inputPassword.value;
        let confirmPassword = event.target.inputConfirmPassword.value;
        let phoneNumber1 = event.target.inputPhoneNumber1.value;

        let phoneNumber2 = "";
        let policyAndTerms = false;
        if ($("#inputPolicyAndTerms").is(":checked")) {
            policyAndTerms = true;
        }

        if ($("#inputPhoneNumber2").length && event.target.inputPhoneNumber2.value !== "") {
            phoneNumber2 = event.target.inputPhoneNumber2.value
        }
        let numbers = [];
        numbers.push(phoneNumber1);
        if (phoneNumber2 !== "") {
            numbers.push(phoneNumber2);
        }

        if (!validateData(email, password, confirmPassword)) {
            return;
        }
        const userRegisterData = {
            name: fullName,
            username: username,
            email: email,
            password: password,
            phoneNumber: numbers,
            termsChecked: policyAndTerms
        };
        console.log(userRegisterData);
        props.register(userRegisterData);
    };

    const validateData = (email, password, confirmPassword) => {
        if (!email.endsWith(".com")) {
            $("#warningEmail").text("The email is not correct, it must end with '.com'. Please enter a valid email.").show();
            return false;
        } else {
            $("#warningEmail").text("").hide();
        }
        if (!confirmPassword.match(password)) {
            $("#warningConfirmPassword").text("Confirm password doesnt match with the original!" +
                " Please confirm above password correctly").show();
            return false;
        } else {
            $("#warningConfirmPassword").text("").hide();
        }
        return true;
    };
    const handlePhoneNumberAdd = () => {
        let rowPhoneNumber2 = $(".rowPhoneNumber2");
        if (!$("#inputPhoneNumber2").length) {
            rowPhoneNumber2.append("<div class='col-md-6 haha'>" +
                "<input type='tel' class='form-control' " +
                "placeholder='07x xxx xxx' " +
                "id='inputPhoneNumber2' " +
                "name='inputPhoneNumber2' " +
                "pattern='[07]{2}[0-9]{1} [0-9]{3} [0-9]{3}'>" +
                "<p class='text-warning' id='warningPhoneNumber2' style='display: hidden'>" +
                "</p></div>")
        } else {
            $(".haha").remove();
        }
    };
    if (currentUser === null) {
        return (
            <div className="container" style={{marginTop:80}}>
                <br/>
                <br/>
                <div className="d-flex justify-content-center h-100">
                    <div className="card card-signin bg-dark">
                        <div className="card-header">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control"
                                               placeholder="Full Name"
                                               required
                                               id={"inputFullName"}
                                               name={"inputFullName"}/>
                                        <p className="text-warning" id={"warningFullName"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>

                                    <div className="col-md-6">
                                        <input type="text" className="form-control"
                                               placeholder="Username"
                                               required
                                               id={"inputUsername"}
                                               name={"inputUsername"}/>
                                        <p className="text-warning" id={"warningUsername"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>

                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="email" className="form-control"
                                               placeholder="Email"
                                               required
                                               id={"inputEmail"}
                                               name={"inputEmail"}/>
                                        <p className="text-warning" id={"warningEmail"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>

                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="password" className="form-control"
                                               placeholder="Password"
                                               required
                                               id={"inputPassword"}
                                               name={"inputPassword"}/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12">
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <p style={{color: 'white'}}>Enter the phone numbers:</p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="tel" className="form-control"
                                               placeholder="07x xxx xxx"
                                               required
                                               id={"inputPhoneNumber1"}
                                               name={"inputPhoneNumber1"}
                                               pattern="[07]{2}[0-9]{1} [0-9]{3} [0-9]{3}"/>
                                        <p className="text-warning" id={"warningPhoneNumber1"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>

                                </div>
                                <div className="pull-right">
                                    <i className="fa fa-plus-circle" style={{color: 'white'}}
                                       onClick={handlePhoneNumberAdd}></i>
                                </div>
                                <br/>
                                <div className="row justify-content-end rowPhoneNumber2">

                                </div>

                                <div className="row align-items-center remember">
                                    <input type="checkbox" id={"inputPolicyAndTerms"} name={"inputPolicyAndTerms"}/>Policy
                                    and terms
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Register" className="btn login_btn"/>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Already have an account?<Link to={"/log-in"}>Log in</Link>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Link to={"/change-password"}>Forgot your password?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to={"/profile"}/>
    }
};