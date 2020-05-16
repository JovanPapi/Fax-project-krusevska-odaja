import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import logo from "./krusevska-odaja-logo.jpg";

export const Header = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark fixed-top">
            <span className="navbar-brand pt-0 pb-0">
                <img src={logo} alt="logo" width="80px" height="70px"/>
                Krusevska Odaja
            </span>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto" style={{margin:'auto',paddingRight:100}}>
                    <li className="nav-item active">
                        <Link to={"/home"} className="nav-link" href="#">
                            <i className="fa fa-home">
                            </i>
                            Home
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to={"/menu"} className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                              role="button"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-list">
                            </i>
                            Menu
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{backgroundColor:'gray'}}>
                            <Link to={"/menu/salads"} className="dropdown-item">Салати /
                                Salads</Link>
                            <Link to={"/menu/cold-and-hot-appetizers"} className="dropdown-item">Ладни и топли
                                предјадења / Cold and hot appetizers</Link>
                            <Link to={"/menu/grill"} className="dropdown-item">Скара / Grill</Link>
                            <Link to={"/menu/garnish-and-extras"} className="dropdown-item">Гарнир и додатоци / Garnish and
                                extras</Link>
                            <Link to={"/menu/desserts-and-snacks"} className="dropdown-item">Десерти и апетисани / Desserts
                                and snacks</Link>
                            <Link to={"/menu/drinks"} className="dropdown-item">Пијалоци / Drinks</Link>
                            <div className="dropdown-divider"></div>
                            <Link to={"/menu/dishes-to-order"} className="dropdown-item">Јадења по нарачка / Dishes to
                                order</Link>
                            <Link to={"/menu/specialities-of-the-house"} className="dropdown-item">Специјалитети на
                                куќата / Specialities of the house</Link>
                            <div className="dropdown-divider"></div>
                            <Link to={"/product/suggested"} className="dropdown-item">Предложени продукти / Suggested
                                products</Link>
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
                {currentUser === null ? <ul className="navbar-nav">
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