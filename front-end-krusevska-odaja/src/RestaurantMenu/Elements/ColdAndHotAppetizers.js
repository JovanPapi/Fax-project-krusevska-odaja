import React from "react";
import $ from "jquery";
import "../ElementCss/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import sheepCheese from "../ElementImages/ColdAndHotAppetizersImages/sheepCheese.jpg";
import hardCheese from "../ElementImages/ColdAndHotAppetizersImages/hardCheese.jpg";
import goatCheese from "../ElementImages/ColdAndHotAppetizersImages/goatCheese.jpg";
import yellowCheese from "../ElementImages/ColdAndHotAppetizersImages/yellowCheese.jpg";
import breadedYellowCheese from "../ElementImages/ColdAndHotAppetizersImages/breadedYellowCheese.jpg";
import omlette from "../ElementImages/ColdAndHotAppetizersImages/omlette.jpg";
import scrambledEggs from "../ElementImages/ColdAndHotAppetizersImages/scrambledEggs.jpg";
import chickenFingers from "../ElementImages/ColdAndHotAppetizersImages/chickenFingers.jpg";
import olives from "../ElementImages/ColdAndHotAppetizersImages/olives.jpg";
import boardOdaja from "../ElementImages/ColdAndHotAppetizersImages/boardOdaja.jpg";
import pie from "../ElementImages/ColdAndHotAppetizersImages/maznik-pie.jpg";
import pituliciWithGarlic from "../ElementImages/ColdAndHotAppetizersImages/pituliciWithGarlic.jpg";
import pieWithLeek from "../ElementImages/ColdAndHotAppetizersImages/pieWithLeek.jpg";
import pieWithSpinach from "../ElementImages/ColdAndHotAppetizersImages/pieWithSpinach.jpg";
import grilledMushrooms from "../ElementImages/ColdAndHotAppetizersImages/grilledMushrooms.jpeg";
import {Link} from "react-router-dom";


export const ColdAndHotAppetizers = (props) => {
    let coldAndHotAppetizersImages = [hardCheese, boardOdaja, yellowCheese, scrambledEggs, goatCheese, pie, olives, sheepCheese
        , omlette, grilledMushrooms, chickenFingers, pieWithLeek, pieWithSpinach, pituliciWithGarlic, breadedYellowCheese];
    const coldAndHotAppetizers = props.splitProducts("APPETIZERS", coldAndHotAppetizersImages, "cold-and-hot-appetizers");
    return (
        <div className="container">
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
                <div className="col-md-3">
                    <Link to={"/create-product"} className="btn btn-primary mb-3">Create product</Link>
                </div>
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