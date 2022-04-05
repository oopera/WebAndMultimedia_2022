import '../App.css';
import Product from "./Product";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";


export default function ProductList() {
    const [products, setProducts] = useState([]);

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
                <Product name={product.Name} description={product.Description} price={product.Price} key={product._id}/>
            );
        });
    }
        return (

                <div className={'ProductContainer'}>

                    {productList()}
                </div>
        );
    }



/*  <div className={'ProductContainer'}>
                        {names.map(function(name, description){
                            return(<Product key="{description}" name={name}/>);
                        })}
*/
