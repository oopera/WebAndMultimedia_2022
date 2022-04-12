import React from "react";
import {Link} from "react-router-dom";
import '../ProductComponents/ProductList'

export default function TopNav(props) {
        return (
            <div className="TopNav">
                <TopNavForm/>
                <button className={'navButton'} onClick={() => login()}>  login</button>
                <button className={'navButton'} onClick={() => adminLogin(props)}>  <Link to="/admin">admin</Link></button>
            </div>
        );

}

function TopNavForm() {
    return (
        <div className="TopNavForm">
            <input type="text" name="email" placeholder="email"/>
            <input type="password" name="password" placeholder="password"/>
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
