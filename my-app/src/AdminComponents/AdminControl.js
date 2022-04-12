import '../App.css';
import {useEffect, useState} from "react";

export default function AdminControl(props) {

    return(
        props.openedItem === 'admin' && (
            <div className={'ProductFocus'}>
                <p> Add user </p>
                <p> Add product </p>
                <p> delete product </p>

                <label htmlFor="cars">Choose a product:</label>

                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
        )
    )




}