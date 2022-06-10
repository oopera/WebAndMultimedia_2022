import '../App.css';
import XButton from "../XButton";
import {clear} from "../HelperFunctions/SessionFunctions";

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

export function AccountWindow(props) {
    return (
        <div className="FocusWindow">
            <XButton setOpenedItem={props.setOpenedItem}/>
            <div className={'focusContent'}>
                <button onClick={() => clear()}> CLEAR CACHE </button> <p>(you should log out immediately after, or the cache might be reloaded</p>
                <div> YOUR COMMENTS </div>
              <AccCommentList comments={props.accComments}/>
                <div> YOUR PURCHASES </div>
                <AccPurchaseList purchases={props.purchases}/>

            </div>
        </div>
    );
}
