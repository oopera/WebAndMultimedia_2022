import '../App.css';
import {useState} from "react";

export function ProductFocus(props) {
    const [showFocus, setFocus] = props.pstate;
    return (
        <div className="ProductFocus">
            <header className="Product-name">
                <p> {props.name} </p>
            </header>s
            <p> {props.description} </p>
        </div>
    );

}

export function Product(props) {
    const [showFocus, setFocus] = useState('small')
    return (
        <div>
        {showFocus === 'small' && (
            <div className="Product" onClick={() => setFocus('big')}>
                <header className="Product-name">
                    <p> {props.name} </p>
                </header>

                <p> {props.price} €</p>
            </div>
         )}
                {showFocus === 'big' && (
                    <div className="ProductBig" onClick={() => setFocus('small')}>
                        <header className="Product-name">
                            <p> {props.name} </p>
                        </header>
                        <p> {props.description} </p>
                        <p> {props.price} €</p>
                        <button>Buy Now</button>
                        <p>{props.availability} available</p>

                    </div>
                )}
        </div>
                )
                }






