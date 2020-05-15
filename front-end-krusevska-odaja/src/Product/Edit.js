import React from "react";
import {Link, Redirect} from "react-router-dom";
import $ from "jquery";

export const Edit = (props) => {
    const productToEdit = JSON.parse(sessionStorage.getItem("productToEdit"));
    console.log(productToEdit);
    const handleEdit = (event) => {
        event.preventDefault();
    };
    return(
        <div><h1>DJNOASDNSANODASO</h1></div>
    )
};