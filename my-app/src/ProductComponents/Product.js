import '../App.css';
import React from "react";
import  './ProductList';

// Simple component to render the product item in productlist
export function Product(props){
    return(
            <div className={props.className} style={props.style}>
                <header className={"Product-name"}>
                    <div > {props.name.toUpperCase()} </div>
                </header>
                <p className={'price'}> {props.price}€</p>
            </div>
    )
}








