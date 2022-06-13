import {deleteAccComment} from "../HelperFunctions/AccountFunctions";

export function AccCommentList(props){
    return(
        props.isLoggedIn.Comments.map((comment, index) => {
            return(
                <div className={'subItem'}
                     key={comment.CommentID}>
                    <div> Comment: {comment.Comment} </div>
                    <div> Item: {comment.Item} </div>
                    <button onClick={() => deleteAccComment(
                        comment,
                        props.setLoggedIn,
                        props.isLoggedIn.Comments,
                        index)}>delete Comment</button>
                </div>
            )}
        )
    )
}
