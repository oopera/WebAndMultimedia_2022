import '../App.css';
import {useEffect, useState} from "react";
import React, { Component } from 'react'
import Select from 'react-select'

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

                    <Select options={props.products.name} />
                </div>
            </div>
        )
    )

}
