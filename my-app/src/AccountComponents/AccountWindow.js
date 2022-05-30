import '../App.css';
import React, {useEffect, useState} from "react";

export function AccPurchaseList(props){

    return(
        props.purchases.map((purchase) => {
            return(
                <div className={'subItem'} key={purchase.PurchaseID}>
                    <div> Item: {purchase.Item} </div>
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


export function AccountWindow(props) {
    return (
        <div className="FocusWindow">
            <div className={'focusContent'}>
                <div> YOUR COMMENTS </div>
              <AccCommentList comments={props.accComments}/>
                <div> YOUR PURCHASES </div>
                <AccPurchaseList purchases={props.purchases}/>

            </div>
        </div>
    );
}
