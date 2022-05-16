import React, {useState} from "react";
import {Link} from "react-router-dom";
import '../ProductComponents/ProductList'



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
       // {props.account === "admin" && (
                <div className="TopNav">
                    {props.account !== 'admin' && (
                    <div>
                    <input value={form.email} className={'navInput'}
                           onChange={(e) => updateForm({email: e.target.value})} type="email" name="email"
                           placeholder="email"/>
                    <input value={form.password} className={'navInput'}
                           onChange={(e) => updateForm({password: e.target.value})} type="password" name="password"
                           placeholder="password"/>
                    <button className={'navButton'} onClick={() => login(props = {form, setForm})}> login</button>
                    <button className={'navButton'} onClick={() => register(props = {form, setForm})}> register</button>
                    </div>
            )}
                {props.account === "admin" && (
                    <div>
                    <input value={form.email} className={'navInput'} onChange={(e) => updateForm({email: e.target.value})} type="email" name="email"
                           placeholder="email"/>
                    <input value={form.password} className={'navInput'} onChange={(e) => updateForm({password: e.target.value})} type="password" name="password"
                    placeholder="password"/>
                    <button className={'navButton'} onClick={() => login(props = {form, setForm})}> login</button>
                    <button className={'navButton'} onClick={() => register(props = {form, setForm})}> register</button>
                    <button className={'navButton'} onClick={() => adminControls(props)}> admin</button>
                    </div>
    )}

                </div>
    )}
          //  )})}


async function login(props){
    const form = { ...props.form };
    const response = await fetch("http://localhost:5000/users/login", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
        .catch(error => {
            window.alert("DAT SHIT AIN FUNSHIONIN MAYNEEE");
        });
    console.log(response)
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
    props.setForm({ email: "", password: ""});
}

function adminControls(props){
    if(props.openedItem!=="admin") {
        props.setOpenedItem("admin")
    }else{
        props.setOpenedItem('null')
    }
}
