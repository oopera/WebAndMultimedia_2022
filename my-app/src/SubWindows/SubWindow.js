import React, {useEffect, useState} from "react";
import AdminControl from "../AdminComponents/AdminControl";
import {AccountWindow} from "../AccountComponents/AccountWindow";
import BasketComponent from "../TopNavComponents/BasketComponent";

export default function SubWindow(props){


return(
    <div>
    {props.openedItem === 'admin' && (
        <AdminControl products={props.products}/>
    )}
    )}
    {props.openedItem === 'account' && (
        <AccountWindow accComments={props.accComments} purchases={props.purchases}/>
    )}
        {props.openedItem === 'basket' && (
            <BasketComponent setBasket={props.setBasket} basket={props.basket}/>
        )}
</div>
)

}
