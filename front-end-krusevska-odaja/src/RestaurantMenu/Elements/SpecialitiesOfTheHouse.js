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

export const SpecialitiesOfTheHouse = (props) => {
    let specialitiesOfTheHouseImages = [beansSoup, krushevskaSabja, macedonianPan, stuffedPorkTenderloin
        , traditionalMeat, porkMeatOnGrill];
    const specialitiesOfTheHouse = props.splitProducts("SPECIALITIES", specialitiesOfTheHouseImages);
    return (
        <div className="container">
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
            <br/>
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