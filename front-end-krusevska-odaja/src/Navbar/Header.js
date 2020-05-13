import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import logo from "./krusevska-odaja-logo.jpg";

export const Header = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
            <img src={logo} alt="logo" width="80px" height="70px"/>
            <span className="navbar-brand">Krusevska Odaja</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto offset-2">
                    <li className="nav-item active">
                        <Link to={"/home"} className="nav-link" href="#">
                            <i className="fa fa-home">
                            </i>
                            Home
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-envelope-o">
                            </i>
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to={"/reservation"} className="nav-link" href="#">
                            <i className="fa fa-book">
                            </i>
                            Book a table
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/profile"} className="nav-link" href="#">
                            <i className="fa fa-user">
                            </i>
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/about-us"} className="nav-link" href="#">
                            <i className="fa fa-info-circle">
                            </i>
                            About us
                        </Link>
                    </li>
                </ul>
                {currentUser === null ? <ul className="navbar-nav ">
                    <li className="nav-item">
                        <Link to={"/register"} className="nav-link" href="#">
                            <i className="fa fa-sign-in">
                            </i>
                            Register
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/log-in"} className="nav-link">
                            <i className="fa fa-sign-in">
                            </i>
                            Log in
                        </Link>
                    </li>
                </ul> : <ul className="navbar-nav ">
                    <li className="nav-item">
                        <p className="nav-link" onClick={props.logOff}>
                            Welcome {currentUser.name}
                            <i className="fa fa-sign-out">
                            </i>
                        </p>
                    </li>
                </ul>}
            </div>
        </nav>
    )
};