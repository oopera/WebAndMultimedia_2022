import '../App.css';
import {Product} from "./Product";
import {ProductFocus} from "./ProductFocus";
import React, {useEffect, useState} from "react";

export default function ProductList(props) {
    const [rerender, setRerender] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [openedProduct, setOpenedProduct] = useState('');
    function softRerender(){
        setRerender(!rerender);
    }

    function updateProduct(string){
       if(string === setOpenedProduct){
           setOpenedProduct('null');

       }else{
           setOpenedProduct(string);

       }
    }
    const colors =
        ['black','black','black','black','black','black','black','black',]
    let counter = -1;

    function AproductList(props) {
        return props.products.map((product) => {
            counter = counter + 1
            if(counter === colors.length){
                counter = 0
            }
            return (
                <div key={product._id}>
                    {openedProduct !== product._id  &&
                        product.Name.toLowerCase().includes(searchInput.toLowerCase()) && (
                        <div onClick={() => updateProduct(product._id)}>
                        <Product style={{borderColor: colors[counter]}} img={product.img} className={'Product'} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability} key={product._id}/>
                        </div>
                            )}
                    {openedProduct === product._id && (
                        <>
                        <div onClick={() => updateProduct(product._id)} key={product._id}>
                        <Product  onClick={() => updateProduct(product._id)} key={product._id} style={{borderColor: colors[counter]}} className={'Focused'} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability}/>
                        </div>
                        <ProductFocus setOpenedItem={setOpenedProduct} isLoggedIn={props.isLoggedIn} style={{borderColor: colors[counter]}} purchases={props.purchases} basket={props.basket} setBasket={props.setBasket} product={product} comments={product.Comments} img={product.img} id={product._id} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability}/>
                        </>
                        )}
                </div>
            )});
    }
        return (
            <div className={'ProductContainerOO'}>
            <input onChange={(evt) => setSearchInput(evt.target.value)} style={{zIndex: '2'}} className={'searchField'} placeholder={'search...'}/>
                <div className={'ProductContainer'}>

                    {AproductList(props)}
                </div>
            </div>
        );
    }

