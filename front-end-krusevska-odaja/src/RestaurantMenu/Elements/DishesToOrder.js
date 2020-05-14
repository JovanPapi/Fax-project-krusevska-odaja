import React from "react";
import $ from "jquery";
import "../ElementCss/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import jagneskiSirden from "../ElementImages/DishesToOrderImages/jagneshkiSirdenOdaja.jpg";
import beanSoupWithFish from "../ElementImages/DishesToOrderImages/beanSoupWithVealOdaja.png";
import lambPotOdaja from "../ElementImages/DishesToOrderImages/lambPotOdaja.jpg";
import sarmaOdaja from "../ElementImages/DishesToOrderImages/sarmaOdaja.jpg";
import traditionalPanOdaja from "../ElementImages/DishesToOrderImages/traditionalPanOdaja.jpg";

export const DisheshToOrder = (props) => {
    let disheshToOrderImages = [beanSoupWithFish, "", sarmaOdaja, traditionalPanOdaja, lambPotOdaja, jagneskiSirden];
    const dishesToOrder = props.splitProducts("DIESHESTOORDER", disheshToOrderImages);
    return (
        <div className="container">
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <img src={logoMenu} style={{borderRadius: 90}} alt="Element logo" width="170px" height="170px"/>
                </div>
                <div className="col-xl-4">
                    <h1 style={{color: 'white'}}>Јадења по нарачка / Dishes to order</h1>
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
                        {dishesToOrder}
                    </ul>
                </div>
            </div>
        </div>
    )
};