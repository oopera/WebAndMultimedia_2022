import React from "react";

export default function SideNav(){


    return(
        <div className={"sideBox"}>Welcome to my brutalist nightmare. Enjoy your time. Or dont. I dont care, I'm a div.
            need help?

            <table>
                <tr>
                    <td className={'tableTingHeader'}>Functions:</td>
                </tr>
                <tr>
                    <td className={'tableTing'}>Logging in & registring</td>
                </tr>
                <tr>
                    <td className={'tableTing'}>Putting Items into baskets</td>
                </tr>
                <tr>
                    <td className={'tableTing'}>Purchasing the Basket</td>
                </tr>
                <tr>
                    <td className={'tableTing'}>Searching for Items</td>
                </tr>
                <tr>
                    <td className={'tableTing'}>Find your Comments and Purchases once you logged in under "Account"</td>
                </tr>
                <tr>
                    <td className={'tableTing'}>On Mobile View the Green Square functions as the Navigation</td>
                </tr>
                <tr>
                    <td className={'tableTingHeader'}>How do you use it? </td>
                </tr>
                <tr>
                    <td className={'tableTing'}>Click on an Item (The Text with Prices next to them on the left hand side) </td>
                </tr>
                <tr>
                    <td className={'tableTing'}>Check Availability and add to Basket (You wont be able to purchase if your basket contains more than Available, but youll save a step by checking beforehand ;) </td>
                </tr>
                <tr>
                    <td className={'tableTing'}>In Basket youll see the resulting final price and youll be able to purchase. </td>
                </tr>
                <tr>
                    <td className={'tableTing'}>DISCLAIMER!!! Dont use serious credentials on here if you create an account - i don't want to have the responsibility attached to that. Also - once you log in you might want to clear the cache under "account" since Information will be stored to localstorage</td>
                </tr>
            </table>
        </div>
    )
}
