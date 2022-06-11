import '../App.css';
import React, {useEffect, useState} from 'react'
import XButton from "../XButton";

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
    }, [users.length]);

    return(
            <div className={'FocusWindow'}>
                <XButton setOpenedItem={props.setOpenedItem}/>
                <div className={'focusContent'}>
                <p> Add user </p>
                <p> Add product </p>
                <p> delete product </p>
                    <div>
                    <input onChange={(evt) => setSearchInput(evt.target.value)} style={{zIndex: '2'}} placeholder={'search users...'}/>
                    </div>
                    <label htmlFor="products">Choose a product:</label>
                    <select>
                    {props.products.map((product) => <option value={product.Name}>{product.Name}</option>)}
                    </select>
                </div>
            </div>

    )

}

async function addUser(props){

    const newPerson = { ...props.userform };
    console.log(newPerson);
    const response = await fetch("http://localhost:5000/users/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
    })
        .catch(error => {
            window.alert("DAT SHIT AIN FUNSHIONIN MAYNEEE");
        });

    props.setUserform({email: '', username: '', password: '', password2: ''});


}
