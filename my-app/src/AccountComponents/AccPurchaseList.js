export function AccPurchaseList(props){
    return(
        props.isLoggedIn.Purchases.map((purchase) => {
            return(
                <div className={'subItem'} key={purchase.PurchaseID}>
                    {purchase.Products.map((product, index) => {
                        return(
                            <div key={index}> Item: {product} </div>
                        )
                    })}
                    <div> Price: {purchase.Cost}€ </div>
                    <div> Date: {purchase.Date} </div>
                </div>
            )}
        )
    )
}
