import '../App.css';
import {Product, ProductFocus} from "./Product";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [openedItem, setOpenedItem] = useState('null');
    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`http://localhost:5000/webweb/products`);

            if (!response.ok) {
                const message = `An error occurred`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setProducts(records);
        }
        getProducts();
        return;
    }, [products.length]);

    function updateProduct(string){
       if(string === openedItem){
           setOpenedItem('null')
       }else{
           setOpenedItem(string)
       }
    }

    function AproductList() {
        return products.map((product) => {
            return (
                <div key={product._id} className={'productFocusContainer'}>
                    {openedItem !== product._id && (
                        <div onClick={() => updateProduct(product._id)}>
                        <Product name={product.Name} description={product.Description} price={product.Price} availability={product.Availability} key={product._id}/>
                        </div>
                            )}
                    {openedItem === product._id && (
                        <div>
                    <div onClick={() => updateProduct(product._id)} key={product._id}>
                        <Product className={'focused'} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability}/>
                        </div>
                        <ProductFocus name={product.Name} description={product.Description} price={product.Price} availability={product.Availability}/>
                    </div>
                        )}
                    </div>
            )});
    }
        return (
            <div>
            <input style={{zIndex: '2'}} className={'searchField'} placeholder={'search...'}/>
                <div className={'ProductContainer'}>
                    {AproductList()}
                </div>
            </div>
        );
    }

/*  <div className={'ProductContainer'}>
                        {names.map(function(name, description){
                            return(<Product key="{description}" name={name}/>);
                        })}
*/
