import React from 'react';
import './App.css';
import {Route, withRouter} from "react-router-dom";
import {Header} from "./Navbar/Header";
import {LogIn} from "./User/LogIn/LogIn";
import {HomeEvents} from "./Home/HomeEvents";
import {AboutUs} from "./AboutUs/AboutUs";
import {UserService} from "./ServerRequests/UserService";
import {ProductService} from "./ServerRequests/ProductService";
import {Register} from "./User/Register/Register";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            products: null,
            ingredients: null
        }
    }

    componentDidMount() {
        ProductService.fetchAllProducts().then(response => {
            this.setState({products: response});
        })
    }

    userLogIn = (logInData) => {
        UserService.logInUser(logInData).then(response => {
            const user = JSON.stringify(response.data);
            sessionStorage.setItem("currentUser", user);
            this.setState({currentUser: response.data});
            this.props.history.push("/profile");
        }).catch(error => {
            let query = "?" + error.response.data.message;
            sessionStorage.setItem("error", "true");
            this.props.history.push({
                pathname: '/log-in',
                search: query
                // state: { detail: response.data }
            })
        })
    };
    userRegister = (registerData) => {
        UserService.registerUser(registerData).then(response => {
            alert(response.data.message + " Click OK to proceed.");
            this.props.history.push("/log-in");
        }).catch(error => {
            let fullName = registerData.name;
            let username = registerData.username;
            let email = registerData.email;
            let firstNumber = registerData.phoneNumber[0];
            let secondNumber = "";
            if (registerData.phoneNumber[1] !== undefined) {
                let secondNumber = "&phoneNumber2=" + registerData.phoneNumber[1];
            }
            // + "&fullName=" + fullName + "&username=" + username
            // + "&email=" + email + "&phoneNumber1=" + firstNumber + secondNumber;
            let query = "?" + error.response.data.message;
            sessionStorage.setItem("error", "true");
            this.props.history.push({
                pathname: '/register',
                search: query
            })
        })
    };

    userLogOff = (event) => {
        event.preventDefault();
        sessionStorage.clear();
        this.setState({currentUser: null});
        this.props.history.push("/log-in");
    };

    render() {
        return (
            <div className="App">
                <div className="header">
                    <Header logOff={this.userLogOff}/>
                </div>
                <div className="main">
                    <Route path={"/log-in"} render={() =>
                        <LogIn logIn={this.userLogIn}/>}>
                    </Route>
                    <Route path={"/home"} render={() =>
                        <HomeEvents/>}>
                    </Route>
                    <Route path={"/about-us"} render={() =>
                        <AboutUs/>}>
                    </Route>
                    <Route path={"/register"} render={() =>
                        <Register register={this.userRegister}/>}>
                    </Route>
                    {/*<Route path="/ingredients/:ingredientId/edit" render={() =>*/}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
