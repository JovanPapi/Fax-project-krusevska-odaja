import React from "react";
import $ from "jquery";
import "../element-css/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import kebab from "../element-images/Grillmages/kebab.jpg";
import burger from "../element-images/Grillmages/burger.jpg";
import burgerLoveckaSmall from "../element-images/Grillmages/burgerLoveckaSmall.jpg";
import burgerLoveckaLarge from "../element-images/Grillmages/burgerLoveckaLarge.jpg";
import makedonskaSmall from "../element-images/Grillmages/makedonkaSmall.jpg";
import makedonskaLarge from "../element-images/Grillmages/makedonkaLarge.jpg";
import fritters from "../element-images/Grillmages/firtters.jpg";
import porkRib from "../element-images/Grillmages/porkRib.jpeg";
import porkChop from "../element-images/Grillmages/porkChop.jpg";
import ramsteak from "../element-images/Grillmages/ramsteak.jpg";
import porkKabobs from "../element-images/Grillmages/porkKabobs.jpg";
import chickenKabobs from "../element-images/Grillmages/chickenKabobs.jpg";
import wrappedPorkMeat from "../element-images/Grillmages/wrappedPorkMeat.jpg";
import wrappedChickenMeat from "../element-images/Grillmages/wrappedChickenMeat.jpg";
import sausageKrusevski from "../element-images/Grillmages/sausageKrusevski.jpg";
import chickenSteak from "../element-images/Grillmages/chickenSteak.jpg";
import chickenSteakInMushroomSauce from "../element-images/Grillmages/chickenSteakInMushromSauce.jpg";
import naturEscalope from "../element-images/Grillmages/naturEscalope.jpg";
import mincedMeatSteak from "../element-images/Grillmages/mincedMeatSteak.jpg";
import wienerSchnitzel from "../element-images/Grillmages/wienerSchnitzel.jpg";
import {Link} from "react-router-dom";


export const Grill = (props) => {
    let grillImages = [wienerSchnitzel, ramsteak, kebab, porkChop, sausageKrusevski, burgerLoveckaSmall, burgerLoveckaLarge
        , makedonskaSmall, makedonskaLarge, naturEscalope, chickenKabobs, chickenSteak, chickenSteakInMushroomSauce
        , wrappedChickenMeat, burger, porkRib, porkKabobs, wrappedPorkMeat, fritters, mincedMeatSteak];
    const grill = props.splitProducts("GRILL", grillImages, "grill");
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (
        <div className="container" id="restaurant-element">
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <img src={logoMenu} style={{borderRadius: 90}} alt="Element logo" width="170px" height="170px"/>
                </div>
                <div className="col-xl-4">
                    <h1 style={{color: 'white'}}>Скара / Grill</h1>
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
                        {grill}
                    </ul>
                </div>
            </div>
        </div>
    )
};