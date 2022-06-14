import React, {useEffect} from "react";

export default function Canvas(props){
    let height = (props.products.length*75) + 100;
    let width;
    if(props.comments>=props.purchases){
        width = props.comments.length*20+100
    }else{
        width = props.purchases.length*20+100
    }

    let counter = 10;
    function updateCounter(amountToUpdate){
        counter = counter+amountToUpdate
    }
    useEffect(() => {
            const canvas = document.getElementById('ActivityChart');
            let ctx = canvas.getContext('2d');
            ctx.font = "14px Arial";
            ctx.fillStyle = "black"
            ctx.lineWidth = 10
            ctx.fillText("All Sales:", 0, counter);
            ctx.fillStyle = "pink"
            updateCounter(10)
            ctx.fillRect(0, counter, props.purchases.length*20, 4);
            updateCounter(10)
            ctx.fillStyle = "black"
            ctx.fillRect(0, counter, width, 1);
            updateCounter(20)
            ctx.fillText("All Comments:", 0, counter);
            ctx.fillRect(0, counter, width, 1);
            ctx.fillStyle = "red"
            updateCounter(10)
            ctx.fillRect(0, counter, props.comments.length*20, 4);
            props.products.forEach(render)
        function render(product) {
            ctx.fillStyle = "black"
            updateCounter(10)
            ctx.fillRect(0, counter, width, 1);
            updateCounter(10)
            updateCounter(10)
            ctx.fillText(product.Name, 0, counter);
            ctx.fillStyle = "blue"
            updateCounter(25)
            if(product.Availability === true){
                ctx.fillText('infinite Availability', 0, counter);
            }else{
                ctx.fillRect(0, counter, product.Availability*20, 4);
            }
            ctx.fillStyle = "pink"
            updateCounter(10)
            ctx.fillRect(0, counter, props.purchases.filter(e => e.products.includes(product.Name)).length*20, 4);
            ctx.fillStyle = "red"
            updateCounter(10)
            ctx.fillRect(0, counter, props.comments.filter(e=> e.productID.includes(product._id)).length*20, 4);

        }
        ctx.fillStyle = "black"
        renderNumbers()
        function renderNumbers() {
            for(let counter2 = 0; counter2 <= width; counter2++){
                let stringy = counter2.toString()
                ctx.fillText(stringy, counter2*20, counter+20);
            }
        }
    },[]);

    return(
        <div>
            <p> PINK INDICATES SALES, RED INDICATES COMMENTS, BLUE INDICATES AVAILABILITY </p>
            IF THE CHART CUTS OFF ON THE SIDE, USE SHIFT SCROLL TO SCROLL SIDEWAYS
            <canvas width={width} height={height} id={'ActivityChart'}> </canvas>
        </div>
    )
}
