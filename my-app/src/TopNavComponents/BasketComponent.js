import React, {useState} from "react";
import XButton from "../XButton";
import {purchase} from "../HelperFunctions/ProductFunctions";


export default function BasketComponent(props){
    const [rerender, setRerender] = useState(false)
    function BasketItems(props) {
        return (
            <div>
                {props.basket.length !== 0 && (
                    props.basket.map((basketItem, index) => {
                        return (
                            <div className={'subItem'} key={index}>
                                <div>{basketItem.Name} {basketItem.Price}€</div>
                                <button onClick={() => removeFromBasket(props = {props, basketItem, index})}>Remove from Basket
                                </button>
                            </div>
                        )
                    }))}
            </div>
        )
    }

    function removeFromBasket(props){
        let baskey = props.props.basket
        baskey.splice(props.index, 1)
        props.props.setBasket(baskey)
        setRerender(!rerender)
    }

    let basketPrice = 0
    for(let item of props.basket){
        basketPrice = basketPrice+item.Price
    }

    return(
        <div className={'FocusWindow'}>
            <XButton setOpenedItem={props.setOpenedItem}/>
            <div className={'focusContent'}>
                {props.basket.length !== 0 && (
                    <div>
                    <BasketItems setBasket={props.setBasket} basket={props.basket}/>
                    <button onClick={() => purchase(props, basketPrice)}>buy now</button> for {basketPrice}
                        <p id={'infobox'}> </p>
                    </div>
                )}{props.basket.length === 0 && (
                <div>Your Basket is Empty </div>
            )}
            </div>
        </div>
    )
}


