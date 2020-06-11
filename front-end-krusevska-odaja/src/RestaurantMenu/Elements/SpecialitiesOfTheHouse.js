import React from "react";
import $ from "jquery";
import "../ElementCss/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import krushevskaSabja from "../ElementImages/SpecialitiesOfTheHouseImages/krusevskaSabjaOdaja.jpg";
import stuffedPorkTenderloin from "../ElementImages/SpecialitiesOfTheHouseImages/stuffedPorkTenderloin.jpg";
import macedonianPan from "../ElementImages/SpecialitiesOfTheHouseImages/macedonianPan.jpg";
import traditionalMeat from "../ElementImages/SpecialitiesOfTheHouseImages/traditionalMeat.jpg";
import porkMeatOnGrill from "../ElementImages/SpecialitiesOfTheHouseImages/porkMeatOnGrill.jpg";
import beansSoup from "../ElementImages/SpecialitiesOfTheHouseImages/beansSoup.jpg";
import {Link} from "react-router-dom";

export const SpecialitiesOfTheHouse = (props) => {
    let specialitiesOfTheHouseImages = [beansSoup, krushevskaSabja, macedonianPan, stuffedPorkTenderloin
        , traditionalMeat, porkMeatOnGrill];
    const specialitiesOfTheHouse = props.splitProducts("SPECIALITIES", specialitiesOfTheHouseImages, "specialities-of-the-house");
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (
        <div className="container" id="restaurant-element">
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <img src={logoMenu} style={{borderRadius: 90}} alt="Element logo" width="170px" height="170px"/>
                </div>
                <div className="col-xl-4">
                    <h1 style={{color: 'white'}}>Специјалитети на куќата / Specialities of the house</h1>
                </div>
                <div className="col-md-3">
                    <img src={logoMenu} style={{borderRadius: 90}} alt="Element logo" width="170px" height="170px"/>
                </div>
            </div>
            <br/>
            <div className="row justify-content-center">
                {currentUser !== null && currentUser.role === "Admin" ? <div className="col-md-3">
                    <Link to={"/product/create"} className="btn btn-primary mb-3">Create product</Link>
                </div> : null}
                <br/>
                <div className="col-md-3">
                    <Link to={"/my-cart"} className="btn btn-primary mb-3" style={{width: 131}}>View my cart</Link>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="[ col-xs-12 col-sm-offset-2 col-sm-9 ]">
                    <ul className="event-list">
                        {specialitiesOfTheHouse}
                    </ul>
                </div>
            </div>
        </div>
    )
};