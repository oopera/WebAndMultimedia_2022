import React from "react";


export default function BackGroundGrafix(props){

    function theTime() {
        let Datte = new Date();
        let H = Datte.getHours();
        let m = Datte.getMinutes();
        let s = Datte.getSeconds();
        if (H < 10 ){
            H = "0" + H;
        }
        if (m < 10 ){
            m = "0" + m;
        }
        if (s < 10 ){
            s = "0" + s;
        }
        document.getElementById("time").textContent = `${H} : ${m} : ${s}`
    }
    //  setInterval(theTime);

    return(
        <div>
    <p className={'logo'}>lucaslichner.</p>
    <p className={'maintext'}>buy.my.shit.</p>
    <div style={{top: "95%", writingMode: "vertical-rl",
        textOrientation: "mixed", fontSize: "150%", position: "absolute"}} id="time">placeholder</div>
        </div>
    )
}
