import React, {useEffect, useState} from "react";
import XButton from "../XButton";
import {sendComment} from "../HelperFunctions/ProductFunctions";



export function Commentlist(props){
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

function updateBasket(props){
    let newBasket = props.basket.concat(props.product)
    props.setBasket(newBasket)
}

export function ProductFocus(props) {
    const [rerender, setRerender] = useState(false)
    const [comments, setComments] = useState([]);
    useEffect(() => {
        async function getComments() {
            const response = await fetch(`http://localhost:5000/webweb/comments`);
            if (!response.ok) {
                const message = `Comments could not be loaded`;
                window.alert(message);
            }
            const comments = await response.json();
            setComments(comments);
        }
        getComments();
    }, [comments.length, rerender.valueOf()]);

    return (
        <div style={props.style} className="ProductFocus">
            <XButton setOpenedItem={props.setOpenedItem}/>
            <div className={'focusContent'}>
                <header className="Product-name">
                <p> {props.name} </p>
                </header>
                <p> {props.description} // {props.price} € </p>
                {props.img !== undefined && (
                <img className={"productImage"} src={props.img} alt={props.name}/>
                )}
                {props.availability <= 0 && (
                    <p style={{border: "1pt solid black"}}>Item is currently not in Stock</p>
                )}
                {props.availability !== 0 && (
                    <div>
                    <button style={{zIndex : '5'}} onClick={() => updateBasket(props)}>Add to Basket</button>
                    <p>{props.availability} available</p>
                    </div>
                )}
                <div>
                    {props.purchases.filter(e=> e.Products.includes(props.name)).length>0 && props.isLoggedIn !== false && (
                        <div>
                    <input id={'commentInput'} placeholder={'Write a comment'}/>
                    <button onClick={() => {sendComment(props, rerender, setRerender);}}>send</button>
                        </div>
                        )}
                    {props.purchases.filter(e=> e.Products.includes(props.name)).length===0 && props.isLoggedIn !== false && (
                        <div>
                            <p>You have to purchase the Item before you can leave a comment.</p>
                        </div>
                    )}
                    {props.isLoggedIn === false && (
                        <p>
                            You have to log in before you can leave a comment.
                        </p>
                    )}
                </div>
                <Commentlist id={props.id} comments={comments}/>
            </div>
        </div>
    );
}

