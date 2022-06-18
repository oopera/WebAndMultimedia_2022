import {deleteAccComment} from "../HelperFunctions/AccountFunctions";
import React from "react";

// Maps Account Comments for AccountWindow in a table. Throws and Error since buttons can not be children of tables, its non-destructive though, should be handled like a warning.
export function AccCommentList(props){
    return(
            props.isLoggedIn.Comments.map((comment, index) => {
                return(
                    <table className={"tablo"} key={comment._id}>
                        <tbody >
                            <tr>
                                <td>
                                    Comment: {comment.Comment}
                                </td>
                            </tr>
                            <tr>
                                <td> Item: {comment.Item} </td>
                            </tr>
                            <tr>
                            <td onClick={() => deleteAccComment(
                                comment,
                                props.setLoggedIn,
                                props.isLoggedIn,
                                index, props.setComments)}>delete Comment
                            </td>
                            </tr>
                            <tr>
                                <td> </td>
                            </tr>
                            <tr>
                                <td className={'tableTing'}> </td>
                            </tr>
                        </tbody>
                    </table>
                )
        })
    )
}
