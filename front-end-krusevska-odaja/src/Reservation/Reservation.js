import React from "react";
import $ from "jquery";
import {Redirect} from "react-router-dom";

export const Reservation = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(currentUser);
    const handleReservation = (event) => {
        event.preventDefault();

        let phoneNumber = event.target.inputPhoneNumber1.value;
        let date = event.target.inputDate.value;
        // 01-09 PM == 13-21
        let time = event.target.inputTime.value;
        let tableNumber = 19;
        if (!validateData(phoneNumber)) {
            return;
        }
        const reservationData = {
            userId: currentUser.id,
            userNumber: phoneNumber,
            tableNumber: tableNumber,
            date: date,
            time: time
        };
        props.makeReservation(reservationData);
    };
    const validateData = (phoneNumber) => {
        if (!phoneNumber.match(currentUser.phoneNumber[0].phoneNumber)) {
            if (currentUser.phoneNumber[1] !== undefined && phoneNumber.match(currentUser.phoneNumber[1])) {
                $("#warningPhoneNumber1").text("").hide();
                return true;
            } else {
                $("#warningPhoneNumber1").text("This phone number doesnt match with any number of yours!" +
                    " Please enter one of your numbers.").show();
                return false;
            }
        }
        return true;
    };
    if (currentUser !== null) {
        let date = new Date();
        let year = date.getFullYear();
        // default dava minus 1 mesec, neznam zosto
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        let minDateString = year + "-" + month + "-" + day;

        let final = "";
        let currentDay = date.getDate();
        let maxPlusDays = 7;
        // neparen/paren mesec
        if (date.getMonth() % 2 === 0) {
            let maxDays = 30;
            if (currentDay + maxPlusDays > 30) {
                // maxPlusDays sekogas pogolem od razlikata megju max denovi vo mesecot i tekovniot den
                final = "0" + maxPlusDays - (maxDays - currentDay);
            } else {
                final = maxPlusDays + currentDay;
            }
        } else {
            let maxDays = 31;
            if (currentDay + maxPlusDays > 31) {
                // maxPlusDays sekogas pogolem od razlikata megju max denovi vo mesecot i tekovniot den
                final = "0" + maxPlusDays - (maxDays - currentDay);
            } else {
                final = maxPlusDays + currentDay;
            }
        }
        let maxDateString = "";

        if (final.toString().startsWith("0")) {
            maxDateString = date.getFullYear() + "-0" + (date.getMonth() + 2) + "-" + final;
        } else {
            maxDateString = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + final;
        }
        return (
            <div className="container" style={{marginTop: 80}}>
                <br/>
                <br/>
                <div className="d-flex justify-content-center h-100">
                    <div className="card card-signin bg-dark">
                        <div className="card-header">
                            <h3>Reserve a table</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleReservation}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="text" className="form-control"
                                               placeholder={currentUser.name}
                                               readOnly
                                               required
                                               id={"inputFullName"}
                                               name={"inputFullName"}/>
                                        <p className="text-warning" id={"warningFullName"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="email" className="form-control"
                                               placeholder={currentUser.email}
                                               readOnly
                                               required
                                               id={"inputEmail"}
                                               name={"inputEmail"}/>
                                        <p className="text-warning" id={"warningEmail"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>

                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-4" style={{color: 'white'}}>
                                        <p style={{fontSize: 18}}>Enter the date:</p>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="date" className="form-control"
                                               required
                                               id={"inputDate"}
                                               name={"inputDate"}
                                               min={minDateString}
                                               max={maxDateString}/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-4" style={{color: 'white'}}>
                                        <p style={{fontSize: 18}}>Enter the time:</p>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="time" className="form-control"
                                               required
                                               id={"inputTime"}
                                               name={"inputTime"}
                                               min="09:00"
                                               max="22:00"/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-4">
                                        <p style={{color: 'white'}}>Phone number for contact:</p>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="tel" className="form-control"
                                               placeholder={currentUser.phoneNumber[0].phoneNumber}
                                               required
                                               id={"inputPhoneNumber1"}
                                               name={"inputPhoneNumber1"}
                                               pattern="[07]{2}[0-9]{1} [0-9]{3} [0-9]{3}"/>
                                        <p className="text-warning" id={"warningPhoneNumber1"}
                                           style={{display: 'hidden', marginBottom: 0}}></p>
                                    </div>

                                </div>
                                <br/>
                                <div className="form-group">
                                    <input type="submit" value="Submit" className="btn login_btn"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to={"/log-in"}/>
    }
};