import '../App.css';
import {useEffect, useState} from "react";
import  './ProductList';

export function ProductFocus(props) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        async function getComments() {
            const response = await fetch(`http://localhost:5000/webweb/comments`);
            if (!response.ok) {
                const message = `Couldn't load comments`;
                return;
            }
            const comments = await response.json();
            setComments(comments);
        }
        getComments();
        return;
    }, [comments.length]);

    return (
        <div className="ProductFocus">
            <div className={'focusContent'}>
            <header className="Product-name">
            <p> {props.name} </p>
            </header>
            <p> {props.description} </p>
            <p> {props.price} €</p>
            <button style={{zIndex : '5'}} onClick={updateProducts(props._id)}>Buy Now</button>
            <p>{props.availability} available</p>
                <div >
                <input placeholder={'Write a comment'}/>
                    <button>send</button>

                </div>
            <Commentlist id={props._id} comments={comments}/>
            </div>
        </div>
    );
}

//   <button onClick={() => updateProduct('null')}>close</button>

export function Commentlist(props){
    return(
        <div>
            <p>Theres supposed to be comments here</p>
            {props.comments.filter(comment => comment.id === props.id).map(filteredComment => (
                <div>
                        {filteredComment}
                </div>
        ))}
        </div>
    )
}
export function Product(props){
    return(
                <div className={'Product'}>
                    <header className="Product-name">
                        <p> {props.name} </p>
                    </header>
                    <p> {props.price} €</p>
                </div>
    )
}

/*
export function Product(props) {
    const [showFocus, setFocus] = useState(props.state)
    return (
        <div>
        {showFocus === 'small' && (
            <div className={'productFocusContainer'}>
            <div className="Product" onClick={() => setFocus('big')}>
                <header className="Product-name">
                    <p> {props.name} </p>
                </header>
                <p> {props.price} €</p>
            </div>
                </div>
         )}
                {showFocus === 'big' && (
                    <div className={'productFocusContainer'}>
                    <div className="ProductBig" onClick={() => setFocus('small')}>
                        <header className="Product-name">
                            <p> {props.name} </p>
                        </header>
                        <p> {props.price} €</p>
                    </div>
                    <div onClick={() => setFocus('small')} className={'focusContainer'}>
                        <ProductFocus name={props.name} description={props.description} price={props.price} availability={props.availability}/>
                    </div>
                    </div>
                )}
        </div>
                )}
*/
                function updateProducts(){
                }






