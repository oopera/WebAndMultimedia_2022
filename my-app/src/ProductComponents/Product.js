import '../App.css';
import React, {useEffect, useState} from "react";
import  './ProductList';
import Select from "react-select";

export function ProductFocus(props) {
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
            <button style={{zIndex : '5'}} onClick={updateProducts(props._id)}>Buy Now</button>
            <p>{props.availability} available</p>
                <div >
                <input placeholder={'Write a comment'}/>
                    <button>send</button>

                </div>
            <Commentlist id={props.id} comments={comments}/>
            </div>
        </div>
    );
}


export function Commentlist(props){
    return(
        props.comments.filter(comment => comment.id === props.id).map((filteredComment) => {
            return (
             <div key={filteredComment.id}>
                <p> {filteredComment.name}: {filteredComment.comment} {filteredComment.Date}</p>
        </div>
        )
            }))

}


export function CommentListTwo(props){
    return props.comments.map((comment) => {
        return (
            <div>{comment.Name}</div>
        )})
}

export function Product(props){
    return(
                <div className={props.className} style={props.style}>
                    <header className="Product-name">
                        <h1 className={'header'}> {props.name} </h1>
                    </header>

                    <p className="text-1xl font-bold underline"> {props.price}€</p>
                </div>
    )
}

function updateProducts(){
                }






