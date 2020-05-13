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
import {ChangePassword} from "./User/ChangePassword/ChangePassword";
import {Profile} from "./User/Profile/Profile";
import {UpdateProfile} from "./User/UpdateProfile/UpdateProfile";

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
            let query = "?" + error.response.data.message;
            sessionStorage.setItem("error", "true");
            this.props.history.push({
                pathname: '/register',
                search: query
            })
        })
    };
    userChangePassword = (changePasswordData) => {
        UserService.changePassword(changePasswordData).then(response => {
            alert(response.data.message);
            sessionStorage.clear();
            this.props.history.push("/log-in");
        }).catch(error => {
            let query = "?" + error.response.data.message;
            sessionStorage.setItem("error", "true");
            this.props.history.push({
                pathname: "/change-password",
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
    userProfileUpdate = (userUpdateData) => {
        UserService.modifyProfile(userUpdateData).then(response => {
            alert(response.data.message);
            sessionStorage.clear();
            let user = this.state.currentUser;
            user.fullName = userUpdateData.name;
            user.username = userUpdateData.username;
            user.phoneNumber[0].phoneNumber = userUpdateData.phoneNumber[0];
            user.phoneNumber[1].phoneNumber = userUpdateData.phoneNumber[1];
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            this.setState({currentUser: user});
            this.props.history.push("/profile");
        }).catch(error => {
            let query = "?" + error.response.data.message;
            sessionStorage.setItem("error", "true");
            this.props.history.push({
                pathname: "/update-profile",
                search: query
            })
        })
    };
    // pravi nesto problem so route patekite
    // koga ke se pivika /profile/change-password se poremetuvaat scriptite koi se loadiraat od index.html
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

                    <Route exact path={"/profile"} render={() =>
                        <Profile logOff={this.userLogOff}/>}>
                    </Route>

                    <Route exact path={"/update-profile"} render={() =>
                        <UpdateProfile update={this.userProfileUpdate}/>}>
                    </Route>

                    <Route path={"/change-password"} render={() =>
                        <ChangePassword changePassword={this.userChangePassword}/>}>
                    </Route>


                    {/*<Route path="/ingredients/:ingredientId/edit" render={() =>*/}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
