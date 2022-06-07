import React, {useState} from "react";
import {Link} from "react-router-dom";
import '../ProductComponents/ProductList'
import Select from "react-select";
import clear from '../App.js'
import {ReactSession} from "react-client-session";
import TopNav from "./TopNav";
export default function HamNav(props) {
    const [hamNav, setHamNav] = useState(false);

    function changeFunction(){
        setHamNav(!hamNav);
        props.setOpenedItem('none')
    }
    return(

        <div className={'mobileNav'} >
            {hamNav === false && (
                <button className={'hamNavButtonClosed'} onClick={() => changeFunction()}> </button>
            )}
            {hamNav === true && (
                <button className={'hamNavButtonOpen'} onClick={() => changeFunction()}> </button>
            )}
            {hamNav === true && (
                    <div className={'FocusWindow'}>
                        <div className={'XButton'} onClick={()=>setHamNav(!hamNav)}> </div>
                        <TopNav setReload={props.setReload} reload={props.reload} basket={props.basket} setAccComments={props.setAccComments} setPurchases={props.setPurchases} isLoggedIn={props.isLoggedIn}
                                setLoggedIn={props.setLoggedIn} account={props.account} setAccount={props.setAccount} openedItem={props.openedItem}
                                setOpenedItem={props.setOpenedItem}/>
                    </div>
            )}
        </div>

    )
}
