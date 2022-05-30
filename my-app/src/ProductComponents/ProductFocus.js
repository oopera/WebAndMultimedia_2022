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
    console.log(typeof newBasket)
    props.setBasket(newBasket)

}

function softRerender(props){
    props.setRerender(!props.rerender)
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
                {props.availability === 0 && (
                    <p>Item is currently not in Stock</p>
                )}
                {props.availability !== 0 && (
                    <div>
                    <button style={{zIndex : '5'}} onClick={() => updateBasket(props, rerender, setRerender)}>Add to Basket</button>
                    <p>{props.availability} available</p>
                    </div>
                )}
                <div>

                    {props.purchases.filter(e=> e.Item === props.name).length>0 && props.isLoggedIn !== false && (
                        <div>
                    <input id={'commentInput'} placeholder={'Write a comment'}/>
                    <button onClick={() => sendComment(props)}>send</button>
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

async function sendComment(props){
    let comment = document.getElementById("commentInput").value;
    let id = props.id
    let name = props.isLoggedIn

    const newComment = {name, comment, id};
    const response = await fetch("http://localhost:5000/comments/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
    })
        .catch(error => {
            window.alert("DAT SHIT AIN FUNSHIONIN MAYNEEE");
        });
    console.log(response.ok)
    softRerender(props)
}

