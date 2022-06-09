import React, {useState} from "react";


export default function BackGroundGrafix(props){
    const [helpIsNeeded, setHelpIsNeeded] = useState(false)
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
     setInterval(theTime);

    return(
        <div className={"frame"}>
            {helpIsNeeded === true && (
                <div className={'help'}> <div onClick={()=> setHelpIsNeeded(!helpIsNeeded)} className={"XButton"}> </div> So: You can do X X AND X here
                </div>
            )}
    <a  href={"https://lucaslichner.de"} target={"_blank"} className={'logo'}> <p> lucaslichner. </p></a>

    <p className={'maintext'}><span>buy.</span><span>my.</span><span style={{textDecoration: 'line-through'}}>shit</span>.<span style={{fontStyle: 'italic'}}>stuff</span>.</p>
            <div className={"partingline"}> </div>
            <div className={"breakingNewsCont"}> <div className={"breakingNews"} >Thank you for visiting! If youre in need of help or explanation: <div onClick={() => {setHelpIsNeeded(!helpIsNeeded)}}>  click here </div> </div> </div>
            <div className={"sideBox"}>Welcome to my brutalist nightmare. Enjoy your time. Or dont. I dont care, I'm a div.
            need help?

                <table>

                <tr>
                    <td className={'tableTingHeader'}>Functions:</td>
                </tr>
                <tr>
                    <td className={'tableTing'}>Logging in & registring</td>
                </tr>
                    <tr>
                        <td className={'tableTing'}>Putting Items into baskets</td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>Purchasing the Basket</td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>Searching for Items</td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>Find your Comments and Purchases once you logged in under "Account"</td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>On Mobile View the Green Square functions as the Navigation</td>
                    </tr>
                    <tr>
                        <td className={'tableTingHeader'}>How do you use it? </td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>Click on an Item (The Text with Prices next to them on the left hand side) </td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>Check Availability and add to Basket (You wont be able to purchase if your basket contains more than Available, but youll save a step by checking beforehand ;) </td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>In Basket youll see the resulting final price and youll be able to purchase. </td>
                    </tr>
                    <tr>
                        <td className={'tableTing'}>DISCLAIMER!!! Dont use serious credentials on here if you create an account - i don't want to have the responsibility attached to that. Also - once you log in you might want to clear the cache under "account" since Information will be stored to localstorage</td>
                    </tr>


            </table>
            </div>

    <div style={{top: "96%", left:"5px",
        textOrientation: "mixed", fontSize: "150%", position: "absolute", backgroundColor: "white", border:"black solid 1pt", padding: "1pt"}} id="time">placeholder</div>

        </div>

    )
}
