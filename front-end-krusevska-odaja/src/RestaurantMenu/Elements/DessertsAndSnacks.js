import React from "react";
import $ from "jquery";
import "../ElementCss/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import pancake from "../ElementImages/DessertsAndSnacksImages/pancake.jpg";
import iceCream from "../ElementImages/DessertsAndSnacksImages/icecream.jpg";
import muffin from "../ElementImages/DessertsAndSnacksImages/muffin.jpg";
import peanuts from "../ElementImages/DessertsAndSnacksImages/peanuts.jpg";
import almond from "../ElementImages/DessertsAndSnacksImages/almond.jpg";
import pistachio from "../ElementImages/DessertsAndSnacksImages/pistachio.jpg";
import hazelnut from "../ElementImages/DessertsAndSnacksImages/hazelnut.jpg";
import {Link} from "react-router-dom";

export const DessertsAndSnacks = (props) => {
    let dessertsImages = [muffin,pancake,iceCream];
    let snacksImages = [almond,peanuts,hazelnut,pistachio];
    const desserts = props.splitProducts("DESSERTS", dessertsImages,"desserts-and-snacks");
    const snacks = props.splitProducts("SNACKS", snacksImages,"desserts-and-snacks");
    return (
        <div className="container">
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <img src={logoMenu} style={{borderRadius: 90}} alt="Element logo" width="170px" height="170px"/>
                </div>
                <div className="col-xl-4">
                    <h1 style={{color: 'white'}}>Десерти и апетисани / Desserts and snacks</h1>
                </div>
                <div className="col-md-3">
                    <img src={logoMenu} style={{borderRadius: 90}} alt="Element logo" width="170px" height="170px"/>
                </div>
            </div>
            <br/>
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <Link to={"/create-product"} className="btn btn-primary mb-3">Create product</Link>
                </div><br/>
                <div className="col-md-3">
                    <Link to={"/my-cart"} className="btn btn-primary" style={{width:131}}>View my cart</Link>
                </div>
            </div>
            <br/>
            <div className="row justify-content-center">
                <div className="[ col-xs-12 col-sm-offset-2 col-sm-9 ]">
                    <ul className="event-list">
                        {desserts}
                        {snacks}
                    </ul>
                </div>
            </div>
        </div>
    )
};