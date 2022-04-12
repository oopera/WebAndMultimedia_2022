import React, {useState} from "react";
import {Link} from "react-router-dom";
import '../ProductComponents/ProductList'


export default function TopNav(props) {
    return (
        <div className="TopNav">
            <TopNavForm/>
            <button className={'navButton'} onClick={() => login()}>  login</button>
            <button className={'navButton'} onClick={() => register()}>  <Link to="/register">register</Link></button>
        </div>
    );

}
function register(){

}
function TopNavForm() {
        const [form, setForm] = useState({
            email: "",
            password: "",
        });

    async function onSubmit(e) {
        e.preventDefault();

        const newPerson = { ...form };

        await fetch("http://localhost:5000/user/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ email: "", password: "" });
    }

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    return (
        <div className="TopNavForm">
            <input value={form.email}
                   onChange={(e) => updateForm({ email: e.target.value })} type="text" name="email" placeholder="email"/>
            <input value={form.password}
                   onChange={(e) => updateForm({ password: e.target.value })} type="password" name="password" placeholder="password"/>
        </div>
    );
}

function login(){
    const message = `Login not yet implemented`;
    window.alert(message);
}

function adminLogin(props){
    props.setOpenedItem('admin')
    const message = `Admin-panel not yet implemented`;
    window.alert(message);

}

