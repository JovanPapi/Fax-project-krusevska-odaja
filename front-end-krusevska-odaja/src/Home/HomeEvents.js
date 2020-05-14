import React from "react";
import "./HomeEvents.css";
import slika1 from "./slika1.jpg"
import slika2 from "./slika2.jpg"
import slika3 from "./slika3.jpg"

export function HomeEvents() {
    return (
        <div className="container home-event">
            <br/>
            <div className="row">
                <div className="col-md">
                    <h3>🎹 ОВАА САБОТА 21.00 - забавата продолжува 🎹 </h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <h3>&#128076; ЗА ПРВ ПАТ КАЈ НАС! Ве забавува Групата РОЈАЛ БЕНД &#128076;</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <h3>&#129488; Проверете зошто се мајстори на живата свирка! &#129488;</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <h3>&#128512; Повелете на Крушевски специјалитети, добра атмосфера и музика во живо! &#128512;</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <h3>🎺 Резервации на 075 421 946 и 075 421 947 🎺</h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-xs-3">
                    <img src={slika1}/>
                </div><br/>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="col-xs-3">
                    <img src={slika2}/>
                </div><br/>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="col-xs-3">
                    <img src={slika3}/>
                </div>
            </div>
        </div>
    )

}