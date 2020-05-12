import React from 'react';
import './App.css';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {Header} from "./Navbar/Header";
import {SignIn} from "./User/SignIn/SignIn";
import {HomeEvents} from "./Home/HomeEvents";
import {AboutUs} from "./AboutUs/AboutUs";

function App() {
    return (
        <div className="App">
            <div className="header">
                <Header/>
            </div>
            <div className="main">
                <Route path={"/sign-in"} render={() =>
                    <SignIn/>}>
                </Route>
                <Route path={"/home"} render={() =>
                    <HomeEvents/>}>
                </Route>
                <Route path={"/about-us"} render={() =>
                    <AboutUs/>}>
                </Route>
                {/*<Route path="/ingredients/:ingredientId/edit" render={() =>*/}
            </div>
        </div>
    );
}

export default withRouter(App);
