import '../App.css';
import {useState} from "react";

function ProductFocus(props) {
    const [show, setVisibility] = useState();
    return (
        <div className="ProductFocus">
            <header className="Product-name">
                <p> {props.name} </p>
            </header>
            <p> {props.description} </p>
        </div>
    );

}

function Product(props) {

    return (
            <div className="Product" onClick={() => ProductFocus(props)}>
                <header className="Product-name">
                    <p> {props.name} </p>
                </header>
                <p> {props.description} </p>
                <p> {props.price} €</p>
            </div>
        );

}


export default Product;
