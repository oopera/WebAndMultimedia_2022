import '../App.css';
import React, {Component, useEffect, useState} from 'react'
import Select from 'react-select'

export default function AdminControl(props) {
    const [users, setUsers] = useState([])
    const [selectedProduct, setSelectedProduct] = useState('')
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`http://localhost:5000/webweb/users`);
            if (!response.ok) {
                const message = `Products could not be loaded`;
                window.alert(message);
                return;
            }
            const userDB = await response.json();
            setUsers(userDB);
        }
        getUsers();
        return;
    }, [users.length]);

    function ProductOptions(props){
        return props.products.map((product) => {
            return(

            <option value={product.Name}>{product.Name}</option>

            )})
    }
    console.log(props.products)

    return(
            <div className={'FocusWindow'}>
                <div className={'focusContent'}>
                <p> Add user </p>
                <p> Add product </p>
                <p> delete product </p>
                    <div>
                    <input onChange={(evt) => setSearchInput(evt.target.value)} style={{zIndex: '2'}}placeholder={'search users...'}/>
                    </div>
                    <label htmlFor="products">Choose a product:</label>
                    <select>
                    {props.products.map((product) => <option value={product.Name}>{product.Name}</option>)}
                    </select>
                </div>
            </div>

    )

}

