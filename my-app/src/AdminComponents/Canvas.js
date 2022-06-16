import React, {useEffect} from "react";

// Renders Canvas in AdminControl
// Sets height and Width dynamically, so that the Canvas does not overflow with higher activity.
// updateCounter is used so that the Distance between bars and Items stays consistant, and so that it is known at which position the Next item should be drawn.
// First batch of useEffect renders the Header Information with all sales and Comments.
// render() function renders information of specific product. renderNumbers() renders the guideNumbers at the bottom of the graph
export default function Canvas(props){

    let height = (props.products.length*75) + 100;
    let width=800;

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
                if((product.Availability*20+100)>width){
                    width=product.Availability*50+100
                    console.log(width)
                }
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
