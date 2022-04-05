import React from "react";
import TopNavForm from "./TopNavForm"


class TopNav extends React.Component {


    render() {
        return (
            <div className="TopNav">

                <TopNavForm/>
                <button className={'navButton'}> login</button>

            </div>
        );


    }
}
export default TopNav;
