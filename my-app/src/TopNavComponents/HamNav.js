import React, {useState} from "react";
import '../ProductComponents/ProductList'
import TopNav from "./TopNav";

export default function HamNav(props) {
    const [hamNav, setHamNav] = useState(false);
    const [help, setHelp] = useState(false);

    function changeFunction(){
        setHamNav(!hamNav);
        props.setOpenedItem('none')
    }

    return(
        <div className={'mobileNav'}>
            {help === true && (
                <div className={'FocusWindow'}>
                    <div className={'XButton'} onClick={()=>setHelp(!help)}> </div>
                        <div >Welcome to my brutalist nightmare. Enjoy your time. Or dont. I dont care, I'm a div.
                            need help?
                            <table className={'tablo'}>
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
                                    <td className={'tableTing'}>DISCLAIMER!!! Dont use serious credentials on here if you create an account - i don't want to have the responsibility attached to that. Also - once you log in you might want to clear the cache under "account" since Information will be stored to localstorage</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

            )}
            {hamNav === false && (
                <i className={'arrow right'} onClick={() => changeFunction()}> </i>
            )}
            {hamNav === true && (
                <i className={'arrow left'} onClick={() => changeFunction()}> </i>
            )}
            {hamNav === true && help === false && (
                    <div className={'FocusWindow'}>
                        <div className={'XButton'} onClick={()=>setHamNav(!hamNav)}> </div>
                        <TopNav
                                basket={props.basket}
                                isLoggedIn={props.isLoggedIn}
                                setLoggedIn={props.setLoggedIn}
                                openedItem={props.openedItem}
                                setOpenedItem={props.setOpenedItem}/>
                        <button id={'helpButton'} className={'navButton'} onClick={() => setHelp(true)}>help </button>
                    </div>

            )}

        </div>

    )
}
