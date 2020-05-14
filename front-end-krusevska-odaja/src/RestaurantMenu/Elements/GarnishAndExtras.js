import React from "react";
import $ from "jquery";
import "../ElementCss/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import garnish from "../ElementImages/GarnishAndExtrasImages/garnish.jpg";
import roastBread from "../ElementImages/GarnishAndExtrasImages/roastBread.jpg";
import roastBreadWithCheese from "../ElementImages/GarnishAndExtrasImages/roastBreadWithCheese.jpg";
import fries from "../ElementImages/GarnishAndExtrasImages/fries.jpg";
import friesWithCheese from "../ElementImages/GarnishAndExtrasImages/friesWithCheese.jpg";
import breadPiece from "../ElementImages/GarnishAndExtrasImages/breadPiece.jpg";
import hotPepper from "../ElementImages/GarnishAndExtrasImages/hotPepper.jpg";


export const GarnishAndExtras = (props) => {
    let garnishAndExtrasImages = [garnish,hotPepper,roastBread,roastBreadWithCheese,breadPiece,fries,friesWithCheese];
    const garnishAndExtras = props.splitProducts("GARNISHANDEXTRAS", garnishAndExtrasImages);
    return (
        <div className="container">
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <img src={logoMenu}  style={{borderRadius:90}} alt="Element logo" width="170px" height="170px"/>
                </div>
                <div className="col-xl-4">
                    <h1 style={{color:'white'}}>Гарнир и екстра / Garnish and extras</h1>
                </div>
                <div className="col-md-3">
                    <img src={logoMenu}  style={{borderRadius:90}} alt="Element logo" width="170px" height="170px"/>
                </div>
            </div>
            <br/>
            <br/>
            <div className="row justify-content-center">
                <div className="[ col-xs-12 col-sm-offset-2 col-sm-9 ]">
                    <ul className="event-list">
                        {garnishAndExtras}
                    </ul>
                </div>
            </div>
        </div>
    )
};