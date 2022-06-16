import '../App.css';
import XButton from "../XButton";
import {clearCache} from "../HelperFunctions/SessionFunctions";
import {AccCommentList} from "./AccCommentList";
import {AccPurchaseList} from "./AccPurchaseList";

// Displays AccountWindow with Comments and Purchases
export function AccountWindow(props) {
    return (
        <div className="FocusWindow">
            <XButton setOpenedItem={props.setOpenedItem}/>
                <div className={'focusContent'}>
                    <p> Currently logged in as {props.isLoggedIn.Email}</p>
                    <div className={'rowDiv'}>
                        <button onClick={() => clearCache()}>
                            CLEAR CACHE
                        </button> <p id={'cacheBox'}> </p>
                    </div>
                        <p>
                            (you should log out immediately after, or the cache might be reloaded)
                        </p>
                        <p className={'bold'}> YOUR COMMENTS </p>
                            <AccCommentList isLoggedIn={props.isLoggedIn}
                                            setLoggedIn={props.setLoggedIn}
                                            setComments={props.setComments}/>
                        <p className={'bold'}> YOUR PURCHASES </p>
                            <AccPurchaseList isLoggedIn={props.isLoggedIn}/>
                </div>
        </div>
    );
}
