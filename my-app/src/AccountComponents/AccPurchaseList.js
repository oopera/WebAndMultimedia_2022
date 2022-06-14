import React from "react";

export function AccPurchaseList(props){
    return(
        props.isLoggedIn.Purchases.map((purchase) => {
            return(
                <table key={purchase._id} className={"tablo"}>
                    <tbody>
                        {purchase.Products.map((product, index) => {
                            return(
                                <tr key={index}>
                                <td> Item: {product} </td>
                        </tr>
                            )
                        })}
                    <tr >
                    <td className={'tableTing'}> Price: {purchase.Cost}€ </td>
                        </tr>
                    <tr >
                    <td className={'tableTing'}> Date: {purchase.Date} </td>
                        </tr>
                    <tr >
                        <td className={'tableTing'}> </td>
                    </tr>
                    <tr >
                        <td className={'tableTing'}> </td>
                    </tr>
                    </tbody>
                </table>
            )}
        )
    )
}
