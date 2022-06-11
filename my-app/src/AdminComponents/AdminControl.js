import '../App.css';
import React, {Component, useEffect, useState} from 'react'
import XButton from "../XButton";
import {deleteUser} from "../HelperFunctions/AccountFunctions";

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

    function checker(){
        setIsChecked(!isChecked);
        updateReform({admin: !isChecked})
    }
    const selectedUserChanged=(e)=>setSelectedUser(e.target.value)


    function updateReform(value) {
        return setUserform((prev) => {
            return {...prev, ...value};
        });
    }
    console.log("userform: " + userform.admin);
    console.log("isChecked: " + isChecked);
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
            <XButton setOpenedItem={props.setOpenedItem}/>
            <div className={'adminButtonClmn'}>

                <button className={'adminButton'} onClick={() => setOpenWindow("deleteProduct")}> Delete
                    Product
                </button>

            </div>
            <label htmlFor="products">Choose a product:</label>
            <select>
                {props.products.map((product) => <option value={product.Name}>{product.Name}</option>)}
            </select>
            <div>
                <input onChange={(evt) => setSearchInput(evt.target.value)} style={{zIndex: '2'}}
                       placeholder={'search users...'}/>
            </div>
            <button className={'adminButton'} onClick={() => setOpenWindow("deleteUser")}> Delete User
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
                                onClick={() => addUser(props = {userform, setUserform, props})}> Add User to Database
                        </button>
                        <p id={'CorrectionBox2'}> </p>

                    </div>


                </div>



    )


    async function addUser(props) {
        if(props.userform.password.length<8){
            document.getElementById("CorrectionBox2").innerHTML = "Password must be >8 Chars";
            return;
        }
        if(props.userform.password !== props.reform.password2){
            document.getElementById("CorrectionBox2").innerHTML = "Passwords must match";
            return;
        }
        if(props.userform.username.length<3){
            document.getElementById("CorrectionBox2").innerHTML = "Username must be >3 Chars";
            return;
        }
        if(!props.userform.email.match(
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            document.getElementById("CorrectionBox").innerHTML = "Please enter a valid email adress";
            return;
        }
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
                window.alert("Could not add user to Database");
            });
        props.setUserform({email: '', username: '', password: '', password2: '', admin: false});
        setUsers(users => {
            return [...users, {newPerson}]
        })
    }


    function deleteProduct(props) {

    }



}

