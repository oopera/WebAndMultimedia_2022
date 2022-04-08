import '../App.css';
import {useState} from "react";

export function ProductFocus(props) {
    return (
        <div className="ProductFocus">
            <header className="Product-name">
                <p> {props.name} </p>
            </header>
            <p> {props.description} </p>
            <p> {props.price} €</p>
            <button onClick={updateProducts(props._id)}>Buy Now</button>
            <p>{props.availability} available</p>
        </div>
    );

}

export function Product(props) {
    const [showFocus, setFocus] = useState(props.state)
    return (
        <div>
        {showFocus === 'small' && (
            <div className={'productFocusContainer'}>
            <div className="Product" onClick={() => setFocus('big')}>
                <header className="Product-name">
                    <p> {props.name} </p>
                </header>

                <p> {props.price} €</p>
            </div>
                </div>
         )}
                {showFocus === 'big' && (
                    <div className={'productFocusContainer'}>
                    <div className="ProductBig" onClick={() => setFocus('small')}>
                        <header className="Product-name">
                            <p> {props.name} </p>
                        </header>
                        <p> {props.price} €</p>

                    </div>
                    <div onClick={() => setFocus('small')} className={'focusContainer'}>
                        <ProductFocus name={props.name} description={props.description} price={props.price} availability={props.availability}/>
                    </div>
                    </div>
                )}
        </div>
                )
                }

                function updateProducts(){



                }






