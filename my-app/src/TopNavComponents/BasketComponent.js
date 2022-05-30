export default function BasketComponent(props){

    function BasketItems(props) {
        return (
            <div>
                {props.basket.length !== 0 && (
                    props.basket.map((basketItem) => {
                        return (

                            <div key={basketItem._id}>
                                <div>{basketItem.Name}</div>
                                <button onClick={() => removeFromBasket(props = {props, basketItem})}>Remove from Basket
                                </button>
                            </div>
                        )
                    }))}
            </div>
        )
    }

    function removeFromBasket(props){
       //let newBasket = props.props.basket.filter(item => item !== props.basketItem)

        console.log(typeof props.props.basket)


        let index = Object.values(props.props.basket).findIndex(props.basketItem)

        let newBasket = Object.values(props.props.basket).splice(index, 1)

        //props.props.basket.remove(props.basketItem.id)
        props.props.setBasket(newBasket)


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
                    </div>
                )}{props.basket.length === 0 && (
                <div>Your Basket is Empty </div>
            )}
            </div>
        </div>
    )
}

function purchase(props){

    /*
    WHAT NEEDS TO BE DONE:

    AVAILABILITY HAS TO BE CHECKED
    A PURCHASE NEEDS TO BE LOGGED -> TO webweb/purchases AND THEN TO webweb/user

     */

}
