import React, {useState} from "react";

import '../ProductComponents/ProductList'
import {login, wantsToRegistreFunc, register, logout} from "../HelperFunctions/AccountFunctions";
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
        admin: false
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

function adminControls(props){
    if(props.openedItem!=="admin") {
        props.setOpenedItem("admin")
    }else{
        props.setOpenedItem('null')
    }
}
