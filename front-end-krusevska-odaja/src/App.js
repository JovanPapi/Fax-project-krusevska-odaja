import React from 'react';
import './App.css';
import {Link, Route, withRouter} from "react-router-dom";
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
import {Reservation} from "./Reservation/Reservation";
import {ReservationService} from "./ServerRequests/ReservationService";
import {MyReservation} from "./Reservation/MyReservation";
import {Salads} from "./RestaurantMenu/Elements/Salads";
import {ColdAndHotAppetizers} from "./RestaurantMenu/Elements/ColdAndHotAppetizers";
import {Grill} from "./RestaurantMenu/Elements/Grill";
import {GarnishAndExtras} from "./RestaurantMenu/Elements/GarnishAndExtras";
import {DessertsAndSnacks} from "./RestaurantMenu/Elements/DessertsAndSnacks";
import {Drinks} from "./RestaurantMenu/Elements/Drinks";
import {DisheshToOrder} from "./RestaurantMenu/Elements/DishesToOrder";
import {SpecialitiesOfTheHouse} from "./RestaurantMenu/Elements/SpecialitiesOfTheHouse";
import {Edit} from "./Product/Edit";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            products: [],
            suggestedProducts: [],
            ingredients: [],
        }
    }

    componentDidMount() {
        ProductService.fetchAllProducts().then(response => {
            this.setState({products: response.data});
        });
        ProductService.fetchAllSuggestedProducts().then(response => {
            this.setState({suggestedProducts: response.data})
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
    userReservation = (userReservationData) => {
        ReservationService.reserveATable(userReservationData).then(response => {
            alert("Your reservation was successfully. Click OK to continue.");
            sessionStorage.clear();
            const user = response.data;
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            this.setState({currentUser: user});
            this.props.history.push("/my-reservation");
        })
    };
    deleteReservation = (reservationId) => {
        ReservationService.deleteReservation(reservationId).then(response => {
            alert(response.data.message + ". Click OK to continue.");
            sessionStorage.clear();
            let user = this.state.currentUser;
            user.reservation = null;
            console.log(user);
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            this.setState({currentUser: user});
            this.props.history.push("/home");
        }).catch(error => {
            alert(error.response.data.message);
            this.props.history.push("/my-reservation");
        })
    };
    deleteProduct = (productId, currentMenuSection) => {
        ProductService.deleteProduct(productId).then(response => {
            alert(response.data.message);
            this.setState(prevState => {
                const newProductList = prevState.products.filter(product => {
                    if (product.id !== productId) {
                        return product;
                    }
                });
                return {
                    products: newProductList
                }
            });
            this.props.history.push("/" + currentMenuSection);
        }).catch(error => {
            alert(error.response.data.message);
            this.props.history.push("/menu/" + currentMenuSection);
        })
    };

    //TODO next to implement is update product, now that we fixed with loading scripts and stylesheets.
    updateProduct = (productId, currentMenuSection) => {

    };
    splitProductByType = (splitType, elementImages, currentMenuSection) => {
        // eslint-disable-next-line array-callback-return
        let imageCounter = 0;
        let productCounter = 0;
        return this.state.products.map((product, key) => {
            if (product.type === splitType) {
                let productId = product.id;
                let productIngredients = "";
                let productTranslated = product.nameTranslated.toUpperCase() + ": ";
                let productIngredientsSize = Object.keys(product.ingredients).length;
                if (productIngredientsSize > 0) {
                    for (let i = 0; i < productIngredientsSize; i++) {
                        if (i === productIngredientsSize - 1) {
                            productIngredients += product.ingredients[i].name.toLowerCase();
                            productTranslated += product.ingredients[i].nameTranslate;
                        } else {
                            productIngredients += product.ingredients[i].name.toLowerCase() + ", ";
                            productTranslated += product.ingredients[i].nameTranslate + ", ";
                        }
                    }
                }
                return (
                    <li key={key}>
                        <img alt="Cannot load image"
                             src={elementImages[imageCounter++]}/>
                        <div className="info">
                            <div className="row">
                                <div className="col-md-7">
                                    <h5 className="title mb-0">{product.name}<span
                                        style={{fontSize: 15, paddingLeft: 10}}>{product.description}</span></h5>
                                </div>
                                <div className="col-md-5 pull-right">
                                    <p className="desc mb-0">{product.valuta}&nbsp;&nbsp;{product.price}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="desc mb-0"><b>{productIngredients}</b></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="desc" style={{color: 'darkred'}}>{productTranslated}</p>
                                </div>
                            </div>
                        </div>
                        <div className="social">
                            <ul>
                                <li className="facebook" style={{width: 33}}><a
                                    href=""><i
                                    className="fa fa-edit"> </i></a></li>

                                <li className="twitter" style={{width: 34}}><a href=""><i
                                    className="fa fa-plus-circle"> </i></a></li>

                                <li className="google-plus" style={{width: 33}}
                                    onClick={() => this.deleteProduct(productId, currentMenuSection)}>
                                    <a href=""><i
                                        className="fa fa-remove"> </i></a></li>
                            </ul>
                        </div>
                    </li>
                )
            }
        });
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

                    <Route exact path={"/profile"} render={() =>
                        <Profile logOff={this.userLogOff}/>}>
                    </Route>

                    <Route exact path={"/update-profile"} render={() =>
                        <UpdateProfile update={this.userProfileUpdate}/>}>
                    </Route>

                    <Route path={"/change-password"} render={() =>
                        <ChangePassword changePassword={this.userChangePassword}/>}>
                    </Route>

                    <Route path={"/reservation"} render={() =>
                        <Reservation makeReservation={this.userReservation}/>}>
                    </Route>

                    <Route path={"/my-reservation"} render={() =>
                        <MyReservation deleteReservation={this.deleteReservation}/>}>
                    </Route>

                    <Route path={"/menu/salads"} render={() =>
                        <Salads splitProducts={this.splitProductByType}/>}>
                    </Route>

                    <Route path={"/menu/cold-and-hot-appetizers"} render={() =>
                        <ColdAndHotAppetizers splitProducts={this.splitProductByType}/>}>
                    </Route>

                    <Route path={"/menu/grill"} render={() =>
                        <Grill splitProducts={this.splitProductByType}/>}>
                    </Route>

                    <Route path={"/menu/garnish-and-extras"} render={() =>
                        <GarnishAndExtras splitProducts={this.splitProductByType}/>}>
                    </Route>

                    <Route path={"/menu/desserts-and-snacks"} render={() =>
                        <DessertsAndSnacks splitProducts={this.splitProductByType}/>}>
                    </Route>

                    <Route path={"/menu/drinks"} render={() =>
                        <Drinks splitProducts={this.splitProductByType}/>}>
                    </Route>

                    <Route path={"/menu/dishes-to-order"} render={() =>
                        <DisheshToOrder splitProducts={this.splitProductByType}/>}>
                    </Route>

                    <Route path={"/menu/specialities-of-the-house"} render={() =>
                        <SpecialitiesOfTheHouse splitProducts={this.splitProductByType}/>}>
                    </Route>

                    <Route path={`/edit-product/:productName`} render={() =>
                        <Edit/>}>
                    </Route>
                    {/*<Route path="/ingredients/:ingredientId/edit" render={() =>*/}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
