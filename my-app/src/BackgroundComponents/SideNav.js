import React from "react";

// Displays the User Guide on the Right hand side
export default function SideNav(){
    return(
        <div className={'sideBox'}>Welcome to my brutalist nightmare. Enjoy your time. Or dont. I dont care, I'm a div.
            need help?
            <table>
                <tbody>
                    <tr>
                        <td className={'tableTingHeader'}>Functions:</td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>Logging in & registering</td>
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
                        <td className={'tableTing'}>On Mobile View you can use the Arrow located in the top left as the Navigation</td>
                    </tr>
                    <tr>
                        <td className={'tableTingHeader'}>How do you use it? </td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>Click on an Item (The Text with Prices next to them on the left hand side) </td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>Check Availability and add to Basket (You wont be able to purchase if your basket contains more than Available, but you'll save a step by checking beforehand ;) </td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>In Basket you'll see the resulting final price and you'll be able to purchase. </td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>You can also create an account. To do so you have to click on register, enter your data and click register again. Once youre registered you can log in with your credentials</td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>Once youre logged in, you can leave Comments on items you have purchased. View your purchases and comment - and of course - delete your account.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
