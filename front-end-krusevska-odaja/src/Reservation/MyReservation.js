import React from "react";
import logo from "../User/Profile/krusevska-odaja-logo.jpg";
import userProfile from "../User/Profile/user-profile.png";
import {Link, Redirect} from "react-router-dom";

export const MyReservation = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const handleReservationDelete = (event) => {
        event.preventDefault();
        props.deleteReservation(currentUser.reservation.id);
    };

    if (currentUser !== null && currentUser.reservation !== null) {
        const userReservation = currentUser.reservation;
        return (
            <div className="container w-50" style={{marginTop:80}}>
                <br/>
                <br/>
                <div className="container-cart bg-dark">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={logo} alt="User Picture" width="70px" height="70px"/>
                        </div>
                        <div className="col-md-7" style={{color: 'white', paddingTop: 10}}>
                            <h3>Welcome to your reservation!</h3>
                        </div>
                        {/*<div className="col-md-2 dropdown-user" data-for=".user-info">*/}
                        {/*    <i className="fa fa-arrow-down text-muted"></i>*/}
                        {/*</div>*/}
                    </div>
                    <br/>
                    <div className="container user-info">
                        <div className="container-header bg-primary justify-content-center">
                            <h3>Reservation information</h3>
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
                                            <td>At name:</td>
                                            <td>{currentUser.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Contact phone number:</td>
                                            <td>{userReservation.userNumber}</td>
                                        </tr>
                                        <tr>
                                            <td>Table number:</td>
                                            <td>{userReservation.tableNumber}</td>
                                        </tr>
                                        <tr>
                                            <td>At date:</td>
                                            <td>{userReservation.date}</td>
                                        </tr>
                                        <tr>
                                            <td>At time:</td>
                                            <td>{userReservation.time}</td>
                                        </tr>
                                        <tr>
                                            <td>Restriction time:</td>
                                            <td>{userReservation.restrictionTime}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="container-footer">
                            <div className="row">
                                <div className="col-md-4">
                                    <button className="btn btn-warning" onClick={handleReservationDelete}>
                                        <i className="fa fa-remove"></i>
                                        Delete reservation
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
        return <Redirect to={"/reservation"}/>
    }
};