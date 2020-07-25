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
import {IngredientService} from "./ServerRequests/IngredientService";
import {Create} from "./Product/Create";
import {SuggestedProduct} from "./Product/SuggestedProduct";
import {UserCart} from "./User/Cart/ProductCart";
import {TransactionService} from "./ServerRequests/Transaction";

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
        });
        IngredientService.fetchAllIngredients().then(response => {
            this.setState({ingredients: response.data})
        });
    }

    //functions for the user
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
            alert("There was something wrong when trying" +
                "to delete the reservation! Please try again.");
            this.props.history.push("/my-reservation");
        })
    };
    addProductToCart = (productToCart, e) => {
        //TODO REMEMBER! here we use NATIVE e.preventDefault by pass    ing e param (regular one works only with forms - submit)
        e.preventDefault();
        let userCart = [];
        if (sessionStorage.getItem("userCart") === null) {
            userCart.push(productToCart);
        } else {
            userCart = JSON.parse(sessionStorage.getItem("userCart"));
            userCart.push(productToCart);
        }
        sessionStorage.setItem("userCart", JSON.stringify(userCart));
    };

    //user transaction
    userPayment = (paymentData) => {
        TransactionService.transaction(paymentData)
            .then(response => {
                alert("Your transaction was successfully, thank you.");
                sessionStorage.removeItem("userCart")
                this.props.history.push("/home");
            }).catch(error => {
            alert(error.response.data.message);
            this.props.history.push("/my-cart");
        })
    };

    // functions for the products
    deleteProduct = (productId, productName, currentMenuSection) => {
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
    findProductToEdit = (productId, productName, currentMenuSection) => {
        const productToEdit = this.state.products.filter(product => {
            if (product.id === productId) {
                return product;
            }
        });
        sessionStorage.setItem("productToEdit", JSON.stringify(productToEdit[0]));
        sessionStorage.setItem("currentMenuSection", currentMenuSection);

        this.props.history.push("/product/edit/" + productName);
    };
    editProduct = (productToEdit, currentMenuSection) => {
        let newProductIngredients = [];
        let productToEditIngredients = productToEdit.ingredients.split(" ");
        for (let i = 0; i < productToEditIngredients.length; i++) {
            for (let j = 0; j < Object.keys(this.state.ingredients).length; j++) {
                if (this.state.ingredients[j].nameTranslate.toUpperCase().match(productToEditIngredients[i])) {
                    newProductIngredients.push(this.state.ingredients[j]);
                }
            }
        }

        ProductService.updateProduct(productToEdit).then(response => {
            alert("You have successfully updated the product. Click OK to proceed.");
            productToEdit.ingredients = newProductIngredients;
            sessionStorage.removeItem("productToEdit");
            sessionStorage.removeItem("currentSectionMenu");
            this.props.history.push("/menu/" + currentMenuSection);
            // ja refreshira stranata (pravi re-render na App komponentata)
            // upotreba na ovaj nacin za da nema potreba da se koristi state
            // nasproti toa, se povikuva componentDidMount() pa povtorno se polni state-ot
            window.location.reload();
        }).catch(error => {
            alert(error.response.data.message);
            this.props.history.push("/menu/" + currentMenuSection);
        })
    };
    createProduct = (newProductData) => {
        ProductService.createProduct(newProductData).then(response => {
            alert(response.data.message);
            this.props.history.push("/home");
            window.location.reload();
        }).catch(error => {
            alert(error.response.data.message);
            this.props.history.push("/product/create");
        })
    };

    //TODO next thing to do is to put authorization on the needed components and functions
    splitProductByType = (splitType, elementImages, currentMenuSection) => {
        // eslint-disable-next-line array-callback-return
        let imageCounter = 0;
        let productCounter = 0;
        return this.state.products.map((product, key) => {
            if (product.type === splitType) {
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
                                    <p className="desc mb-0">{product.price}&nbsp;&nbsp;{product.valuta}</p>
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
                                <li className="facebook" style={{width: 33}} title={"Edit this product"}
                                    onClick={() => this.findProductToEdit(product.id, product.name.toLowerCase(), currentMenuSection)}>
                                    <a href=""><i
                                        className="fa fa-edit"> </i></a></li>

                                <li className="twitter" style={{width: 34}} title={"Add to cart"}
                                    onClick={e => this.addProductToCart(product, e)}>
                                    <a href=""><i
                                        className="fa fa-plus-circle"> </i></a></li>

                                <li className="google-plus" style={{width: 33}} title={"Delete this product"}
                                    onClick={() => this.deleteProduct(product.id, currentMenuSection)}>
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

                    {/*basic routes*/}
                    <Route path={"/home"} render={() =>
                        <HomeEvents/>}>
                    </Route>
                    <Route path={"/about-us"} render={() =>
                        <AboutUs/>}>
                    </Route>

                    {/*user routes*/}
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
                    <Route path={"/log-in"} render={() =>
                        <LogIn logIn={this.userLogIn}/>}>
                    </Route>

                    {/*product cart route*/}
                    <Route path={"/my-cart"} render={() =>
                        <UserCart makeTransaction={this.userPayment}/>}>
                    </Route>

                    {/*reservation routes*/}
                    <Route path={"/reservation"} render={() =>
                        <Reservation makeReservation={this.userReservation}/>}>
                    </Route>
                    <Route path={"/my-reservation"} render={() =>
                        <MyReservation deleteReservation={this.deleteReservation}/>}>
                    </Route>

                    {/*product routes*/}
                    <Route path={`/product/edit/:productName`} render={() =>
                        <Edit allIngredients={this.state.ingredients}
                              edit={this.editProduct}/>}>
                    </Route>
                    <Route path={"/product/create"} render={() =>
                        <Create allIngredients={this.state.ingredients} create={this.createProduct}/>}>
                    </Route>
                    <Route path={"/product/suggested"} render={() =>
                        <SuggestedProduct suggestedProducts={this.state.suggestedProducts}/>}>
                    </Route>

                    {/*menu routes*/}
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
                </div>
            </div>
        );
    }
}

export default withRouter(App);
