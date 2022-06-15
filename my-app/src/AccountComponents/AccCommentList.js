import {deleteAccComment} from "../HelperFunctions/AccountFunctions";
import React from "react";

export function AccCommentList(props){
    return(
            props.isLoggedIn.Comments.map((comment, index) => {
            return(
                <table className={"tablo"} key={comment._id}>
                    <tbody>
                    <tr>
                        <td key={comment.CommentID}>
                            Comment: {comment.Comment}</td>
                    </tr>
                    <tr >
                   <td> Item: {comment.Item} </td>
                </tr>
                    <button onClick={() => deleteAccComment(
                        comment,
                        props.setLoggedIn,
                        props.isLoggedIn,
                        index, props.rerender, props.setRerender, props.setComments)}>delete Comment</button>
                    <tr>
                        <td> </td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}> </td>
                    </tr>
                    </tbody>
            </table>

            )})
        )

}
