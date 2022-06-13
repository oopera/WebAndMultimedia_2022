import React from "react";

export function CommentList(props){
    return(
        <div className={'commentBox'}>
            <table className={"tablo"}>
                {props.comments.filter(comment => comment.productID === props.id).map((filteredComment) => {
                    return (
                        <tr>
                            <td className={'tableTingHeader'} key={filteredComment._id}> {filteredComment.name}: {filteredComment.comment} {filteredComment.Date}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}
