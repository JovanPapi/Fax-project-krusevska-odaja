import React from "react";
import "../element-css/DrinkCss.css";
import $ from "jquery";

import brandyTraditionalTikves from "../element-images/DrinkImages/Aperitives/brandyTraditionalTikves.jpeg";
import brandyTraditionalTikvesVS from "../element-images/DrinkImages/Aperitives/brandyTraditionalTikvesVS.jpeg";
import brandyTraditionalTikvesWhite from "../element-images/DrinkImages/Aperitives/brandyTraditionalTikvesWhite.jpeg";
import cognac from "../element-images/DrinkImages/Aperitives/cognac.png";
import gin from "../element-images/DrinkImages/Aperitives/gin.png";
import vodka from "../element-images/DrinkImages/Aperitives/vodkaVigor.jpg";
import smirnoff from "../element-images/DrinkImages/Aperitives/vodkaSmirnoff.jpg";
import ouzoPhilippos from "../element-images/DrinkImages/Aperitives/ouzoPhilippos.jpg";
import ouzoPlomari from "../element-images/DrinkImages/Aperitives/ouzoPlomari.jpg";
import mastika from "../element-images/DrinkImages/Aperitives/mastika.jpeg";
import stock from "../element-images/DrinkImages/Aperitives/stock.png";
import johnyWalkerRedLabel from "../element-images/DrinkImages/Aperitives/whisky.jpg";
import jameson from "../element-images/DrinkImages/Aperitives/jameson.jpg";
import jimBeam from "../element-images/DrinkImages/Aperitives/jimBeam.jpg";
import baileys from "../element-images/DrinkImages/Aperitives/baileys.jpeg";
import martini from "../element-images/DrinkImages/Aperitives/martini.jpg";
import pelinkovac from "../element-images/DrinkImages/Aperitives/pelinkovac.jpg";
import stomaklija from "../element-images/DrinkImages/Aperitives/stomaklija.jpg";
import jagdTraum from "../element-images/DrinkImages/Aperitives/jagdTraum.jpg";
import jagerMaister from "../element-images/DrinkImages/Aperitives/jagerMaister.jpg";
import rum from "../element-images/DrinkImages/Aperitives/rum.jpg";

import aleksandriaCuveeWhite from "../element-images/DrinkImages/SpecialWines/aleksandriaCuveeWhite.jpg";
import aleksandriaCuveeRed from "../element-images/DrinkImages/SpecialWines/aleksandriaCuveeRed.jpg";
import cabernetSauvignon from "../element-images/DrinkImages/SpecialWines/cabernetSauvignon.png";
import sauvignonBlanc from "../element-images/DrinkImages/SpecialWines/sauvignonBlanc.jpg";
import rkacateli from "../element-images/DrinkImages/SpecialWines/rkaceteli.jpg";
import whiteWatherWhineWhiteAndRed from "../element-images/DrinkImages/SpecialWines/whiteWatherWineRed.jpg";
import barovoWhiteAndRed from "../element-images/DrinkImages/SpecialWines/barovoRed.jpg";

import smederevka from "../element-images/DrinkImages/Wines/smederevka.jpg";
import kavadarka from "../element-images/DrinkImages/Wines/kavadarka.jpg";
import vitach from "../element-images/DrinkImages/Wines/vitach.jpg";
import vranec from "../element-images/DrinkImages/Wines/vranec.png";
import rozeLarge from "../element-images/DrinkImages/Wines/rozeLarge.jpg";
import bunar from "../element-images/DrinkImages/Wines/bunar.jpg";
import glassOfWine from "../element-images/DrinkImages/Wines/glassOfWine.jpg";
import aleksandriaWhiteLarge from "../element-images/DrinkImages/Wines/aleksandriaWhiteLarge.jpg";
import aleksandriaRedLarge from "../element-images/DrinkImages/Wines/aleksandriaRedLarge.jpg";
import traminecLarge from "../element-images/DrinkImages/Wines/traminecLarge.jpg";
import temjanikaLarge from "../element-images/DrinkImages/Wines/temjanikaLarge.jpg";
import tgaLarge from "../element-images/DrinkImages/Wines/t'gaLarge.jpg";
import rozeMiddle from "../element-images/DrinkImages/Wines/roze.jpg";
import aleksandriaWhiteSmall from "../element-images/DrinkImages/Wines/aleksandriaRedSmall.jpg";
import aleksandriaRedSmall from "../element-images/DrinkImages/Wines/aleksandriaRedSmall.jpg";
import traminecSmall from "../element-images/DrinkImages/Wines/traminecSmall.jpg";
import temjanikaSmall from "../element-images/DrinkImages/Wines/temjanikaSmall.jpg";
import tgaSmall from "../element-images/DrinkImages/Wines/t'gaSmall.jpg";

import kamenitza from "../element-images/DrinkImages/Beers/kamenitza.png";
import jelen from "../element-images/DrinkImages/Beers/jelen.jpg";
import staropramen from "../element-images/DrinkImages/Beers/staropramen.png";
import stellaArtois from "../element-images/DrinkImages/Beers/stellaArtois.jpg";
import becks from "../element-images/DrinkImages/Beers/becks.jpg";
import skopsko from "../element-images/DrinkImages/Beers/skopsko.jpg";

import makedonsko from "../element-images/DrinkImages/CoffeeAndTeas/makedonsko.jpg";
import espresso from "../element-images/DrinkImages/CoffeeAndTeas/espresso.webp";
import macchiato from "../element-images/DrinkImages/CoffeeAndTeas/macchiato.jpg";
import nescafe from "../element-images/DrinkImages/CoffeeAndTeas/nescafe.jpg";
import cappuchino from "../element-images/DrinkImages/CoffeeAndTeas/cappuccino.jpg";
import teaa from "../element-images/DrinkImages/CoffeeAndTeas/tea.jpg";

import cocaCola from "../element-images/DrinkImages/SoftDrinks/cocaCola.jpg";
import fanta from "../element-images/DrinkImages/SoftDrinks/fanta.jpg";
import schweppes from "../element-images/DrinkImages/SoftDrinks/schweppes.jpg";
import tonic from "../element-images/DrinkImages/SoftDrinks/tonic.jpg";
import sprite from "../element-images/DrinkImages/SoftDrinks/sprite.jpg";
import juice from "../element-images/DrinkImages/SoftDrinks/juice.jpg";
import pelisterkaSparklingSmall from "../element-images/DrinkImages/SoftDrinks/pelisterskaSparklingSmall.jpg";
import pelisterkaStillSmall from "../element-images/DrinkImages/SoftDrinks/pelisterskaStillSmall.jpg";
import pelisterkaMiddle from "../element-images/DrinkImages/SoftDrinks/pelisterkaMiddle.jpg";
import pelisterkaSparklingLarge from "../element-images/DrinkImages/SoftDrinks/pelisterkaLarge.jpg";
import {Link} from "react-router-dom";

export class Drinks extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(function () {
            $(".expand").on("click", function () {
                // $(this).next().slideToggle(200);
                let expand = $(this).find(">:first-child").attr('id');
                if (expand === "first-collapse") {
                    if (!$("#collapse1").is(":visible")) {
                        $("#collapse1").slideDown(3500);
                    } else {
                        $("#collapse1").slideUp(2000);
                    }
                    $("#collapse2").slideUp(1500);
                    $("#collapse3").slideUp(1500);
                    $("#collapse4").slideUp(1500);
                    $("#collapse5").slideUp(1500);
                    $("#collapse6").slideUp(1500);
                }
                if (expand === "second-collapse") {
                    if (!$("#collapse2").is(":visible")) {
                        $("#collapse2").slideDown(2500);
                    } else {
                        $("#collapse2").slideUp(2000);
                    }
                    $("#collapse1").slideUp(1500);
                    $("#collapse3").slideUp(1500);
                    $("#collapse4").slideUp(1500);
                    $("#collapse5").slideUp(1500);
                    $("#collapse6").slideUp(1500);
                }
                if (expand === "third-collapse") {
                    if (!$("#collapse3").is(":visible")) {
                        $("#collapse3").slideDown(3500);
                    } else {
                        $("#collapse3").slideUp(2000);
                    }
                    $("#collapse2").slideUp(1500);
                    $("#collapse1").slideUp(1500);
                    $("#collapse4").slideUp(1500);
                    $("#collapse5").slideUp(1500);
                    $("#collapse6").slideUp(1500);
                }
                if (expand === "fourth-collapse") {
                    if (!$("#collapse4").is(":visible")) {
                        $("#collapse4").slideDown(3500);
                    } else {
                        $("#collapse4").slideUp(2000);
                    }
                    $("#collapse2").slideUp(1500);
                    $("#collapse3").slideUp(1500);
                    $("#collapse1").slideUp(1500);
                    $("#collapse5").slideUp(1500);
                    $("#collapse6").slideUp(1500);
                }
                if (expand === "fifth-collapse") {
                    if (!$("#collapse5").is(":visible")) {
                        $("#collapse5").slideDown(3500);
                    } else {
                        $("#collapse5").slideUp(2000);
                    }
                    $("#collapse2").slideUp(1500);
                    $("#collapse3").slideUp(1500);
                    $("#collapse4").slideUp(1500);
                    $("#collapse1").slideUp(1500);
                    $("#collapse6").slideUp(1500);
                }
                if (expand === "sixth-collapse") {
                    if (!$("#collapse6").is(":visible")) {
                        $("#collapse6").slideDown(3500);
                    } else {
                        $("#collapse6").slideUp(2000);
                    }
                    $("#collapse2").slideUp(1500);
                    $("#collapse3").slideUp(1500);
                    $("#collapse4").slideUp(1500);
                    $("#collapse5").slideUp(1500);
                    $("#collapse1").slideUp(1500);
                }
            });
        });
    }

    render() {
        let aperitivesImages = [baileys, vodka, cognac, martini, mastika, pelinkovac, rum, smirnoff, stomaklija
            , brandyTraditionalTikvesWhite, brandyTraditionalTikves, brandyTraditionalTikvesVS
            , ouzoPhilippos, ouzoPlomari, stock, jagdTraum, jagerMaister, jameson, jimBeam, gin, johnyWalkerRedLabel];
        const aperitives = this.props.splitProducts("APERITIVES", aperitivesImages, "drinks");

        let specialWinesImages = [aleksandriaCuveeWhite, aleksandriaCuveeRed, barovoWhiteAndRed
            , whiteWatherWhineWhiteAndRed, cabernetSauvignon, rkacateli, sauvignonBlanc];
        const specialWines = this.props.splitProducts("SPECIALWINE", specialWinesImages, "drinks");

        let winesImages = [aleksandriaWhiteLarge, aleksandriaRedLarge, aleksandriaWhiteSmall, aleksandriaRedSmall
            , bunar, vitach, vranec, kavadarka, rozeLarge, rozeMiddle, smederevka, tgaLarge, tgaSmall
            , temjanikaLarge, temjanikaSmall, traminecLarge, traminecSmall, rozeLarge, rozeMiddle, glassOfWine];
        const wines = this.props.splitProducts("WINE", winesImages, "drinks");

        let beerImages = [becks, kamenitza, skopsko, staropramen, stellaArtois, jelen];
        const beers = this.props.splitProducts("BEER", beerImages);

        let coffeImages = [espresso, cappuchino, makedonsko, macchiato, nescafe];
        const coffee = this.props.splitProducts("COFFEE", coffeImages, "drinks");

        let teaImages = [teaa];
        const tea = this.props.splitProducts("TEA", teaImages, "drinks");

        let softDrinkImages = [juice, cocaCola, pelisterkaSparklingSmall, pelisterkaStillSmall
            , pelisterkaMiddle, pelisterkaSparklingLarge, sprite, tonic, fanta, schweppes];
        const softDrinks = this.props.splitProducts("SOFTDRINKS", softDrinkImages);
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        return (
            <div className="container w-50" style={{marginTop: 100}}>
                <h2 style={{color: 'white'}}>View all your desired drinks!</h2>
                <div className="accordion" id="accordion">
                    <div className="panel">
                        <div className="row justify-content-center">
                            {currentUser !== null && currentUser.role === "Admin" ? <div className="col-md-3">
                                <Link to={"/product/create"} className="btn btn-primary mb-3">Create product</Link>
                            </div> : null}
                            <br/>
                            <div className="col-md-3">
                                <Link to={"/my-cart"} className="btn btn-primary" style={{width: 131}}>View my
                                    cart</Link>
                            </div>
                        </div>
                        <div className="panel-title bg-dark" style={{height: 40, borderRadius: 15}}>
                            {/*data-toggle="collapse"*/}
                            <h4 className="expand" data-parent="#accoordion"
                                href="#collapse1">
                                <a href="#" id="first-collapse">Аперативи / Aperitives</a>
                            </h4>
                        </div>
                        <div id="collapse1" className="panel-collapse collapse mt-3">
                            <div className="panel-body">
                                <div className="row justify-content-center">
                                    <div className="[ col-xs-12 col-sm-offset-2 col-sm-12 ]">
                                        <ul className="event-list">
                                            {aperitives}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-title bg-dark" style={{height: 40, borderRadius: 15}}>
                            <h4 className="expand" data-parent="#accoordion"
                                href="#collapse2">
                                <a href="#" id="second-collapse">Специјални вина / Special Wines</a>
                            </h4>
                        </div>
                        <div id="collapse2" className="panel-collapse collapse mt-3">
                            <div className="panel-body">
                                <div className="row justify-content-center">
                                    <div className="[ col-xs-12 col-sm-offset-2 col-sm-12 ]">
                                        <ul className="event-list">
                                            {specialWines}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-title bg-dark" style={{height: 40, borderRadius: 15}}>
                            <h4 className="expand" data-parent="#accoordion"
                                href="#collapse3">
                                <a href="#" id="third-collapse">Вина / Wines</a>
                            </h4>
                        </div>
                        <div id="collapse3" className="panel-collapse collapse mt-3">
                            <div className="panel-body">
                                <div className="row justify-content-center">
                                    <div className="[ col-xs-12 col-sm-offset-2 col-sm-12 ]">
                                        <ul className="event-list">
                                            {wines}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-title bg-dark" style={{height: 40, borderRadius: 15}}>
                            <h4 className="expand" data-parent="#accoordion"
                                href="#collapse4">
                                <a href="#" id="fourth-collapse">Пива / Beers</a>
                            </h4>
                        </div>
                        <div id="collapse4" className="panel-collapse collapse mt-3">
                            <div className="panel-body">
                                <div className="row justify-content-center">
                                    <div className="[ col-xs-12 col-sm-offset-2 col-sm-12 ]">
                                        <ul className="event-list">
                                            {beers}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-title bg-dark" style={{height: 40, borderRadius: 15}}>
                            <h4 className="expand" data-parent="#accoordion"
                                href="#collapse5">
                                <a href="#" id="fifth-collapse">Кафе и чај / Coffee and tea</a>
                            </h4>
                        </div>
                        <div id="collapse5" className="panel-collapse collapse mt-3">
                            <div className="panel-body">
                                <div className="row justify-content-center">
                                    <div className="[ col-xs-12 col-sm-offset-2 col-sm-12 ]">
                                        <ul className="event-list">
                                            {coffee}
                                            {tea}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-title bg-dark" style={{height: 40, borderRadius: 15}}>
                            <h4 className="expand" data-parent="#accoordion"
                                href="#collapse6">
                                <a href="#" id="sixth-collapse">Без алкохолни пијалоци / Soft drinks</a>
                            </h4>
                        </div>
                        <div id="collapse6" className="panel-collapse collapse mt-3">
                            <div className="panel-body">
                                <div className="row justify-content-center">
                                    <div className="[ col-xs-12 col-sm-offset-2 col-sm-12 ]">
                                        <ul className="event-list">
                                            {softDrinks}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}