import React from "react";
import "./HomeEvents.css";
import slika1 from "./slika1.jpg"
import slika2 from "./slika2.jpg"
import slika3 from "./slika3.jpg"

//TODO this will be page with dynamic content. It will be shown in in sequence order so the user can list
//TODO forward and backwards to view the desired content
export function HomeEvents() {
    return (
        <div className="container home-event" style={{marginTop:90}}>
            <br/>
            <div className="row">
                <div className="col-md">
                    <h3><span role="img" aria-label="happy">🎹</span> ОВАА САБОТА 21.00 - забавата продолжува <span
                        role="img" aria-label="happy">🎹</span></h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <h3><span role="img" aria-label="piano">&#128076;</span> ЗА ПРВ ПАТ КАЈ НАС! Ве забавува Групата
                        РОЈАЛ БЕНД <span role="img" aria-label="piano">&#128076;</span></h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <h3><span role="img" aria-label="ok-sign">&#129488;</span> Проверете зошто се мајстори на живата
                        свирка! <span role="img" aria-label="ok-sign">&#129488;</span></h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <h3><span role="img" aria-label="curious">&#128512;</span> Повелете на Крушевски специјалитети,
                        добра атмосфера и музика во живо! <span role="img" aria-label="curious">&#128512;</span></h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <h3><span role="img" aria-label="music">🎺</span> Резервации на 075 421 946 и 075 421 947 <span
                        role="img" aria-label="music">🎺</span></h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-xs-3">
                    <img src={slika1}/>
                </div>
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="col-xs-3">
                    <img src={slika2}/>
                </div>
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="col-xs-3">
                    <img src={slika3}/>
                </div>
            </div>
        </div>
    )

}