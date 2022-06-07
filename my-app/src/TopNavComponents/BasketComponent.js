import React, {useState} from "react";
import {updateUser} from "../ProductComponents/ProductFocus";
import XButton from "../XButton";

export default function BasketComponent(props){
    const [rerender, setRerender] = useState(false)
    function BasketItems(props) {
        return (
            <div>
                {props.basket.length !== 0 && (
                    props.basket.map((basketItem, index) => {
                        return (
                            <div key={index}>
                                <div>{basketItem.Name}</div>
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

async function purchase(props, basketPrice){
    let availabilityFlag = true
    let products = []
    document.getElementById("infobox").innerHTML = "";
    props.basket.forEach(checkAvailability)

    function checkAvailability(basketItem){
        console.log(basketItem)
        products.push(basketItem.Name)
        if(props.basket.filter((v) => (v === basketItem)).length > basketItem.Availability && basketItem.Availability !== true){
            availabilityFlag = false
        }
    }

    if(availabilityFlag === false){
        document.getElementById("infobox").innerHTML = "ONE OF YOUR ITEMS IS NOT AVAILABLE IN THE QUANTITIES YOU SELECTED, PLEASE RECHECK";
        console.log("WEEE ITS NOT AVAILABLE ANYMORE")
        return;
    }

    props.setBasket([])
    props.basket.forEach(updateProduct)
    async function updateProduct(basketItem){
        if(basketItem.Availability === true) return
        basketItem.Availability = basketItem.Availability-1
        const updatedProduct = {
            Name: basketItem.Name,
            Description: basketItem.Description,
            Price: basketItem.Price,
            Availability: basketItem.Availability-1
        };

        const response = await fetch(`http://localhost:5000/updateProduct/${basketItem._id.toString()}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        })
            .catch(error => {
                window.alert("DAT SHIT AIN FUNSHIONIN MAYNEEE");
            });
    }

    let email;
    let date = new Date().toISOString().slice(0, 10)
    let price = basketPrice
    if(props.isLoggedIn.Email !== undefined){
         email = props.isLoggedIn.Email
    }else{
         email = ""
    }
    const newOrder = {email, date, price, products};
    console.log(products)
        const response = await fetch("http://localhost:5000/purchases/add", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newOrder),
        })
            .catch(error => {
                window.alert("DAT SHIT AIN FUNSHIONIN MAYNEEE");
            });

    const purchaseDB = await response.json();
    console.log(purchaseDB)
    const purchase2Blogged = {Products: products, Cost: price, Date: date, PurchaseID: purchaseDB.insertedId}
    props.isLoggedIn.Purchases.push(purchase2Blogged)
    props.setReload(!props.reload)
    if (email === "") return
    updateUser(props)

}

