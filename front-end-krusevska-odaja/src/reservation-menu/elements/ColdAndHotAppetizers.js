import React from "react";
import $ from "jquery";
import "../element-css/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import sheepCheese from "../element-images/ColdAndHotAppetizersImages/sheepCheese.jpg";
import hardCheese from "../element-images/ColdAndHotAppetizersImages/hardCheese.jpg";
import goatCheese from "../element-images/ColdAndHotAppetizersImages/goatCheese.jpg";
import yellowCheese from "../element-images/ColdAndHotAppetizersImages/yellowCheese.jpg";
import breadedYellowCheese from "../element-images/ColdAndHotAppetizersImages/breadedYellowCheese.jpg";
import omlette from "../element-images/ColdAndHotAppetizersImages/omlette.jpg";
import scrambledEggs from "../element-images/ColdAndHotAppetizersImages/scrambledEggs.jpg";
import chickenFingers from "../element-images/ColdAndHotAppetizersImages/chickenFingers.jpg";
import olives from "../element-images/ColdAndHotAppetizersImages/olives.jpg";
import boardOdaja from "../element-images/ColdAndHotAppetizersImages/boardOdaja.jpg";
import pie from "../element-images/ColdAndHotAppetizersImages/maznik-pie.jpg";
import pituliciWithGarlic from "../element-images/ColdAndHotAppetizersImages/pituliciWithGarlic.jpg";
import pieWithLeek from "../element-images/ColdAndHotAppetizersImages/pieWithLeek.jpg";
import pieWithSpinach from "../element-images/ColdAndHotAppetizersImages/pieWithSpinach.jpg";
import grilledMushrooms from "../element-images/ColdAndHotAppetizersImages/grilledMushrooms.jpeg";
import {Link} from "react-router-dom";


export const ColdAndHotAppetizers = (props) => {
    let coldAndHotAppetizersImages = [hardCheese, boardOdaja, yellowCheese, scrambledEggs, goatCheese, pie, olives, sheepCheese
        , omlette, grilledMushrooms, chickenFingers, pieWithLeek, pieWithSpinach, pituliciWithGarlic, breadedYellowCheese];
    const coldAndHotAppetizers = props.splitProducts("APPETIZERS", coldAndHotAppetizersImages, "cold-and-hot-appetizers");
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (
        <div className="container" id="restaurant-element">
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <img src={logoMenu} style={{borderRadius: 90}} alt="Element logo" width="170px" height="170px"/>
                </div>
                <div className="col-xl-4">
                    <h1 style={{color: 'white'}}>Ладни и топли предјадења / Cold and hot appetizers</h1>
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
                        {coldAndHotAppetizers}
                    </ul>
                </div>
            </div>
        </div>
    )
};