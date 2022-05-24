import '../App.css';
import React, {useEffect, useState} from "react";


export function AccountWindow(props) {
    let comments = []
    let purchases = []
    for(let comment of props.accComments) {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/comments/${comment.CommentID.toString()}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${comment} not found`);
                return;
            }

            if (!comments.includes(record)) {
                comments.push(record);
            }
        }
        fetchData();
    }

    for(let purchase of props.purchases) {
        async function fetchData() {

            const response = await fetch(`http://localhost:5000/purchases/${purchase.PurchaseID.toString()}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${purchase} not found`);
                return;
            }

            if (!purchases.includes(record)) {
                purchases.push(record);
            }
        }
        fetchData();
    }


    const [selectedInfo, setSelectedInfo] = useState('none');


    return (
        <div style={props.style} className="FocusWindow">
            <div className={'focusContent'}>
              <AccCommentList accComments={comments}/>
                <AccPurchaseList purchases={purchases}/>
            </div>
        </div>
    );
}
function AccPurchaseList(props){
    console.log(props.purchases)
    return(
        props.purchases.map((purchase) => {
            return(
                <div key={purchase._id}>
                    <div> {purchase.productname} </div>
                    <div> {purchase.date} </div>

                </div>

            )}

        )
    )

}

function AccCommentList(props){
    return(
        props.accComments.map((comment) => {
            return(
                <div key={comment.CommentID}>
                <div> {comment.Comment} </div>
                <div> {comment.Product} </div>
                </div>

            )}

            )
    )
}
