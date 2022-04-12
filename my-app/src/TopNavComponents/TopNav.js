import React from "react";
import TopNavForm from "./TopNavForm"
import {Link} from "react-router-dom";
import '../ProductComponents/ProductList'

export default function TopNav() {


        return (
            <div className="TopNav">

                <TopNavForm/>
                <button className={'navButton'} onClick={() => login()}>  login</button>
                <button className={'navButton'} onClick={() => adminLogin()}>  <Link to="/admin">admin</Link></button>
            </div>
        );



}
function login(){
    const message = `Login not yet implemented`;
    window.alert(message);
}

function adminLogin(){
    const message = `Admin-panel not yet implemented`;
    window.alert(message);

}
