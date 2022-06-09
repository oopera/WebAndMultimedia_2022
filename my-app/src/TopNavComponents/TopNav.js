import React, {useState} from "react";
import {Link} from "react-router-dom";
import '../ProductComponents/ProductList'
import Select from "react-select";
import clear from '../App.js'
import {ReactSession} from "react-client-session";
export default function TopNav(props) {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [reform, setReform] = useState({
        email: "",
        username: "",
        password: "",
        password2: "",
    });

    const [wantsToRegistre, setWantsToRegistre] = useState(false);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    function updateReform(value) {
        return setReform((prev) => {
            return { ...prev, ...value };
        });
    }

    return (
                <div className="TopNav">
                    {props.isLoggedIn === false && wantsToRegistre === false &&(
                    <div className={'desktopNav'}>
                        <div className={'inputs'}>
                    <input value={form.email} className={'navInput'}
                           onChange={(e) => updateForm({email: e.target.value})} type="email" name="email"
                           placeholder="email"/>
                    <input value={form.password} className={'navInput'}
                           onChange={(e) => updateForm({password: e.target.value})} type="password" name="password"
                           placeholder="password"/>
                        </div>
                        <div className={'buttonRow'}>
                    <button className={'navButton'} onClick={() => login(props = {props, form, setForm})}> login</button>
                    <button className={'navButton'} onClick={() => wantsToRegistreFunc(props = {setWantsToRegistre, wantsToRegistre})}> register</button>
                            {props.basket.length === 0 && (
                                <button className={'navButton'} onClick={() => basket(props) }> basket</button>
                            )}
                            {(props.basket.length !== 0 &&(
                                <button className={'navButton'} onClick={() => basket(props) }> {props.basket.length}</button>
                            ))}
                        </div>
                    </div>
                    )}
                    {props.isLoggedIn === false && wantsToRegistre === true && (
                        <div className={'desktopNav'}>
                            <div className={'inputs'}>
                        <input value={reform.email} className={'navInput'}
                               onChange={(e) => updateReform({email: e.target.value})} type="email" name="email"
                               placeholder="email"/>
                        <input value={reform.username} className={'navInput'}
                                   onChange={(e) => updateReform({username: e.target.value})} type="text" name="password"
                                   placeholder="Username"/>
                        <input value={reform.password} className={'navInput'}
                        onChange={(e) => updateReform({password: e.target.value})} type="password" name="password"
                        placeholder="password"/>
                        <input value={reform.password2} className={'navInput'}
                        onChange={(e) => updateReform({password2: e.target.value})} type="password" name="password"
                        placeholder="repeat password"/>
                            </div>
                            <div className={'buttonRow'}>
                        <button className={'navButton'} onClick={() => register(props = {form, setForm, props, reform, setReform, setWantsToRegistre, wantsToRegistre})}> register</button>
                        <button className={'navButton'} onClick={() => wantsToRegistreFunc(props = {setWantsToRegistre, wantsToRegistre})}> close</button>
                                {props.basket.length === 0 && (
                                    <button className={'navButton'} onClick={() => basket(props) }> basket</button>
                                )}
                                {(props.basket.length !== 0 &&(
                                    <button className={'navButton'} onClick={() => basket(props) }> {props.basket.length}</button>
                                ))}
                            </div>
                        </div>
                        )}
                    {props.account !== 'admin' && props.isLoggedIn !== false && wantsToRegistre === false && (
                        <div className={'desktopNav'}>
                        <div className={'buttonRow'}>
                            <button className={'navButton'} onClick={() => logout(props = {props, form, setForm})}> logout</button>
                            <button className={'navButton'} onClick={() => myAccount(props) }>account</button>
                            {props.basket.length === 0 && (
                                <button className={'navButton'} onClick={() => basket(props) }> basket</button>
                            )}
                            {(props.basket.length !== 0 &&(
                                <button className={'navButton'} onClick={() => basket(props) }> {props.basket.length}</button>
                            ))}
                        </div>
                        </div>
                    )}
                {props.account === "admin" && props.isLoggedIn !== false && (
                    <div className={'desktopNav'}>
                    <div className={'buttonRow'}>
                    <button className={'navButton'} onClick={() => logout(props = {props, form, setForm})}> logout</button>
                    <button className={'navButton'} onClick={() => adminControls(props)}> admin</button>
                    <button className={'navButton'} onClick={() => myAccount(props)}>account</button>
                        {props.basket.length === 0 && (
                            <button className={'navButton'} onClick={() => basket(props) }> basket</button>
                        )}
                        {(props.basket.length !== 0 &&(
                            <button className={'navButton'} onClick={() => basket(props) }> {props.basket.length}</button>
                        ))}
                    </div>
                    </div>
                    )}
                    <p id={"CorrectionBox"}> </p>

                </div>
    )}

function logout(props){
    props.props.setAccount('');
    props.props.setLoggedIn(false);
    props.setForm({ email: "", password: ""});
    ReactSession.set("wholeAcc", "");
    ReactSession.set("admin", "");
    ReactSession.set("Purchases", "");
    ReactSession.set("Comments", "");
    ReactSession.set("hasData", false);
    if(props.props.openedItem === 'account' || props.props.openedItem === 'admin') {
        props.props.setOpenedItem("null")
    }
}

function basket(props){
    if(props.openedItem!=="basket") {
        props.setOpenedItem("basket")
    }else{
        props.setOpenedItem('null')
    }
}
function myAccount(props){
    if(props.openedItem!=="account") {
        props.setOpenedItem("account")
    }else{
        props.setOpenedItem('null')
    }
}

function wantsToRegistreFunc(props){
    props.setWantsToRegistre(!props.wantsToRegistre)
    document.getElementById("CorrectionBox").innerHTML = "";
}

async function login(props){
    document.getElementById("CorrectionBox").innerHTML = "";
    console.log(props.form)
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
        document.getElementById("CorrectionBox").innerHTML = "Wrong credentials";
    } else {
        if(user[0].Admin === true){
            props.props.setAccount('admin')
        }
        props.props.setLoggedIn(user[0])
        props.props.setAccComments(user[0].Comments)
        props.props.setPurchases(user[0].Purchases)
        props.props.setReload(!props.props.reload)


    }
    //props.setForm({ email: "", password: ""});
    }


async function register(props){
    if(props.reform.password.length<8){
        document.getElementById("CorrectionBox").innerHTML = "Password needs to be atleast 8 Characters";
        return;
    }
    if(props.reform.password !== props.reform.password2){
        document.getElementById("CorrectionBox").innerHTML = "Password needs to be atleast 8 Characters";
        return;
    }
    if(!props.reform.email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        window.alert("Please enter a valid email adress");
        return;
    }
    wantsToRegistreFunc(props)
    const newPerson = { ...props.reform };
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
    props.setForm({email: props.reform.email, password: props.reform.password});
    if(response.ok) {
        await login(props);
    }
}

function adminControls(props){
    if(props.openedItem!=="admin") {
        props.setOpenedItem("admin")
    }else{
        props.setOpenedItem('null')
    }
}
