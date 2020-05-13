import React from "react";
import "./Profile.css";
import $ from "jquery";
import userProfile from "./user-profile.png";
import logo from "./krusevska-odaja-logo.jpg";
import {Redirect, Link} from "react-router-dom";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(sessionStorage.getItem("currentUser"))
        }
    }

    componentDidMount() {
        $(document).ready(function () {
            var panels = $('.user-info');
            var panelsButton = $('.dropdown-user');
            panels.hide();

            //Click dropdown
            panelsButton.click(function (event) {
                event.preventDefault();
                //get data-for attribute
                var dataFor = $(this).attr('data-for');
                var idFor = $(dataFor);

                //current button
                var currentButton = $(this);
                idFor.slideToggle(400, function () {
                    //Completed slidetoggle
                    if (idFor.is(':visible')) {
                        currentButton.html('<i class="fa fa-arrow-up text-muted"></i>');
                    } else {
                        currentButton.html('<i class="fa fa-arrow-down text-muted"></i>');
                    }
                })
            });
        });
    }

    render() {
        if (this.state.currentUser !== null) {
            const phoneNumberTds = this.state.currentUser.phoneNumber.map((number, key) => {
                return (
                    <p key={key} style={{marginTop: 15}}>{number.phoneNumber}</p>
                )
            });
            return (
                <div className="container w-50">
                    <br/>
                    <br/>
                    <div className="container-cart bg-dark">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={logo} alt="User Picture" width="70px" height="70px"/>
                            </div>
                            <div className="col-md-7" style={{color: 'white', paddingTop: 10}}>
                                <h3>Welcome to your profile!</h3>
                            </div>
                            <div className="col-md-2 dropdown-user" data-for=".user-info">
                                <i className="fa fa-arrow-down text-muted"></i>
                            </div>
                        </div>
                        <br/>
                        <div className="container user-info">
                            <div className="container-header bg-primary justify-content-center">
                                <h3>Your information</h3>
                            </div>
                            <div className="container-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src={userProfile} alt="User Picture" width="150px" height="150px"/>
                                    </div>
                                    <div className="col-xl-8">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <td>Full name:</td>
                                                <td>{this.state.currentUser.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Username:</td>
                                                <td>{this.state.currentUser.username}</td>
                                            </tr>
                                            <tr>
                                                <td>Email:</td>
                                                <td>{this.state.currentUser.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Role:</td>
                                                <td>{this.state.currentUser.role}</td>
                                            </tr>
                                            <tr>
                                                <td>Reservation:</td>
                                                <td>{this.state.currentUser.reservation === null ? "/"
                                                    :
                                                    <Link to={"/my-reservation"} type="button" className="btn btn-info">
                                                        View</Link>}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone numbers:</td>
                                                {phoneNumberTds}
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="container-footer">
                                <div className="row">
                                    <div className="col-md-4">
                                        <Link to={"/update-profile"} className="btn btn-warning">
                                            Update profile
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <Link to={"/change-password"} className="btn btn-danger">
                                            Change password
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-warning" onClick={this.props.logOff}>
                                            <i className="fa fa-sign-out"></i>
                                            Log off
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to={"/log-in"}/>
        }

    }
}