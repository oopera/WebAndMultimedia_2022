import {ReactSession} from "react-client-session";
import {clear, setStorage} from "./SessionFunctions";

export async function updateUser(props){
    const updatedAccount = {
        Email: props.isLoggedIn.Email,
        Password: props.isLoggedIn.Password,
        Purchases: props.isLoggedIn.Purchases,
        Username: props.isLoggedIn.Username,
        Comments: props.isLoggedIn.Comments,
        Admin: props.isLoggedIn.Admin,
        id: props.isLoggedIn._id};
    ReactSession.set("wholeAcc", props.isLoggedIn);
    const response = await fetch(`http://localhost:5000/updateUser/${props.isLoggedIn._id.toString()}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAccount),
    })
    .catch(error => {
        window.alert("Updating the User Failed due to an unknown error, please try again later.");
        console.log(error, response)
    });
}

export async function login(props){
    document.getElementById("CorrectionBox").innerHTML = "";
    const form = { ...props.form };
    const res = await fetch("http://localhost:5000/users/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
        .catch(error => {
            window.alert("Logging in did not Work due to an unknown error, please try again later. ");
            console.log(error)
        });
    const user = await res.json();
    if(user.length === 0){
        document.getElementById("CorrectionBox").innerHTML = "Wrong credentials";
    } else {

        props.props.setLoggedIn(user[0])
        console.log(user[0])
        setStorage(user[0], props.props.setLoggedIn)

    }
}


export async function register(props){
    if(props.reform.password.length<8){
        document.getElementById("CorrectionBox").innerHTML = "Password must be >8 Chars";
        return;
    }
    if(props.reform.password !== props.reform.password2){
        document.getElementById("CorrectionBox").innerHTML = "Passwords must match";
        return;
    }
    if(props.reform.username.length<3){
        document.getElementById("CorrectionBox").innerHTML = "Username must be >3 Chars";
        return;
    }
    if(!props.reform.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        document.getElementById("CorrectionBox").innerHTML = "Please enter a valid email adress";
        return;
    }
    wantsToRegistreFunc(props)
    const newPerson = { ...props.reform };
    const response = await fetch("http://localhost:5000/users/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
    })
        .catch(error => {
            window.alert("Registering did not work due to an unknown error, please try again later.");
            console.log(error)
        });
    const responsy = await response.json()
    if(responsy===false){
        document.getElementById("CorrectionBox").innerHTML = "Email or Username is already in use";
        return
    }
    props.setForm({email: props.reform.email, password: props.reform.password});
    document.getElementById("CorrectionBox").innerHTML = "Successfully registred, you can log in now";

}

export async function addUser(props) {
    if(props.userform.password.length<8 || props.userform.password.length>20){
        document.getElementById("CorrectionBox2").innerHTML = "Password must be between 8 and 20 Characters long";
        return;
    }
    if(props.userform.password !== props.userform.password2){

        document.getElementById("CorrectionBox2").innerHTML = "Passwords must match";
        return;
    }
    if(props.userform.username.length<3 || props.userform.username.length>12){

        document.getElementById("CorrectionBox2").innerHTML = "Username must be between 3 and 12 Characters long";
        return;
    }
    if(!props.userform.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        document.getElementById("CorrectionBox").innerHTML = "Please enter a valid email address";
        return;
    }

    const newPerson = {...props.userform};
    const response = await fetch("http://localhost:5000/users/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
    })
        .catch(error => {
            window.alert("Could not add user to Database");
            console.log(error)
        });
    const user = await response.json();
    props.setUserform({email: '', username: '', password: '', password2: '', admin: false});

    if(user===false){
        document.getElementById("CorrectionBox2").innerHTML = "Email or Username is already in use";
        return
    }
    if(response.ok){console.log('User Successfully added to the Database')
    }
    const newUser = user[0]
    props.setUsers(users => {
        return[...users, {newUser}]
    })
}


export function wantsToRegistreFunc(props){
    props.setWantsToRegistre(!props.wantsToRegistre)
    document.getElementById("CorrectionBox").innerHTML = "";
}

export function logout(props){
    props.props.setLoggedIn(false);
    props.setForm({ email: "", password: ""});
    clear();
    if(props.props.openedItem === 'account' || props.props.openedItem === 'admin') {
        props.props.setOpenedItem("null")
    }
}

export async function deleteUser(id, users, setUsers, setComments) {

    const user = users.filter(e => e._id.includes(id))
    console.log(user)
    const comments = user[0].Comments
    comments.forEach(element => deleteComment(element))

    await fetch(`http://localhost:5000/delUser/${id}`, {
        method: "DELETE"
    });

    const newUsers = users.filter((el) => el._id !== id);
    setUsers(newUsers);
    setComments([])
}
export async function deleteComment(comment) {
    console.log(comment)
    if(comment.id === undefined){
        await fetch(`http://localhost:5000/delComment/${comment._id}`, {
            method: "DELETE"
        });
    }
    await fetch(`http://localhost:5000/delComment/${comment.id}`, {
        method: "DELETE"
    });
}

export async function deleteAccComment(comment, setLoggedIn, isLoggedIn, index, setComments){
    await deleteComment(comment)
    let commeys = isLoggedIn.Comments
    commeys.splice(index, 1)
    isLoggedIn.Comments = commeys;
    setLoggedIn(isLoggedIn)
    await updateUser({isLoggedIn})

    setComments([])

}
