import React, {useState} from "react";
import {Link} from "react-router-dom";
import '../ProductComponents/ProductList'
import Select from "react-select";



export default function TopNav(props) {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    return (

                <div className="TopNav">
                    {props.isLoggedIn === false && (
                    <div>
                    <input value={form.email} className={'navInput'}
                           onChange={(e) => updateForm({email: e.target.value})} type="email" name="email"
                           placeholder="email"/>
                    <input value={form.password} className={'navInput'}
                           onChange={(e) => updateForm({password: e.target.value})} type="password" name="password"
                           placeholder="password"/>
                    <button className={'navButton'} onClick={() => login(props = {props, form, setForm})}> login</button>
                    <button className={'navButton'} onClick={() => register(props = {props, form, setForm})}> register</button>
                    </div>
            )}
                    {props.account !== 'admin' && props.isLoggedIn !== false && (

                        <div>

                            <button className={'navButton'} onClick={() => logout(props = {props, form, setForm})}> logout</button>
                            <button className={'navButton'} onClick={() => myAccount(props) }> my account</button>
                        </div>
                    )}
                {props.account === "admin" && props.isLoggedIn !== false && (
                    <div>
                    <button className={'navButton'} onClick={() => logout(props = {props, form, setForm})}> logout</button>
                    <button className={'navButton'} onClick={() => adminControls(props)}> admin</button>
                    <button className={'navButton'} onClick={() => myAccount(props)}> my account</button>
                    </div>
    )}

                </div>
    )}





function logout(props){
    props.props.setAccount('');
    props.props.setLoggedIn(false);
    props.setForm({ email: "", password: ""});
}

function myAccount(props){
    if(props.openedItem!=="account") {
        props.setOpenedItem("account")
    }else{
        props.setOpenedItem('null')
    }
}

async function login(props){
    const form = { ...props.form };
    const res = await fetch("http://localhost:5000/users/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
        .catch(error => {
            window.alert("DAT SHIT AIN FUNSHIONIN MAYNEEE");
        });
    const user = await res.json();
    if(user.length === 0){
        console.log("Wrong credentials")
    } else {
        if(user[0].Admin === true){
            props.props.setAccount('admin')
        }
        console.log(user[0].Admin)
        props.props.setLoggedIn(user[0]._id)
        props.props.setAccComments(user[0].Comments)
        props.props.setPurchases(user[0].Purchases)
        console.log(user[0].Purchases)
        console.log(user[0].Comments)

    }
    props.setForm({ email: "", password: ""});
    }


async function register(props){
    if(props.form.password.length<8){
        window.alert("your password is too short. min. length is 8 characters");
        return;
    }
    const newPerson = { ...props.form };
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
    console.log(response.ok)
    await login(props);
    props.setForm({ email: "", password: ""});
}

function adminControls(props){
    if(props.openedItem!=="admin") {
        props.setOpenedItem("admin")
    }else{
        props.setOpenedItem('null')
    }
}
