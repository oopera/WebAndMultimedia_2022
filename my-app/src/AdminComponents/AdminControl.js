import '../App.css';
import {useEffect, useState} from "react";

export default function AdminControl(props) {

    function ProductOptions(props){
        return props.products.map((product) => {
            return(

            <option value={product.Name}>{product.Name}</option>

            )})
    }

    return(
        props.openedItem === 'admin' && (
            <div className={'adminControl'}>
                <div className={'focusContent'}>
                <p> Add user </p>
                <p> Add product </p>
                <p> delete product </p>

                <label htmlFor="products">Choose a product:</label>

                <select name="cars" id="cars">
                    <ProductOptions products={props.products}/>
                </select>
                </div>
            </div>
        )
    )

}
