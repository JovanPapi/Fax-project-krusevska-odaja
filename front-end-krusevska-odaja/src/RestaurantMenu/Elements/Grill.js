import React from "react";
import $ from "jquery";
import "../ElementCss/ElementCss.css";
import logoMenu from "./krusevska-odaja-logo.jpg";

import kebab from "../ElementImages/Grillmages/kebab.jpg";
import burger from "../ElementImages/Grillmages/burger.jpg";
import burgerLoveckaSmall from "../ElementImages/Grillmages/burgerLoveckaSmall.jpg";
import burgerLoveckaLarge from "../ElementImages/Grillmages/burgerLoveckaLarge.jpg";
import makedonskaSmall from "../ElementImages/Grillmages/makedonkaSmall.jpg";
import makedonskaLarge from "../ElementImages/Grillmages/makedonkaLarge.jpg";
import fritters from "../ElementImages/Grillmages/firtters.jpg";
import porkRib from "../ElementImages/Grillmages/porkRib.jpeg";
import porkChop from "../ElementImages/Grillmages/porkChop.jpg";
import ramsteak from "../ElementImages/Grillmages/ramsteak.jpg";
import porkKabobs from "../ElementImages/Grillmages/porkKabobs.jpg";
import chickenKabobs from "../ElementImages/Grillmages/chickenKabobs.jpg";
import wrappedPorkMeat from "../ElementImages/Grillmages/wrappedPorkMeat.jpg";
import wrappedChickenMeat from "../ElementImages/Grillmages/wrappedChickenMeat.jpg";
import sausageKrusevski from "../ElementImages/Grillmages/sausageKrusevski.jpg";
import chickenSteak from "../ElementImages/Grillmages/chickenSteak.jpg";
import chickenSteakInMushroomSauce from "../ElementImages/Grillmages/chickenSteakInMushromSauce.jpg";
import naturEscalope from "../ElementImages/Grillmages/naturEscalope.jpg";
import mincedMeatSteak from "../ElementImages/Grillmages/mincedMeatSteak.jpg";
import wienerSchnitzel from "../ElementImages/Grillmages/wienerSchnitzel.jpg";
import {Link} from "react-router-dom";


export const Grill = (props) => {
    let grillImages = [wienerSchnitzel, ramsteak, kebab, porkChop, sausageKrusevski, burgerLoveckaSmall, burgerLoveckaLarge
        , makedonskaSmall, makedonskaLarge, naturEscalope, chickenKabobs, chickenSteak, chickenSteakInMushroomSauce
        , wrappedChickenMeat, burger, porkRib, porkKabobs, wrappedPorkMeat, fritters, mincedMeatSteak];
    const grill = props.splitProducts("GRILL", grillImages,"grill");
    return (
        <div className="container">
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
                        {grill}
                    </ul>
                </div>
            </div>
        </div>
    )
};