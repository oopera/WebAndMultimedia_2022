import {useState} from "react";

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
            <div className={'focusContent'}>
                {props.basket.length !== 0 && (
                    <div>
                    <BasketItems setBasket={props.setBasket} basket={props.basket}/>
                    <button onClick={() => purchase(props)}>buy now</button> for {basketPrice}
                        <div id={'infobox'}></div>
                    </div>
                )}{props.basket.length === 0 && (
                <div>Your Basket is Empty </div>
            )}
            </div>
        </div>
    )
}

function purchase(props){
    let availabilityFlag = false
    props.basket.forEach(checkAvailability)

    function checkAvailability(basketItem){
        console.log(basketItem.Availability)
        if(props.basket.filter((v) => (v === basketItem)).length > basketItem.Availability){
            availabilityFlag = true
        }
    }
    if(availabilityFlag === true){
        document.getElementById("infobox").value = "ONE OF YOUR ITEMS IS NOT AVAILABLE IN THE QUANTITIES YOU SELECTED, PLEASE RECHECK";
    }

    /*

    WHAT NEEDS TO BE DONE:

    AVAILABILITY HAS TO BE CHECKED
    A PURCHASE NEEDS TO BE LOGGED -> TO webweb/purchases AND THEN TO webweb/user

     */

}
