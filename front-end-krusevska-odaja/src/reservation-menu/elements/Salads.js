import React from "react";
import $ from "jquery";
import "../element-css/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";
import season from "../element-images/SaladImages/season.jpg";
import shopska from "../element-images/SaladImages/shopska.jpg";
import macedonian from "../element-images/SaladImages/macedonian.jpg";
import egejska from "../element-images/SaladImages/egejska-greek.jpg";
import mimoza from "../element-images/SaladImages/mimoza.jpg";
import tarator from "../element-images/SaladImages/tarator.jpg";
import ovcharska from "../element-images/SaladImages/ovcharska.jpg";
import ovchavina from "../element-images/SaladImages/ovchavina.jpg";
import turshija from "../element-images/SaladImages/turshija.jpg";
import {Link} from "react-router-dom";

export const Salads = (props) => {
    let saladImages = [egejska, macedonian, mimoza, ovchavina, ovcharska, season, tarator, turshija, shopska];
    const salads = props.splitProducts("SALAD", saladImages, "salads");
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (
        <div className="container" id="restaurant-element">
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
                        {salads}
                    </ul>
                </div>
            </div>
        </div>
    )
};