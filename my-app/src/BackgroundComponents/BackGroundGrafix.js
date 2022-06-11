import React, {useState} from "react";

export default function BackGroundGrafix(props){
    const [helpIsNeeded, setHelpIsNeeded] = useState(false)

    return(
        <div className={"frame"}>
            {helpIsNeeded === true && (
                <div className={'help'}> <div onClick={()=> setHelpIsNeeded(!helpIsNeeded)} className={"XButton"}> </div> So: You can do X X AND X here
                </div>
            )}

    <div style={{top: "96%", left:"5px",
        textOrientation: "mixed", fontSize: "150%", position: "absolute", backgroundColor: "white", border:"black solid 1pt", padding: "1pt"}} id="time">placeholder</div>
        </div>

    )
}
