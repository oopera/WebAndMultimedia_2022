import '../App.css';
import XButton from "../XButton";
import {clear} from "../HelperFunctions/SessionFunctions";
import {AccCommentList} from "./AccCommentList";
import {AccPurchaseList} from "./AccPurchaseList";


export function AccountWindow(props) {
    return (
        <div className="FocusWindow">
            <XButton setOpenedItem={props.setOpenedItem}/>
            <div className={'focusContent'}>
                <button onClick={() => clear()}>
                    CLEAR CACHE
                </button>
                <p>
                    (you should log out immediately after, or the cache might be reloaded)
                </p>
                <p className={'bold'}> YOUR COMMENTS </p>
                <AccCommentList isLoggedIn={props.isLoggedIn}
                                setLoggedIn={props.setLoggedIn}
                                rerender={props.rerender}
                                setRerender={props.setRerender}/>
                <p className={'bold'}> YOUR PURCHASES </p>
                <AccPurchaseList isLoggedIn={props.isLoggedIn}/>

            </div>
        </div>
    );
}
