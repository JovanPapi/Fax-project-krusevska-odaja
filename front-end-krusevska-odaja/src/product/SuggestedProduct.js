import React from "react";
import {Redirect} from "react-router-dom";

export const SuggestedProduct = (props) => {

    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (currentUser !== null && currentUser.role === "Admin") {
        const tds = props.suggestedProducts.map((product, key) => {
            let ingredients = ""
            let productIngredientKeys = Object.keys(product.ingredients).length;
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
                    <td>{product.price}</td>
                    <td>{product.valuta}</td>
                    <td>{product.type}</td>
                    <td>{product.description}</td>
                    <td>{ingredients}</td>
                </tr>
            )
        });
        return (
            <div className="container" style={{marginTop: 90}}>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel">
                            <div className="panel-heading  w-100 bg-dark"
                                 style={{height: 40, borderRadius: 10, color: 'white'}}>
                                <h2>Suggested Products</h2>
                            </div>
                            <div className="panel-body">
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
                                    </tr>
                                    </thead>
                                    <tbody className="bg-light">
                                    {tds}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to={"/home"}/>
    }
};