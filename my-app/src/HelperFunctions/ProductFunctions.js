import {updateUser} from "./AccountFunctions";

export async function purchase(props, basketPrice){
    let availabilityFlag = true
    let products = []
    document.getElementById("infobox").innerHTML = "";
    props.basket.forEach(checkAvailability)

    function checkAvailability(basketItem){
        console.log(basketItem)
        products.push(basketItem.Name)
        if(props.basket.filter((v) => (v === basketItem)).length > basketItem.Availability && basketItem.Availability !== true){
            availabilityFlag = false
        }
    }

    if(availabilityFlag === false){
        document.getElementById("infobox").innerHTML = "ONE OF YOUR ITEMS IS NOT AVAILABLE IN THE QUANTITIES YOU SELECTED, PLEASE RECHECK";
        return;
    }

    props.setBasket([])
    props.basket.forEach(updateProduct)
    async function updateProduct(basketItem){
        if(basketItem.Availability === true) return
        basketItem.Availability = basketItem.Availability-1
        const updatedProduct = {
            Name: basketItem.Name,
            Description: basketItem.Description,
            Price: basketItem.Price,
            Availability: basketItem.Availability-1
        };

        const response = await fetch(`http://localhost:5000/updateProduct/${basketItem._id.toString()}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        })
            .catch(error => {
                window.alert("Updating the Product did not work, please notify an Administrator.");
                console.log(error, response)
            });
    }

    let email;
    let date = new Date().toISOString().slice(0, 10)
    let price = basketPrice
    if(props.isLoggedIn.Email !== undefined){
        email = props.isLoggedIn.Email
    }else{
        email = ""
    }
    const newOrder = {email, date, price, products};
    console.log(products)
    const response = await fetch("http://localhost:5000/purchases/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
    })
        .catch(error => {
            window.alert("Your purchase could not be added to your Account, please notify an Administrator");
            console.log(error)
        });

    const purchaseDB = await response.json();
    console.log(purchaseDB)
    const purchase2Blogged = {Products: products, Cost: price, Date: date, PurchaseID: purchaseDB.insertedId}
    props.isLoggedIn.Purchases.push(purchase2Blogged)
    props.setReload(!props.reload)
    if (email === "") return
    updateUser(props)

}


