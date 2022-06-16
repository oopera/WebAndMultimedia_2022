import {deleteComment, updateUser} from "./AccountFunctions";
import {ReactSession} from "react-client-session";
import {setStorage} from "./SessionFunctions";

export async function sendComment(props, comments, setComments){
    let comment = document.getElementById("commentInput").value;
    let name = props.isLoggedIn.Username
    let productID = props.id
    let userID = props.isLoggedIn._id
    const newComment = {name, comment, productID, userID};
    const response = await fetch("http://localhost:5000/comments/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
    })
        .catch(error => {
            window.alert("Sending the Comment did not work due to an unknown error, please try again later.");
            console.log(error)
        });
    document.getElementById("commentInput").value = "";
    const commentDB = await response.json();
    const comment2blogged = {Comment: comment, Item: props.name, id: commentDB.insertedId}
    props.isLoggedIn.Comments.push(comment2blogged)
        setComments(comments =>{
        return[...comments, {comment2blogged}]})
    ReactSession.set("wholeAcc",  props.isLoggedIn);
    await updateUser(props)

}

export async function purchase(props, basketPrice){
    let availabilityFlag = true
    let products = []
    let email;
    let date = new Date().toISOString().slice(0, 10)
    let price = basketPrice

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

    props.basket.forEach(updateAvailability)
        function updateAvailability(spaghettiItem){
            if(spaghettiItem.Availability === true) return
            spaghettiItem.Availability = spaghettiItem.Availability-1
        }

    props.basket.forEach(updateProduct)
        async function updateProduct(basketItem){
        const updatedProduct = {
            Name: basketItem.Name,
            Description: basketItem.Description,
            Price: basketItem.Price,
            Availability: basketItem.Availability,
            img: basketItem.img
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

    if(props.isLoggedIn.Email !== undefined){
        email = props.isLoggedIn.Email
    }else{
        email = ""
    }
    const newOrder = {email, date, price, products};

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

    props.setBasket([])
    const purchaseDB = await response.json();

    const purchase2Blogged = {Products: products, Cost: price, Date: date, PurchaseID: purchaseDB.insertedId}
    const newAccountData = props.isLoggedIn

    newAccountData.Purchases.push(purchase2Blogged)
    props.setLoggedIn(newAccountData)

    setStorage(newAccountData, props.setLoggedIn)

    if (email === "") return
    await updateUser(props)

}

export async function deleteProduct(selectedProduct, comments, setComments, products, setProducts){

    const filteredCommies = comments.filter(e => e.productID.includes(selectedProduct))
    console.log(filteredCommies)
    filteredCommies.forEach(element => deleteComment(element))

    const response = await fetch(`http://localhost:5000/delProduct/${selectedProduct}`, {
        method: "DELETE"
    });

    const newComments = comments.filter(e => !e.productID.includes(selectedProduct));
    setComments(newComments);
    const newProducts = products.filter(e => !e._id.includes(selectedProduct))
    setProducts(newProducts)

    if(response.ok) {
        document.getElementById('adminProdResponse').innerHTML = 'Product Deleted'
    }else{
        document.getElementById('adminProdResponse').innerHTML = 'Product could not be Deleted, please try again'
    }

}

export async function addProduct(form, products, setProducts) {
    let newAvailability
    if(form.Availability >= 0){
        newAvailability = parseInt(form.Availability)
    }else{
        newAvailability = true
    }
    if(form.Name === null || form.Name === undefined || form.Name === ""){
        window.alert("Please enter a valid Product Name");
        return
    }
    if(products.filter(e => e.Name.includes(form.Name)).length>=1){
        window.alert("Product with that Name already exists.");
        return
    }
    if(form.Description === null || form.Description === undefined || form.Description === ""){
        window.alert("Please enter a valid description");
        return
    }
    if(form.Price === null || form.Price === undefined || form.Price <= 0){
        window.alert("Please enter a valid price");
        return
    }
    if(form.Availability === null || form.Availability === undefined || form.Availability === ""){
        window.alert("Please enter a valid Availability");
        return
    }
    const newForm ={
        Name: form.Name.toUpperCase(),
        Description: form.Description,
        Price: parseFloat(form.Price),
        Availability: newAvailability,
        img: form.img,
    }
    const response = await fetch("http://localhost:5000/products/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
    })
        .catch(error => {
            window.alert("Sending the Comment did not work due to an unknown error, please try again later.");
            console.log(error, response)
        });
    if(response.ok) {
        document.getElementById('adminProdResponse').innerHTML = 'Product Added'
    }else{
        document.getElementById('adminProdResponse').innerHTML = 'Product could not be Added, please try again'
    }
    setProducts([])

}

export async function updateProduct(form, setProduct){
    let newAvailability
    if(form.Availability !== 'true'){
         newAvailability = parseInt(form.Availability)
    }else{
        newAvailability = true
    }
    const newForm ={
            id: form.id,
            Name: form.Name,
            Description: form.Description,
            Price: parseFloat(form.Price),
            Availability: newAvailability,
            img: form.img,
    }
    const response = await fetch(`http://localhost:5000/updateProduct/${form.id.toString()}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
    })
        .catch(error => {
            window.alert("Updating the User Failed due to an unknown error, please try again later.");
            console.log(error, response)
        });
    if(response.ok) {
        document.getElementById('adminProdResponse').innerHTML = 'Product Updated'
    }else{
        document.getElementById('adminProdResponse').innerHTML = 'Product could not be Updated, please try again'
    }
    setProduct([])
}

