import React from "react";
import $ from "jquery";
import "../element-css/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import jagneskiSirden from "../element-images/DishesToOrderImages/jagneshkiSirdenOdaja.jpg";
import beanSoupWithFish from "../element-images/DishesToOrderImages/beanSoupWithVealOdaja.png";
import lambPotOdaja from "../element-images/DishesToOrderImages/lambPotOdaja.jpg";
import sarmaOdaja from "../element-images/DishesToOrderImages/sarmaOdaja.jpg";
import traditionalPanOdaja from "../element-images/DishesToOrderImages/traditionalPanOdaja.jpg";
import {Link} from "react-router-dom";

export const DisheshToOrder = (props) => {
    let disheshToOrderImages = [beanSoupWithFish, "", sarmaOdaja, traditionalPanOdaja, lambPotOdaja, jagneskiSirden];
    const dishesToOrder = props.splitProducts("DIESHESTOORDER", disheshToOrderImages, "dishes-to-order");
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (
        <div className="container" id="restaurant-element">
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
                        {dishesToOrder}
                    </ul>
                </div>
            </div>
        </div>
    )
};