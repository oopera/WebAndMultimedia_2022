import '../App.css';
import React, {useEffect, useState} from "react";
import  './ProductList';


export function Product(props){
    return(
                <div className={props.className} style={props.style}>
                    <header className="Product-name">
                        <h1 className={'header'}> {props.name} </h1>
                    </header>

                    <p className="text-1xl font-bold underline"> {props.price}€</p>
                </div>
    )
}








