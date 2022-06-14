import React from "react";

export function AccPurchaseList(props){
    return(
        props.isLoggedIn.Purchases.map((purchase) => {
            return(
                <table className={"tablo"}>
                    <tbody>

                    {purchase.Products.map((product, index) => {
                        return(
                            <tr >
                            <td key={index}> Item: {product} </td>
                    </tr>
                        )
                    })}

                    <tr >
                    <td className={'tableTing'}> Price: {purchase.Cost}€ </td>
                        </tr>
                    <tr >
                    <td className={'tableTing'}> Date: {purchase.Date} </td>
                        </tr>
                    </tbody>
                </table>
            )}
        )
    )
}
