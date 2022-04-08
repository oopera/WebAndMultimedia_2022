import '../App.css';
import {Product, ProductFocus} from "./Product";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";


export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState('hidden');
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

    function productList() {

        return products.map((product) => {
            return (
                <div>

                <Product state={'small'} name={product.Name} description={product.Description} price={product.Price} availability={product.Availability} key={product._id}/>
                        </div>

            )});
    }
        return (

                <div onClick={setProducts['']} className={'ProductContainer'}>
                    <input style={{zIndex: '2'}} className={'searchField'} placeholder={'search...'}/>
                    {productList()}
                </div>
        );
    }



/*  <div className={'ProductContainer'}>
                        {names.map(function(name, description){
                            return(<Product key="{description}" name={name}/>);
                        })}
*/
