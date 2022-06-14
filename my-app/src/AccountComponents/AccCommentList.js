import {deleteAccComment} from "../HelperFunctions/AccountFunctions";
import React from "react";

export function AccCommentList(props){
    return(

            props.isLoggedIn.Comments.map((comment, index) => {
            return(
                <table className={"tablo"}>
                    <tbody>
                    <tr>
                        <td key={comment.CommentID} className={'tableTingHeader'}>
                            Comment: {comment.Comment}</td>
                    </tr>
                    <tr >
                   <td lassName={'tableTing'}> Item: {comment.Item} </td>
                </tr>
                    <button onClick={() => deleteAccComment(
                        comment,
                        props.setLoggedIn,
                        props.isLoggedIn,
                        index, props.rerender, props.setRerender)}>delete Comment</button>

                    </tbody>
            </table>

            )})
        )

}
