import React, {useEffect, useState} from "react";


export function Commentlist(props){
    return(
        props.comments.filter(comment => comment.id === props.id).map((filteredComment) => {
            return (
                <div key={filteredComment._id}>
                    <p> {filteredComment.name}: {filteredComment.comment} {filteredComment.Date}</p>
                </div>
            )
        }))

}

function updateBasket(props){
    let newBasket = props.basket.concat(props.product)
    props.setBasket(newBasket)

}


export function ProductFocus(props) {

    console.log(props.purchases)
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
        return;
    }, [comments.length]);
    return (
        <div style={props.style} className="ProductFocus">
            <div className={'focusContent'}>
                <header className="Product-name">
                    <p> {props.name} </p>
                </header>
                <p> {props.description} </p>
                <p> {props.price} €</p>
                <img className={"productImage"} src={props.img}/>
                <button style={{zIndex : '5'}} onClick={() => updateBasket(props)}>Add to Basket</button>
                <p>{props.availability} available</p>
                <div >
                    {props.purchases.filter(e=> e.Item === props.name).length>0 && props.isLoggedIn !== false && (
                        <div>
                    <input placeholder={'Write a comment'}/>
                    <button onClick={sendComment()}>send</button>
                        </div>
                        )}
                    {props.purchases.filter(e=> e.Item === props.name).length===0 && props.isLoggedIn !== false && (
                        <div>
                            You have to purchase the Item before you can leave a comment.
                        </div>
                    )}
                    {props.isLoggedIn === false && (
                        <div>
                            You have to log in before you can leave a comment.
                        </div>
                    )}
                </div>
                <Commentlist id={props.id} comments={comments}/>
            </div>
        </div>
    );
}

function sendComment(){

}
