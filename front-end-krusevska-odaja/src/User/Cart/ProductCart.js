import React from "react";
import $ from "jquery";
import StripeCheckout from "react-stripe-checkout";
import logo from "./krusevska-odaja-logo.jpg";

export const UserCart = (props) => {
    let cartProducts = JSON.parse(sessionStorage.getItem("userCart"));
    const publicKey = process.env.REACT_APP_PUBLIC_KEY;
    let finalPriceToPay = 0;
    let finalPriceDenari = 0;
    let finalPriceEUR = 0;
    let tds = null;

    function deleteProductFromCart(productId) {
        cartProducts = cartProducts.filter(product => {
            if (product.id !== productId) {
                return product;
            }
        });
        sessionStorage.setItem("userCart", JSON.stringify(cartProducts));
        window.location.reload();
    }

    if (cartProducts !== null) {
        tds = cartProducts.map((product, key) => {
            let ingredients = "";
            let productIngredientKeys = Object.keys(product.ingredients).length;
            finalPriceToPay += parseInt(product.price);
            if (productIngredientKeys !== 0) {
                let counter = -1;
                product.ingredients.map(ingredient => {
                    counter++;
                    if (counter === productIngredientKeys - 1) {
                        ingredients += ingredient.name
                    } else {
                        ingredients += ingredient.name + "/"
                    }
                })
            }
            return (
                <tr key={key}>
                    <td>{product.name}</td>
                    <td>{product.nameTranslated}</td>
                    <td style={{color: "red"}}>{product.price}</td>
                    <td>{product.valuta}</td>
                    <td>{product.type}</td>
                    <td>{product.description}</td>
                    <td>{ingredients}</td>
                    <td>
                        <button onClick={() => deleteProductFromCart(product.id)} className="btn btn-danger">Delete
                        </button>
                    </td>
                </tr>
            )
        });
        finalPriceDenari = finalPriceToPay;
        finalPriceEUR = Number((finalPriceToPay / 61.60).toFixed(2));
    }

    function onToken(token) {
        const user = JSON.parse(sessionStorage.getItem("currentUser"));
        if (!token.email.match(user.email)) {
            alert("Your email doesnt match, try again!");
            return;
        }
        const paymentData = {
            description: "Testing transaction",
            amount: finalPriceEUR,
            currency: "EUR",
            stripeEmail: token.email,
            stripeToken: token.id
        };
        props.makeTransaction(paymentData);
    }

    $(window).scroll(function () {
        $('#scrollablePriceDiv').css('bot', $(this).scrollTop());
    });
    return (
        <div className="container" style={{marginTop: 90}}>
            <br/>
            <div className="row">
                <div className="col-md">
                    <div className="panel">
                        <div className="panel-heading  w-100 bg-dark"
                             style={{height: 40, borderRadius: 10, color: 'white'}}>
                            <h2>My product cart</h2>
                        </div>
                        <div className="panel-body w-100">
                            <table className="table">
                                <thead className="bg-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Name translated</th>
                                    <th>Price</th>
                                    <th>Valuta</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Ingredients</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody className="bg-light">
                                {tds}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {cartProducts !== null ? <div className="col-md-3" id={"scrollablePriceDiv"}>
                    <p style={{color: "white", fontSize: 25}}>Вкупно цена во денари: <span
                        style={{color: "red"}}>{finalPriceDenari}</span></p>
                    <p style={{color: "white", fontSize: 25}}>Total amount in
                        euros: <span style={{color: "red"}}>{finalPriceEUR}<i className="fa fa-euro"></i></span></p>
                    <StripeCheckout token={onToken}
                                    stripeKey={publicKey}
                                    label={"Pay with card"}
                                    image={logo}
                                    currency="EUR"
                                    amount={finalPriceEUR * 100}
                                    style={{width: 150}}/>
                </div> : null}
            </div>
        </div>
    )
};