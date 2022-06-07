import '../App.css';
import React, {useEffect, useState} from "react";
import {ReactSession} from "react-client-session";
import XButton from "../XButton";

export function AccPurchaseList(props){
    console.log(props.purchases)
    return(
        props.purchases.map((purchase) => {
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
export function AccCommentList(props){
    return(
         props.comments.map((comment) => {
            return(
                <div className={'subItem'} key={comment.CommentID}>
                    <div> Comment: {comment.Comment} </div>
                    <div> Item: {comment.Item} </div>
                </div>
            )}
        )
    )
}
function clear(){
    ReactSession.set("wholeAcc", "");
    ReactSession.set("admin", "");
    ReactSession.set("Purchases", "");
    ReactSession.set("Comments", "");
    ReactSession.set("hasData", false);
}

export function AccountWindow(props) {
    return (
        <div className="FocusWindow">
            <XButton setOpenedItem={props.setOpenedItem}/>
            <div className={'focusContent'}>
                <button onClick={() => clear()}> CLEAR CACHE </button> (you should log out immediately after, or the cache might be reloaded
                <div> YOUR COMMENTS </div>
              <AccCommentList comments={props.accComments}/>
                <div> YOUR PURCHASES </div>
                <AccPurchaseList purchases={props.purchases}/>

            </div>
        </div>
    );
}
