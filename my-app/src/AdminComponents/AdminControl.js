import '../App.css';
import React, {useEffect, useState} from 'react'
import XButton from "../XButton";
import {addUser, deleteUser} from "../HelperFunctions/AccountFunctions";
import {addProduct, deleteProduct, updateProduct} from "../HelperFunctions/ProductFunctions";
import Canvas from "./Canvas";

export default function AdminControl(props) {
    const [users, setUsers] = useState([])
    const [purchases, setPurchases] = useState([])
    const [comments, setComments] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProduct, setSelectedProduct] = useState("newProduct")
    const [searchInput, setSearchInput] = useState('');
    const [openWindow, setOpenWindow] = useState('none');
    const [userform, setUserform] = useState({
            Email: "",
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

    }, [purchases.length]);

    useEffect(() => {
        async function getComments() {
            const response = await fetch(`http://localhost:5000/webweb/comments`);
            if (!response.ok) {
                const message = `Comments could not be loaded`;
                window.alert(message);
            }
            const comments = await response.json();
            setComments(comments);
        }
        getComments();
    }, [comments.length]);


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
                    <td className={'tableTing'}>Adding a Product</td>
                    </tr>
                    <tr>
                    <td className={'tableTing'}>Putting Items into baskets</td>
                    </tr>
                    <tr>
                    <td className={'tableTing'}>Purchasing the Basket</td>
                    </tr>
                    <tr>
                    <td className={'tableTing'}>Searching for Items</td>
                    </tr>
                    <tr>
                    <td className={'tableTing'}>Find your Comments and Purchases once you logged in under "Account"</td>
                    </tr>
                    <tr>
                    <td className={'tableTing'}>On Mobile View the Green Square functions as the Navigation</td>
                    </tr>
                    <tr>
                    <td className={'tableTingHeader'}>How do you use it? </td>
                    </tr>
                    <tr>
                    <td className={'tableTing'}>Click on an Item (The Text with Prices next to them on the left hand side) </td>
                    </tr>
                    <tr>
                    <td className={'tableTing'}>Check Availability and add to Basket (You wont be able to purchase if your basket contains more than Available, but you'll save a step by checking beforehand ;) </td>
                    </tr>
                    <tr>
                    <td className={'tableTing'}>In Basket you'll see the resulting final price and you'll be able to purchase. </td>
                    </tr>
                    <tr>
                    <td className={'tableTing'}>DISCLAIMER!!! Dont use serious credentials on here if you create an account - i don't want to have the responsibility attached to that. Also - once you log in you might want to clear the cache under "account" since Information will be stored to localstorage</td>
                    </tr>
                    </tbody>
                    </table>
                    </div>
                )
            }

                {openWindow === 'chart' && (
                    <div className={'wholeChart'}>
                        <XButton setOpenedItem={setOpenWindow}/>
                        <Canvas comments={comments} purchases={purchases} products={props.products} setOpenWindow={setOpenWindow}/>
                    </div>
                )}

                {openWindow === 'none' && (
                <div>
                    <div onClick={() => setOpenWindow('help')}>Click me to see the Admin Doc.</div>
                    <div className={'adminButtonClmn'}>
                        <button onClick={() => setOpenWindow('chart')} className={'adminButton'}> View Chart
                        </button>
                    </div>

            <XButton setOpenedItem={props.setOpenedItem}/>
            <label htmlFor="products">Choose a product:</label>
            <select onChange={event => selectedProductChanged(event)}>
                <option value={'newProduct'}> New Product</option>
                {props.products.map((product) => <option key={product._id} value={product._id}>{product.Name}</option>)}
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
                    <p id={'adminProdResponse'}> </p>
                    {selectedProduct === 'newProduct' && (
                        <button className={'adminButton'} onClick={() => addProduct(productForm, props.products, props.setProducts)}> Create New Product
                        </button>
                    )}
                    {selectedProduct !== 'newProduct' && (
                        <div>
                    <button className={'adminButton'} onClick={() => updateProduct(productForm, props.setProducts)}> Edit Product
                    </button>
                            <button className={'adminButton'} onClick={() => deleteProduct(selectedProduct, comments, setComments, props.products, props.setProducts)}> Delete Product
                            </button>
                        </div>
                        )}

            <div>
                <input onChange={(evt) => setSearchInput(evt.target.value)} style={{zIndex: '2'}}
                       placeholder={'search users...'}/>
                <select onChange={event => selectedUserChanged(event)}>
                    {users.filter(user => user.Email !== undefined && user.Email.toLowerCase().includes(searchInput.toLowerCase())).map(user => <option value={user._id} key={user._id}>{user.Email})</option>)}
                </select>
            </div>
            <button className={'adminButton'} onClick={() => deleteUser(selectedUser, users, setUsers)}> Delete User
            </button>

                    <div className={'inputsUser'}>
                        <input value={userform.Email} className={'userInput'}
                               onChange={(e) => updateReform({Email: e.target.value})} type="email" name="email"
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
