import React, {useState} from "react";

export default function BackGroundGrafix(props){

        let logoName = props.logoName
    let mainText = props.mainText
    return(
        <div>
            <a  href={"https://lucaslichner.de"}
                target={"_blank"}
                className={logoName}>lucaslichner.</a>
            <p className={mainText}>
                <span>buy.</span>
                <span>my.</span>
                <span style={{textDecoration: 'line-through'}}>shit</span>
                .
                <span style={{fontStyle: 'italic'}}>stuff</span>
                .
            </p>
        </div>
    )
}
