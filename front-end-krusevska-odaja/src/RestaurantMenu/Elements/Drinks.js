import React from "react";
import "../ElementCss/DrinkCss.css";
import $ from "jquery";

import brandyTraditionalTikves from "../ElementImages/DrinkImages/Aperitives/brandyTraditionalTikves.jpeg";
import brandyTraditionalTikvesVS from "../ElementImages/DrinkImages/Aperitives/brandyTraditionalTikvesVS.jpeg";
import brandyTraditionalTikvesWhite from "../ElementImages/DrinkImages/Aperitives/brandyTraditionalTikvesWhite.jpeg";
import cognac from "../ElementImages/DrinkImages/Aperitives/cognac.png";
import gin from "../ElementImages/DrinkImages/Aperitives/gin.png";
import vodka from "../ElementImages/DrinkImages/Aperitives/vodkaVigor.jpg";
import smirnoff from "../ElementImages/DrinkImages/Aperitives/vodkaSmirnoff.jpg";
import ouzoPhilippos from "../ElementImages/DrinkImages/Aperitives/ouzoPhilippos.jpg";
import ouzoPlomari from "../ElementImages/DrinkImages/Aperitives/ouzoPlomari.jpg";
import mastika from "../ElementImages/DrinkImages/Aperitives/mastika.jpeg";
import stock from "../ElementImages/DrinkImages/Aperitives/stock.png";
import johnyWalkerRedLabel from "../ElementImages/DrinkImages/Aperitives/whisky.jpg";
import jameson from "../ElementImages/DrinkImages/Aperitives/jameson.jpg";
import jimBeam from "../ElementImages/DrinkImages/Aperitives/jimBeam.jpg";
import baileys from "../ElementImages/DrinkImages/Aperitives/baileys.jpeg";
import martini from "../ElementImages/DrinkImages/Aperitives/martini.jpg";
import pelinkovac from "../ElementImages/DrinkImages/Aperitives/pelinkovac.jpg";
import stomaklija from "../ElementImages/DrinkImages/Aperitives/stomaklija.jpg";
import jagdTraum from "../ElementImages/DrinkImages/Aperitives/jagdTraum.jpg";
import jagerMaister from "../ElementImages/DrinkImages/Aperitives/jagerMaister.jpg";
import rum from "../ElementImages/DrinkImages/Aperitives/rum.jpg";

import aleksandriaCuveeWhite from "../ElementImages/DrinkImages/SpecialWines/aleksandriaCuveeWhite.jpg";
import aleksandriaCuveeRed from "../ElementImages/DrinkImages/SpecialWines/aleksandriaCuveeRed.jpg";
import cabernetSauvignon from "../ElementImages/DrinkImages/SpecialWines/cabernetSauvignon.png";
import sauvignonBlanc from "../ElementImages/DrinkImages/SpecialWines/sauvignonBlanc.jpg";
import rkacateli from "../ElementImages/DrinkImages/SpecialWines/rkaceteli.jpg";
import whiteWatherWhineWhiteAndRed from "../ElementImages/DrinkImages/SpecialWines/whiteWatherWineRed.jpg";
import barovoWhiteAndRed from "../ElementImages/DrinkImages/SpecialWines/barovoRed.jpg";

import smederevka from "../ElementImages/DrinkImages/Wines/smederevka.jpg";
import kavadarka from "../ElementImages/DrinkImages/Wines/kavadarka.jpg";
import vitach from "../ElementImages/DrinkImages/Wines/vitach.jpg";
import vranec from "../ElementImages/DrinkImages/Wines/vranec.png";
import rozeLarge from "../ElementImages/DrinkImages/Wines/rozeLarge.jpg";
import bunar from "../ElementImages/DrinkImages/Wines/bunar.jpg";
import glassOfWine from "../ElementImages/DrinkImages/Wines/glassOfWine.jpg";
import aleksandriaWhiteLarge from "../ElementImages/DrinkImages/Wines/aleksandriaWhiteLarge.jpg";
import aleksandriaRedLarge from "../ElementImages/DrinkImages/Wines/aleksandriaRedLarge.jpg";
import traminecLarge from "../ElementImages/DrinkImages/Wines/traminecLarge.jpg";
import temjanikaLarge from "../ElementImages/DrinkImages/Wines/temjanikaLarge.jpg";
import tgaLarge from "../ElementImages/DrinkImages/Wines/t'gaLarge.jpg";
import rozeMiddle from "../ElementImages/DrinkImages/Wines/roze.jpg";
import aleksandriaWhiteSmall from "../ElementImages/DrinkImages/Wines/aleksandriaRedSmall.jpg";
import aleksandriaRedSmall from "../ElementImages/DrinkImages/Wines/aleksandriaRedSmall.jpg";
import traminecSmall from "../ElementImages/DrinkImages/Wines/traminecSmall.jpg";
import temjanikaSmall from "../ElementImages/DrinkImages/Wines/temjanikaSmall.jpg";
import tgaSmall from "../ElementImages/DrinkImages/Wines/t'gaSmall.jpg";

import kamenitza from "../ElementImages/DrinkImages/Beers/kamenitza.png";
import jelen from "../ElementImages/DrinkImages/Beers/jelen.jpg";
import staropramen from "../ElementImages/DrinkImages/Beers/staropramen.png";
import stellaArtois from "../ElementImages/DrinkImages/Beers/stellaArtois.jpg";
import becks from "../ElementImages/DrinkImages/Beers/becks.jpg";
import skopsko from "../ElementImages/DrinkImages/Beers/skopsko.jpg";

import makedonsko from "../ElementImages/DrinkImages/CoffeeAndTeas/makedonsko.jpg";
import espresso from "../ElementImages/DrinkImages/CoffeeAndTeas/espresso.webp";
import macchiato from "../ElementImages/DrinkImages/CoffeeAndTeas/macchiato.jpg";
import nescafe from "../ElementImages/DrinkImages/CoffeeAndTeas/nescafe.jpg";
import cappuchino from "../ElementImages/DrinkImages/CoffeeAndTeas/cappuccino.jpg";
import teaa from "../ElementImages/DrinkImages/CoffeeAndTeas/tea.jpg";

import cocaCola from "../ElementImages/DrinkImages/SoftDrinks/cocaCola.jpg";
import fanta from "../ElementImages/DrinkImages/SoftDrinks/fanta.jpg";
import schweppes from "../ElementImages/DrinkImages/SoftDrinks/schweppes.jpg";
import tonic from "../ElementImages/DrinkImages/SoftDrinks/tonic.jpg";
import sprite from "../ElementImages/DrinkImages/SoftDrinks/sprite.jpg";
import juice from "../ElementImages/DrinkImages/SoftDrinks/juice.jpg";
import pelisterkaSparklingSmall from "../ElementImages/DrinkImages/SoftDrinks/pelisterskaSparklingSmall.jpg";
import pelisterkaStillSmall from "../ElementImages/DrinkImages/SoftDrinks/pelisterskaStillSmall.jpg";
import pelisterkaMiddle from "../ElementImages/DrinkImages/SoftDrinks/pelisterkaMiddle.jpg";
import pelisterkaSparklingLarge from "../ElementImages/DrinkImages/SoftDrinks/pelisterkaLarge.jpg";
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
        const aperitives = this.props.splitProducts("APERITIVES", aperitivesImages,"drinks");

        let specialWinesImages = [aleksandriaCuveeWhite, aleksandriaCuveeRed, barovoWhiteAndRed
            , whiteWatherWhineWhiteAndRed, cabernetSauvignon, rkacateli, sauvignonBlanc];
        const specialWines = this.props.splitProducts("SPECIALWINE", specialWinesImages,"drinks");

        let winesImages = [aleksandriaWhiteLarge, aleksandriaRedLarge, aleksandriaWhiteSmall, aleksandriaRedSmall
            , bunar, vitach, vranec, kavadarka, rozeLarge, rozeMiddle, smederevka, tgaLarge, tgaSmall
            , temjanikaLarge, temjanikaSmall, traminecLarge, traminecSmall, rozeLarge, rozeMiddle, glassOfWine];
        const wines = this.props.splitProducts("WINE", winesImages,"drinks");

        let beerImages = [becks, kamenitza, skopsko, staropramen, stellaArtois, jelen];
        const beers = this.props.splitProducts("BEER", beerImages);

        let coffeImages = [espresso, cappuchino, makedonsko, macchiato, nescafe];
        const coffee = this.props.splitProducts("COFFEE", coffeImages,"drinks");

        let teaImages = [teaa];
        const tea = this.props.splitProducts("TEA", teaImages,"drinks");

        let softDrinkImages = [juice, cocaCola, pelisterkaSparklingSmall, pelisterkaStillSmall
            , pelisterkaMiddle, pelisterkaSparklingLarge, sprite, tonic, fanta, schweppes];
        const softDrinks = this.props.splitProducts("SOFTDRINKS", softDrinkImages);
        return (
            <div className="container w-50 mt-3">
                <h2 style={{color: 'white'}}>View all your desired drinks!</h2>
                <div className="accordion" id="accordion">
                    <div className="panel">
                        <div className="row justify-content-center">
                            <div className="col-md-3">
                                <Link to={"/product/create"} className="btn btn-primary mb-3">Create product</Link>
                            </div><br/>
                            <div className="col-md-3">
                                <Link to={"/my-cart"} className="btn btn-primary" style={{width:131}}>View my cart</Link>
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