import React from "react";
import XButton from "../XButton";
import {sendComment} from "../HelperFunctions/ProductFunctions";
import {CommentList} from "./CommentList";

export function updateBasket(props){
    let newBasket = props.basket.concat(props.product)
    props.setBasket(newBasket)
}

export function ProductFocus(props) {

    return (
        <div style={props.style} className="ProductFocus">
            <XButton setOpenedItem={props.setOpenedProduct}/>
            <div className={'focusContent'}>
                <header className="Product-name">
                <p> {props.name.toUpperCase()} </p>
                </header>
                <p> {props.description.toUpperCase()} // {props.price} € </p>
                {props.img !== undefined && (
                <img className={"productImage"} src={props.img} alt={props.name}/>
                )}
                {props.availability <= 0 && (
                    <p>Item is currently not in Stock</p>
                )}
                {props.availability > 0 && (
                    <div>
                    <button style={{zIndex : '5'}} onClick={() => updateBasket(props)}>Add to Basket</button>
                    <p>{props.availability} available</p>
                    </div>
                )}
                <div>
                    {props.isLoggedIn === false && (
                        <p>
                            You have to log in before you can leave a comment.
                        </p>
                    )}
                    {props.isLoggedIn !== false && props.isLoggedIn.Purchases.filter(e=> e.Products.includes(props.name)).length>0 &&  (
                        <div>
                    <input id={'commentInput'} placeholder={'Write a comment'}/>
                    <button onClick={() => sendComment(props, props.rerender, props.setRerender)}>send</button>
                        </div>
                        )}
                    {props.isLoggedIn !== false && props.isLoggedIn.Purchases.filter(e=> e.Products.includes(props.name)).length===0 &&  (
                        <div>
                            <p>You have to purchase the Item before you can leave a comment.</p>
                        </div>
                    )}

                </div>
                <CommentList id={props.id} comments={props.comments}/>
            </div>
        </div>
    );
}

