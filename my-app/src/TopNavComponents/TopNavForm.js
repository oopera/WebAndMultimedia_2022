import '../App.css';
import React from "react";


class TopNavForm extends React.Component {


    render() {
        return (
            <div className="TopNavForm">
                <input type="text" name="email" placeholder="email"/>
                <input type="text" name="password" placeholder="password"/>
            </div>
        );

    }

}
export default TopNavForm;


