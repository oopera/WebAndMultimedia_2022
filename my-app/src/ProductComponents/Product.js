import '../App.css';
import React, {useEffect, useState} from "react";
import  './ProductList';


export function Product(props){
    return(
                <div className={props.className} style={props.style}>
                    <header className="Product-name">
                        <div > {props.name} </div>
                    </header>
                    <p> {props.price}€</p>
                </div>
    )
}








