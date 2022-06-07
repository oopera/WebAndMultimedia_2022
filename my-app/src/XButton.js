import React from "react";


export default function XButton(props){
    return(
        <div onClick={()=> props.setOpenedItem('none')} className={'XButton'}> </div>
    )
}

