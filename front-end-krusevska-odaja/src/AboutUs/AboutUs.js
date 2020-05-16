import React from "react";
import "./AboutUs.css";
import jovan from "./jovan-papalazoski.jpg";
import suli from "./suli-nalbantoski.jpg";
import vlatko from "./vlatko-papalazoski.jpg";

export function AboutUs() {
    return (
        <div className="container" style={{marginTop:90}}>
            <br/>
            <div className="line-div">
                <h2>Meet the Developer and the Owners</h2>
            </div>
            <br/>
            <div className="d-flex">
                <div className="card">
                    <img className="card-img-top" src={jovan} height="240px" alt={"jovan"}/>
                    <div className={"card-body"}>
                        <h5 className={"card-title"}>Jovan Papalazoski <br/> Full stack web developer</h5>
                        <p className={"card-text"}>The legend says that he has completed every game that exist.</p>
                        <div className="row">
                            <div className="col-md-6">
                                <button type={"button"} className={"btn btn-info"}>
                                    <a className="aboutus-a" href={"https://github.com/JovanPapi"}>
                                        Github
                                    </a>
                                </button>
                            </div>
                            <div className={"col-md-6"}>
                                <button type={"button"} className={"btn btn-info"}>
                                    <a className="aboutus-a" href={"https://www.linkedin.com/in/jovan-papalazoski-3b2361183/"}>
                                        LinkedIn
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="card">
                    <img className="card-img-top" src={vlatko} height="240px" alt={"vlatko"}/>
                    <div className={"card-body"}>
                        <h5 className={"card-title"}>Vlatko Papalazoski <br/> Engineer/Mechanic</h5>
                        <p className={"card-text"}>The legend says that he fix things while he sleep.</p>
                    </div>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="card">
                    <img className="card-img-top" src={suli} height="240px" alt={"suli"}/>
                    <div className={"card-body"}>
                        <h5 className={"card-title"}>Suli Nalbantoski <br/> Manager</h5>
                        <p className={"card-text"}>The legend says that he manages things while he sleep.</p>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}