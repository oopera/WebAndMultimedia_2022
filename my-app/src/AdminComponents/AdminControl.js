import '../App.css';
import React, {Component, useEffect, useState} from 'react'
import XButton from "../XButton";

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

    const selectedUserChanged=(e)=>setSelectedUser(e.target.value)
    console.log(userform.admin);

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



    return (
        <div className={'FocusWindow'}>
            {

                openWindow === "addUser" && (<div className={'userNav'}>
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
                    <input type="checkbox" className={'userInput'} checked={!isChecked}
                           onClick={()=>{setIsChecked(!isChecked); updateReform({admin: isChecked})}}   name="admin"  id="adminCheck" placeholder="Admin"/>
                    <label htmlFor="adminCheck"> Admin </label>

                    <div className={'addUserButton'}>
                        <button className={'adminButton'}
                                onClick={() => addUser(props = {userform, setUserform, props})}> Add User to Database
                        </button>

                    </div>


                    <XButton setOpenedItem={setOpenWindow}/>

                </div>)


            }

            {
                openWindow === "none" && (<div>
                    <XButton setOpenedItem={props.setOpenedItem}/>
                    <div className={'adminButtonClmn'}>
                        <button className={'adminButton'} onClick={() => setOpenWindow("addUser")}> Add User</button>
                        <button className={'adminButton'} onClick={() => setOpenWindow("deleteUser")}> Delete User
                        </button>
                        <button className={'adminButton'} onClick={() => setOpenWindow("deleteProduct")}> Delete
                            Product
                        </button>
                    </div>
                    <div>
                        <input onChange={(evt) => setSearchInput(evt.target.value)} style={{zIndex: '2'}}
                               placeholder={'search users...'}/>
                    </div>
                    <label htmlFor="products">Choose a product:</label>
                    <select>
                        {props.products.map((product) => <option value={product.Name}>{product.Name}</option>)}
                    </select>
                </div>)

            }

            {
                openWindow === "deleteUser" && (<div className={'userNav'}>
                    <select onChange={event => selectedUserChanged(event)}>
                        {users.map((user) => <option value={user._id}>{user.Email}</option>)}

                    </select>
                    <div className={'deleteUserButton'}>
                        <button className={'adminButton'} onClick={() => deleteUser(selectedUser, users, setUsers)}> Delete User from Database
                        </button>
                    </div>
                    <XButton setOpenedItem={setOpenWindow}/>
                </div>)
            }
            {
                openWindow === "deleteProduct" && (<div className={'userNav'}>
                    <select>
                        {props.products.map((product) => <option value={product.Name}>{product.Name}</option>)}
                    </select>
                    <div className={'deleteProductButton'}>
                        <button className={'adminButton'} onClick={() => deleteUser(props)}> Delete selected Item
                        </button>
                    </div>
                    <XButton setOpenedItem={setOpenWindow}/>
                </div>)
            }

        </div>


    )


    async function addUser(props) {

        const newPerson = {...props.userform};
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

        props.setUserform({email: '', username: '', password: '', password2: '', admin: ''});


    }

    async function deleteUser(id, users, setUsers) {
        await fetch(`http://localhost:5000/delUser/${id}`, {
        method: "DELETE"
    });

    const newUsers = users.filter((el) => el._id !== id);
    setUsers(newUsers);
}

    function deleteProduct(props) {

    }



}

