import React from "react";
import {Link, Redirect} from "react-router-dom";
import $ from "jquery";

export const UpdateProfile = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const error = sessionStorage.getItem("error");
    if (error !== null && error.match("true")) {
        let urlSearchParams = window.location.search;
        let errorMessage = "";
        for (let i = 0; i < urlSearchParams.length; i++) {
            if (urlSearchParams.charAt(i).match(/[a-zA-Z.!]/)) {
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
    const handleUpdate = (event) => {
        event.preventDefault();

        let fullName = event.target.inputFullName.value;
        let username = event.target.inputUsername.value;
        let email = event.target.inputEmail.value;
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
        if (!validateData(fullName, username, email)) {
            return;
        }

        const userUpdateData = {
            id: currentUser.id,
            name: fullName,
            username: username,
            email: email,
            phoneNumber: numbers,
            termsChecked: policyAndTerms
        };
        props.update(userUpdateData);
    };
    const validateData = (fullName, username, email) => {
        if (fullName.trim() === "") {
            $("#warningFullName").text("The field must not be empty!").show();
            return false;
        } else {
            $("#warningFullName").text("").hide();
        }

        if (username.trim() === "") {
            $("#warningUsername").text("The field must not be empty!").show();
            return false;
        } else {
            $("#warningUsername").text("").hide();
        }

        if (email.trim() === "") {
            $("#warningEmail").text("The field must not be empty!").show();
            return false;
        } else {
            $("#warningEmail").text("").hide();

        }
        return true;
    };
    if (currentUser !== null) {
        let counter = 1;
        const phoneNumberTds = currentUser.phoneNumber.map((number, key) => {
            return (
                <input type="tel" className="form-control"
                       placeholder={number.phoneNumber}
                       required
                       id={"inputPhoneNumber" + counter}
                       name={"inputPhoneNumber" + counter++}
                       pattern="[07]{2}[0-9]{1} [0-9]{3} [0-9]{3}"
                       key={key}
                       style={{marginBottom: 5}}/>
            )
        });
        return (
            <div className="container" style={{marginTop:80}}>
                <br/>
                <br/>
                <div className="d-flex justify-content-center h-100">
                    <div className="card card-signin bg-dark">
                        <div className="card-header">
                            <h3>Update profile</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control"
                                               placeholder={currentUser.name}
                                               required
                                               id={"inputFullName"}
                                               name={"inputFullName"}/>
                                        <p className="text-warning" id={"warningFullName"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>

                                    <div className="col-md-6">
                                        <input type="text" className="form-control"
                                               placeholder={currentUser.username}
                                               required
                                               id={"inputUsername"}
                                               name={"inputUsername"}/>
                                        <p className="text-warning" id={"warningUsername"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>

                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-11">
                                        <input type="email" className="form-control"
                                               placeholder={currentUser.email}
                                               required
                                               id={"inputEmail"}
                                               name={"inputEmail"}/>
                                        <p className="text-warning" id={"warningEmail"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>
                                    <div className="col-md-1">
                                        <i className="fa fa-warning" style={{color:'red'}}
                                        title={"This field is to make sure you dont use another's email." +
                                        " Please enter your email."}></i>
                                    </div>

                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p style={{color: 'white'}}>Enter the phone numbers:</p>
                                    </div>
                                    <div className="col-md-6">
                                        {phoneNumberTds}
                                    </div>

                                </div>
                                <div className="row justify-content-end rowPhoneNumber2">

                                </div>

                                <div className="row align-items-center remember">
                                    <input type="checkbox" id={"inputPolicyAndTerms"} name={"inputPolicyAndTerms"}/>Policy
                                    and terms
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Update" className="btn login_btn"/>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Want to change password?<Link to={"/change-password"}>Change password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to={"/log-in"}/>
    }
};