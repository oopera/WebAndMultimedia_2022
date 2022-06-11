import '../App.css';
import React, {Component, useEffect, useState} from 'react'
import XButton from "../XButton";
import {addUser, deleteUser} from "../HelperFunctions/AccountFunctions";

export default function AdminControl(props) {
    const [users, setUsers] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('')
    const [searchInput, setSearchInput] = useState('');
    const [openWindow, setOpenWindow] = useState('none');
    const [userform, setUserform] = useState({

            email: "",
            username: "",
            password: "",
            password2: "",
            admin: false,

        }
    );

    const [productForm, setProductForm] = useState({

            name: "",
            description: "",
            price: "",
            availability: "",
            img: "",

        }
    );

    function checker(){
        setIsChecked(!isChecked);
        updateReform({admin: !isChecked})
    }
    const selectedUserChanged=(e)=>setSelectedUser(e.target.value)

    function updateProForm(value) {
        return setProductForm((prev) => {
            return {...prev, ...value};
        });
    }

    function updateReform(value) {
        return setUserform((prev) => {
            return {...prev, ...value};
        });
    }

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

    console.log(openWindow)

    return (
        <div className={'FocusWindow'}>
            <div className={'focusContent'}>

                {openWindow === 'help' && (
                    <XButton setOpenedItem={setOpenWindow}/>


                )
            }
                {openWindow === 'none' && (
                <div>
                    <div onClick={() => setOpenWindow('help')}>Click me to see the Admin Doc.</div>
            <XButton setOpenedItem={props.setOpenedItem}/>
            <label htmlFor="products">Choose a product:</label>
            <select>
                {props.products.map((product) => <option value={product.Name}>{product.Name}</option>)}
            </select>
            <div className={'adminButtonClmn'}>
                <button className={'adminButton'}> Delete
                    Product
                </button>
            </div>
            <div className={'inputsUser'}>
                <input  className={'userInput'}
                       onChange={(e) => updateProForm({name: e.target.value})}
                       placeholder="name"/>
                <input className={'userInput'}
                       onChange={(e) => updateProForm({description: e.target.value})}
                       placeholder="description"/>
                <input className={'userInput'}
                       onChange={(e) => updateProForm({price: e.target.value})}
                       placeholder="price"/>
                <input className={'userInput'}
                       onChange={(e) => updateProForm({availability: e.target.value})}
                       placeholder="Availability (write 'true' if it has infinite Availability (i.e. download))"/>
                <input className={'userInput'}
                       onChange={(e) => updateProForm({img: e.target.value})}
                       placeholder="link to image (optional)"/>
            </div>

            <div>
                <input onChange={(evt) => setSearchInput(evt.target.value)} style={{zIndex: '2'}}
                       placeholder={'search users...'}/>
                <select onChange={event => selectedUserChanged(event)}>
                    {users.map((user) => <option value={user._id}>{user.Email}</option>)}
                </select>
            </div>
            <button className={'adminButton'} onClick={() => deleteUser(selectedUser, users, setUsers)}> Delete User
            </button>

                    <div className={'inputsUser'}>
                        <input value={userform.email} className={'userInput'}
                               onChange={(e) => updateReform({email: e.target.value})} type="email" name="email"
                               placeholder="email"/>
                        <input value={userform.username} className={'userInput'}
                               onChange={(e) => updateReform({username: e.target.value})} type="username"
                               name="username"
                               placeholder="username"/>
                        <input value={userform.password} className={'userInput'}
                               onChange={(e) => updateReform({password: e.target.value})} type="password"
                               name="password"
                               placeholder="password"/>
                        <input value={userform.password2} className={'userInput'}
                               onChange={(e) => updateReform({password2: e.target.value})} type="password"
                               name="password"
                               placeholder="password"/>
                    </div>
                    <input type="checkbox" className={'userInput'} defaultChecked={isChecked}
                           onChange={()=>{checker()}}   name="admin"  id="adminCheck" placeholder="Admin"/>
                    <label htmlFor="adminCheck"> Admin </label>

                    <div className={'addUserButton'}>
                        <button className={'adminButton'}
                                onClick={() => addUser(props = {userform, setUserform, props, users, setUsers})}> Add User to Database
                        </button>
                        <p id={'CorrectionBox2'}> </p>

                    </div>
</div>
                ) }
                   </div>
                </div>



    )




    function deleteProduct(props) {

    }



}

