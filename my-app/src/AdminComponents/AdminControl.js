import '../App.css';
import React, {useEffect, useState} from "react";
import {Product} from "../ProductComponents/Product";

export default function AdminControl() {
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

                    <Product name={product.Name} description={product.Description} price={product.Price} key={product._id}/>
                </div>

            )});
    }
    return (

        <div className={'ProductContainer'}>
            <input/>
            {productList()}
        </div>
    );
}

