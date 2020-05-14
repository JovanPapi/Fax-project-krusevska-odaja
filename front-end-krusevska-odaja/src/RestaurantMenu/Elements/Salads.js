import React from "react";
import $ from "jquery";
import "../ElementCss/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";
import season from "../ElementImages/SaladImages/season.jpg";
import shopska from "../ElementImages/SaladImages/shopska.jpg";
import macedonian from "../ElementImages/SaladImages/macedonian.jpg";
import egejska from "../ElementImages/SaladImages/egejska-greek.jpg";
import mimoza from "../ElementImages/SaladImages/mimoza.jpg";
import tarator from "../ElementImages/SaladImages/tarator.jpg";
import ovcharska from "../ElementImages/SaladImages/ovcharska.jpg";
import ovchavina from "../ElementImages/SaladImages/ovchavina.jpg";
import turshija from "../ElementImages/SaladImages/turshija.jpg";

export const Salads = (props) => {
    let saladImages = [egejska, macedonian, mimoza, ovchavina, ovcharska, season, tarator, turshija, shopska];
    const salads = props.splitProducts("SALAD", saladImages);
    return (
        <div className="container">
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <img src={logoMenu} style={{borderRadius: 90}} alt="Element logo" width="170px" height="170px"/>
                </div>
                <div className="col-xl-4">
                    <h1 style={{color: 'white'}}>Салати / Salads</h1>
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
                        {salads}
                    </ul>
                </div>
            </div>
        </div>
    )
};