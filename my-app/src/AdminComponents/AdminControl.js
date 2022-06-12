import '../App.css';
import React, {Component, useEffect, useState} from 'react'
import XButton from "../XButton";
import {addUser, deleteUser} from "../HelperFunctions/AccountFunctions";
import {addProduct, deleteProduct, updateProduct} from "../HelperFunctions/ProductFunctions";

export default function AdminControl(props) {
    const [users, setUsers] = useState([])
    const [purchases, setPurchases] = useState([])
    const [comments, setComments] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProduct, setSelectedProduct] = useState([])
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
            id: "",
            Name: "",
            Description: "",
            Price: "",
            Availability: "",
            img: "",
        }
    );

    function checker(){
        setIsChecked(!isChecked);
        updateReform({admin: !isChecked})
    }
    console.log(productForm)
    const selectedUserChanged=(e)=>setSelectedUser(e.target.value)
    const selectedProductChanged=(e)=>{
        setSelectedProduct(e.target.value)
        let id = e.target.value
        let img

        if(e.target.value !== 'newProduct') {
            if(props.products.filter(e => e._id.includes(id))[0].img === undefined){
                img = ""
            }else{
                img = props.products.filter(e => e._id.includes(id))[0].img
            }
            setProductForm({
                    id: e.target.value,
                    Name: props.products.filter(e => e._id.includes(id))[0].Name,
                    Description: props.products.filter(e => e._id.includes(id))[0].Description,
                    Price: props.products.filter(e => e._id.includes(id))[0].Price,
                    Availability: props.products.filter(e => e._id.includes(id))[0].Availability,
                    img: img,
                }
            )
        }else{
            setProductForm({
                    id: "",
                    Name: "",
                    Description: "",
                    Price: "",
                    Availability: "",
                    img: "",
                }
            )
        }
    }

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
                const message = `Users could not be loaded`;
                window.alert(message);
                return;
            }
            const userDB = await response.json();
            setUsers(userDB);
        }

        getUsers();
        return;
    }, [users.length]);

    useEffect(() => {
        async function getPurchases() {
            const response = await fetch(`http://localhost:5000/webweb/purchases`);
            if (!response.ok) {
                const message = `Purchases could not be loaded`;
                window.alert(message);
                return;
            }
            const purchaseDB = await response.json();
            setPurchases(purchaseDB);
        }

        getPurchases();
        return;
    }, [purchases.length]);
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
                    <div className={'adminButtonClmn'}>
                        <button className={'adminButton'}> View Chart
                        </button>
                    </div>
            <XButton setOpenedItem={props.setOpenedItem}/>
            <label htmlFor="products">Choose a product:</label>
            <select onChange={event => selectedProductChanged(event)}>
                <option value={'newProduct'}> New Product</option>
                {props.products.map((product) => <option value={product._id}>{product.Name}</option>)}
            </select>

            <div className={'inputsUser'}>
                <input  className={'userInput'}
                        value={productForm.Name}
                       onChange={(e) => updateProForm({Name: e.target.value})}
                       placeholder="name"/>
                <input className={'userInput'}
                       value={productForm.Description}
                       onChange={(e) => updateProForm({Description: e.target.value})}
                       placeholder="description"/>
                <input className={'userInput'}
                       value={productForm.Price}
                       onChange={(e) => updateProForm({Price: e.target.value})}
                       placeholder="price"/>
                <input className={'userInput'}
                       value={productForm.Availability}
                       onChange={(e) => updateProForm({Availability: e.target.value})}
                       placeholder="Availability (write 'true' if it has infinite Availability (i.e. download))"/>
                <input className={'userInput'}
                       value={productForm.img}
                       onChange={(e) => updateProForm({img: e.target.value})}
                       placeholder="link to image (optional)"/>
            </div>
                    {selectedProduct === 'newProduct' && (
                        <button className={'adminButton'} onClick={() => addProduct(productForm, props.products, props.setProducts)}> Create New Product
                        </button>
                    )}
                    {selectedProduct !== 'newProduct' && (
                        <div>
                    <button className={'adminButton'} onClick={() => updateProduct(productForm)}> Edit Product
                    </button>
                            <button className={'adminButton'} onClick={() => deleteProduct(selectedProduct, comments, setComments, props.products, props.setProducts)}> Delete Product
                            </button>
                        </div>
                        )}

            <div>
                <input onChange={(evt) => setSearchInput(evt.target.value)} style={{zIndex: '2'}}
                       placeholder={'search users...'}/>
                <select onChange={event => selectedUserChanged(event)}>
                    {users.filter(user => user.Email.includes(searchInput)).map(user => <option value={user._id}>{user.Email})</option>)}
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
}

