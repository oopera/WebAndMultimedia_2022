import React from "react";


// Maps the Comments on a specific product, gets called in ProductFocus
export function CommentList(props){
    return(
        <div className={'commentBox'}>
            <table className={"tablo"}>
                <tbody>
                {props.comments.filter(comment => comment.productID === props.id).map((filteredComment) => {
                    return(
                        <tr key={filteredComment._id}>
                            <td className={'tableTingHeader'}> {filteredComment.name}: {filteredComment.comment} {filteredComment.Date}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
