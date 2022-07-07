import '../App.css';
import React, {useEffect, useState} from 'react'
import XButton from "../XButton";
import {addUser, deleteUser} from "../HelperFunctions/AccountFunctions";
import {addProduct, deleteProduct, updateProduct} from "../HelperFunctions/ProductFunctions";
import Canvas from "./Canvas";

export default function AdminControl(props) {
    const [users, setUsers] = useState([])
    const [purchases, setPurchases] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [selectedUser, setSelectedUser] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("newProduct")
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

    // Changes state for Admin Checkbox in AddUser
    function checker(){
        setIsChecked(!isChecked);
        updateReform({admin: !isChecked})
    }
    // Updates selectedUser to userID
    const selectedUserChanged=(e)=>setSelectedUser(e.target.value)
    // Updates selectedProduct to productID, sets ProductForm to information of Product with that ID
    //if selectedProduct is newProduct, setForm to ""
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

    //These update the forms
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
    // Fetch all userdata
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`/webweb/users`);
            if (!response.ok) {
                const message = `Users could not be loaded`;
                window.alert(message);
                return;
            }
            const userDB = await response.json();
            setUsers(userDB.filter(e => e._id!==props.isLoggedIn));
            if(userDB.filter(e => e._id!==props.isLoggedIn).length !== 0) {
                setSelectedUser(userDB.filter(e => e._id !== props.isLoggedIn)[0]._id)
            }else{
                setSelectedUser('')
            }
        }
        getUsers();
    }, [users.length]);

    // Fetch all purchase Data
    useEffect(() => {
        async function getPurchases() {
            const response = await fetch(`/webweb/purchases`);
            if (!response.ok) {
                const message = `Purchases could not be loaded`;
                window.alert(message);
                return;
            }
            const purchaseDB = await response.json();
            setPurchases(purchaseDB);
        }
        getPurchases();
    }, [purchases.length]);

    // Lots of inputs, buttons and data Mapping. Should be self explanatory, functions can be found in HelperFunctions
    return (
        <div className={'FocusWindow'}>
            <div className={'focusContent'}>
                {openWindow === 'help' && (
                    <div>
                    <XButton setOpenedItem={setOpenWindow}/>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={'tableTingHeader'}>Functions:</td>
                                </tr>
                                <tr>
                                    <td className={'tableTing'}>Under "View Chart" you can view a visual representation of the systems activity of sales, comments and availability</td>
                                </tr>
                                <tr>
                                    <td className={'tableTing'}>You can choose an existing Product and Change its values, and update it via "Edit Product", there, you can also delete it under "Delete Product" By deleting that Product, all comments linked to that product will be deleted.</td>
                                </tr>
                                <tr>
                                    <td className={'tableTing'}>Creating a New Product is done by selecting "New Product" and entering values. Invalid inputs will be announced. In general: enter a name, enter a description, enter a positive price. Availability is explained in the placeholder.</td>
                                </tr>
                                <tr>
                                    <td className={'tableTing'}>You can also search users by Email adress. From there, you can delete that User. With deletion of the User, all comments of theirs will also be deleted. </td>
                                </tr>
                                <tr>
                                    <td className={'tableTing'}>In order to create a new User, simply fill out the Form beneath the "Delete User" Button. Same restrictions as with registring normally apply i.e. an actual email must be supplied, username must be unique, and the passwords must match. </td>
                                </tr>
                                <tr>
                                    <td className={'tableTing'}>You can also flag the created account for Admin, but be careful, as that is only reversible by accessing the Database. </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                )
            }

                {openWindow === 'chart' && (
                    <div className={'wholeChart'}>
                        <XButton setOpenedItem={setOpenWindow}/>
                        <Canvas comments={props.comments} purchases={purchases} products={props.products} setOpenWindow={setOpenWindow}/>
                    </div>
                )}

                {openWindow === 'none' && (
                <div>
                    <button onClick={() => setOpenWindow('help')}>Click me to see the Admin Doc.</button>
                        <div className={'adminButtonClmn'}>
                            <button onClick={() => setOpenWindow('chart')} className={'adminButton'}> View Chart
                            </button>
                        </div>

                    <XButton setOpenedItem={props.setOpenedItem}/>
                    <div className={'chosey'}>Choose a product:
                        <select onChange={event => selectedProductChanged(event)}>
                            <option value={'newProduct'}> New Product</option>
                            {props.products.map((product) => <option key={product._id} value={product._id}>{product.Name}</option>)}
                        </select>
                    </div>

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
                               type="number"
                               min="0"
                               onChange={(e) => updateProForm({Price: e.target.value})}
                               placeholder="price"/>
                        <input className={'userInput'}
                               type="number"
                               value={productForm.Availability}
                               onChange={(e) => updateProForm({Availability: e.target.value})}
                               placeholder="Availability (enter a negative number if it has infinite Availability (i.e. Download))"/>
                        <input className={'userInput'}
                               value={productForm.img}
                               onChange={(e) => updateProForm({img: e.target.value})}
                               placeholder="link to image (optional)"/>
                    </div>
                    <p id={'adminProdResponse'}> </p>
                        {selectedProduct === 'newProduct' && (
                            <button className={'adminButton'} onClick={() => addProduct(productForm, props.products, props.setProducts)}> Create New Product
                            </button>
                        )}
                        {selectedProduct !== 'newProduct' && (
                            <div>
                                <button className={'adminButton'} onClick={() => updateProduct(productForm, props.setProducts)}> Edit Product
                                </button>
                                <button className={'adminButton'} onClick={() => deleteProduct(selectedProduct, props.comments, props.setComments, props.products, props.setProducts)}> Delete Product
                                </button>
                            </div>
                        )}

                    <div>
                        <input onChange={(evt) => setSearchInput(evt.target.value)}
                               placeholder={'search users...'}/>
                        <select onChange={event => selectedUserChanged(event)}>
                            {users.filter(user => user.Email !== undefined && user.Email.toLowerCase() !== props.isLoggedIn.Email.toLowerCase() && user.Email.toLowerCase().includes(searchInput.toLowerCase())).map(user => <option value={user._id} key={user._id}>{user.Email}</option>)}
                        </select>
                    </div>
                    <div className={'rowDiv'}>
                    <button className={'adminButton'} onClick={() => deleteUser(selectedUser, users, setUsers, props.setComments)}> Delete User
                    </button>
                        <p id={'deleteUsertext'}></p>
                    </div>
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
                            <p id={'CorrectionBox2'}> </p>
                            <button className={'adminButton'}
                                    onClick={() => addUser(props = {userform, setUserform, props, users, setUsers})}> Add User to Database
                            </button>

                        </div>
                </div>
                )}
           </div>
        </div>
    )
}
