import React, {useState} from "react";
import $ from "jquery";

export const Create = (props) => {
    const [english, setEnglish] = useState(false);
    let counter = -1;
    const ingredients = props.allIngredients.map((ingredient, key) => {
        counter++;
        let arr = ingredient.name.split(" ");
        if (arr.length === 1) {
            if (counter === Object.keys(props.allIngredients).length - 1) {
                return (
                    ingredient.name
                )
            } else {
                return ingredient.name + ", "
            }
        }
    });

    counter = -1;
    const englishIngredients = props.allIngredients.map((ingredient, key) => {
        counter++;
        let arr = ingredient.name.split(" ");
        if (arr.length === 1) {
            if (counter === Object.keys(props.allIngredients).length - 1) {
                return (
                    ingredient.nameTranslate
                )
            } else {
                return ingredient.nameTranslate + ", "
            }
        }
    });

    function handleEdit(event) {
        event.preventDefault();
        let productName = event.target.inputProductName.value;
        let productNameTranslated = event.target.inputProductTranslatedName.value;
        let productPrice = event.target.inputProductPrice.value;
        let productValuta = event.target.inputProductValuta.value;
        let productDescription = event.target.inputProductDescription.value;
        let productType = $('#productTypes option:selected').text();
        let productIngredients = event.target.inputIngredients.value;

        if (!validateData(productName, productNameTranslated, productIngredients)) {
            return;
        }
        const newProductData = {
            id: "",
            name: productName.toUpperCase(),
            nameTranslated: productNameTranslated,
            valuta: productValuta,
            price: productPrice + "*",
            type: productType,
            description: productDescription,
            ingredients: productIngredients
        };
        props.create(newProductData);
    }

    function validateData(productName, productNameTranslated, productIngredients) {
        if (productName.trim() === "") {
            $("#warningProductName").text("The field must not be empty!").show();
            return false;
        } else {
            $("#warningProductName").text("").hide();
        }
        if (productNameTranslated.trim() === "") {
            $("#warningProductNameTranslated").text("The field must not be empty!").show();
            return false;
        } else {
            $("#warningProductNameTranslated").text("").hide();
        }
        // if (productIngredients.trim() === "") {
        //     $("#warningIngredients").text("The field must not be empty!").show();
        //     return false;
        // } else {
        //     $("#warningIngredients").text("").hide();
        // }
        for (let i = 0; i < productIngredients.length; i++) {
            let characterData = productIngredients.charAt(i);
            if (characterData.match(/[!@#$%^&*().,"'`/\\]/)) {
                $("#warningIngredients").text("The word must be separeted with white space only!").show();
                return false;
            } else {
                $("#warningIngredients").text("").hide();
            }
        }
        return true
    }

    return (
        <div className="container" style={{marginTop: 70}}>
            <br/>
            <br/>
            <div className="d-flex justify-content-center h-100">
                <div className="card card-signin bg-dark">
                    <div className="card-header">
                        <h3>Create product</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleEdit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" className="form-control"
                                           placeholder="Name"
                                           required
                                           id={"inputProductName"}
                                           name={"inputProductName"}/>
                                    <p className="text-warning" id={"warningProductName"}
                                       style={{display: 'hidden', marginBottom: 0}}></p>
                                </div>

                                <div className="col-md-6">
                                    <input type="text" className="form-control"
                                           placeholder="Name translated"
                                           required
                                           id={"inputProductTranslatedName"}
                                           name={"inputProductTranslatedName"}/>
                                    <p className="text-warning" id={"warningProductTranslatedName"}
                                       style={{display: 'hidden', marginBottom: 0}}></p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="number" className="form-control"
                                           placeholder="Price"
                                           required
                                           id={"inputProductPrice"}
                                           name={"inputProductPrice"}/>
                                    <p className="text-warning" id={"warningProductPrice"}
                                       style={{display: 'hidden', marginBottom: 0}}></p>
                                </div>

                                <div className="col-md-6">
                                    <input type="text" className="form-control"
                                           value="денари"
                                           readOnly
                                           id={"inputProductValuta"}
                                           name={"inputProductValuta"}/>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-12">
                                    <textarea className="form-control"
                                              placeholder="Description"
                                              id={"inputProductDescription"}
                                              name={"inputProductDescription"}/>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <p style={{color: 'white'}}>Choose the type of product:</p>
                                </div>
                                <div className="col-md-6">
                                    <select className="form-control" id="productTypes">
                                        <option>Salad</option>
                                        <option>Appetizers</option>
                                        <option>GarnishAndExtras</option>
                                        <option>Grill</option>
                                        <option>Specialities</option>
                                        <option>DieshesToOrder</option>
                                        <option>Desserts</option>
                                        <option>Snacks</option>
                                        <option>Aperitives</option>
                                        <option>Wine</option>
                                        <option>SpecialWine</option>
                                        <option>Beer</option>
                                        <option>Coffee</option>
                                        <option>Tea</option>
                                        <option>SoftDrinks</option>
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <div className="row mb-2">
                                <div className="col-md pull-left" style={{color: 'white'}}>
                                    Choose only from these ingredients. Insert with white space between them and
                                    in english. Click on button to traslate them in english words.
                                    <a className="btn btn-info" onClick={() => setEnglish(!english)}>To
                                        english</a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12" style={{color: 'orange', fontSize: 13}}>
                                    {english === true ? englishIngredients : ingredients}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="text" className="form-control" id={"inputIngredients"}
                                           name={"inputIngredients"}
                                           placeholder="E.g. milk cabbage olive onion cheese"
                                           pattern="^[a-zA-Z\s]+$"/>
                                    <p className="text-warning" id={"warningIngredients"}
                                       style={{display: 'hidden', marginBottom: 0}}></p>
                                </div>
                            </div>
                            <br/>
                            <div className="form-group">
                                <input type="submit" value="Edit" className="btn login_btn"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};