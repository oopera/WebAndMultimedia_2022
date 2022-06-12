import '../App.css';
import XButton from "../XButton";
import {clear} from "../HelperFunctions/SessionFunctions";
import {deleteComment} from "../HelperFunctions/AccountFunctions";
import {ReactSession} from "react-client-session";

export function AccPurchaseList(props){
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
         props.comments.map((comment, index) => {
            return(
                <div className={'subItem'} key={comment.CommentID}>
                    <div> Comment: {comment.Comment} </div>
                    <div> Item: {comment.Item} </div>
                    <button onClick={() => deleteAccComment(comment, props.setComments, props.comments, index)}>delete Comment</button>
                </div>
            )}
        )
    )
}

function deleteAccComment(comment, setComments, comments, index){
    console.log(comment)
    deleteComment(comment)
    let commeys =(comments)
    commeys.splice(index, 1)
    setComments(commeys)
    ReactSession.set("Comments", comments);
}


export function AccountWindow(props) {
    return (
        <div className="FocusWindow">
            <XButton setOpenedItem={props.setOpenedItem}/>
            <div className={'focusContent'}>
                <button onClick={() => clear()}> CLEAR CACHE </button> <p>(you should log out immediately after, or the cache might be reloaded</p>
                <div> YOUR COMMENTS </div>
              <AccCommentList comments={props.accComments} setComments={props.setAccComments}/>
                <div> YOUR PURCHASES </div>
                <AccPurchaseList purchases={props.purchases}/>

            </div>
        </div>
    );
}
