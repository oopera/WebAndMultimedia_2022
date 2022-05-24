import React, {useEffect, useState} from "react";
import AdminControl from "../AdminComponents/AdminControl";
import {AccountWindow} from "../AccountComponents/AccountWindow";

export default function SubWindow(props){


return(
    <div>
    {props.openedItem === 'admin' && (
        <AdminControl/>
    )}
    {props.openedItem === 'account' && (
        <AccountWindow accComments={props.accComments} purchases={props.purchases}/>
    )}
</div>
)

}
