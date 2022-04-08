import React from "react";
import TopNavForm from "./TopNavForm"
import {Link} from "react-router-dom";


class TopNav extends React.Component {


    render() {
        return (
            <div className="TopNav">

                <TopNavForm/>
                <button className={'navButton'}>  login</button>
                <button className={'navButton'}>  <Link to="/about">admin</Link></button>
            </div>
        );


    }
}
export default TopNav;
