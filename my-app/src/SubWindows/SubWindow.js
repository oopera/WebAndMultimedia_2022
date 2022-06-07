import React, {useEffect, useState} from "react";
import AdminControl from "../AdminComponents/AdminControl";
import {AccountWindow} from "../AccountComponents/AccountWindow";
import BasketComponent from "../TopNavComponents/BasketComponent";

export default function SubWindow(props){
return(
    <div>
    {props.openedItem === 'admin' && (
        <AdminControl setOpenedItem={props.setOpenedItem} products={props.products}/>
    )}
    {props.openedItem === 'account' && (
        <AccountWindow setOpenedItem={props.setOpenedItem} accComments={props.accComments} purchases={props.purchases}/>
    )}
    {props.openedItem === 'basket' && (
        <BasketComponent setOpenedItem={props.setOpenedItem} setReload={props.setReload} reload={props.reload} isLoggedIn={props.isLoggedIn} setBasket={props.setBasket} basket={props.basket}/>
    )}
    </div>
    )}
