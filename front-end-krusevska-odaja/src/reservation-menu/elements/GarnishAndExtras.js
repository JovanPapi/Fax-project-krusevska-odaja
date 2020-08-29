import React from "react";
import $ from "jquery";
import "../element-css/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import garnish from "../element-images/GarnishAndExtrasImages/garnish.jpg";
import roastBread from "../element-images/GarnishAndExtrasImages/roastBread.jpg";
import roastBreadWithCheese from "../element-images/GarnishAndExtrasImages/roastBreadWithCheese.jpg";
import fries from "../element-images/GarnishAndExtrasImages/fries.jpg";
import friesWithCheese from "../element-images/GarnishAndExtrasImages/friesWithCheese.jpg";
import breadPiece from "../element-images/GarnishAndExtrasImages/breadPiece.jpg";
import hotPepper from "../element-images/GarnishAndExtrasImages/hotPepper.jpg";
import {Link} from "react-router-dom";


export const GarnishAndExtras = (props) => {
    let garnishAndExtrasImages = [garnish, hotPepper, roastBread, roastBreadWithCheese, breadPiece, fries, friesWithCheese];
    const garnishAndExtras = props.splitProducts("GARNISHANDEXTRAS", garnishAndExtrasImages, "garnish-and-extras");
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (
        <div className="container" id="restaurant-element">
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <img src={logoMenu} style={{borderRadius: 90}} alt="Element logo" width="170px" height="170px"/>
                </div>
                <div className="col-xl-4">
                    <h1 style={{color: 'white'}}>Гарнир и екстра / Garnish and extras</h1>
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
                        {garnishAndExtras}
                    </ul>
                </div>
            </div>
        </div>
    )
};