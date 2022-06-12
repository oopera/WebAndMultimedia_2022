import {ReactSession} from "react-client-session";
import {clear} from "./SessionFunctions";

export async function updateUser(props){
    const updatedAccount = {Email: props.isLoggedIn.Email,
        Password: props.isLoggedIn.Password,
        Purchases: props.isLoggedIn.Purchases,
        Username: props.isLoggedIn.Username,
        Comments: props.isLoggedIn.Comments,
        Admin: props.isLoggedIn.Admin,
        id: props.isLoggedIn._id};

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
    console.log(props.form)
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
        if(user[0].Admin === true){
            props.props.setAccount('admin')
        }
        props.props.setLoggedIn(user[0])
        props.props.setAccComments(user[0].Comments)
        props.props.setPurchases(user[0].Purchases)
        props.props.setReload(!props.props.reload)
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
    props.setForm({email: props.reform.email, password: props.reform.password});
    if(response.ok) {
        await login(props);
    }
}

export async function addUser(props) {

    if(props.userform.password.length<8){
        document.getElementById("CorrectionBox2").innerHTML = "Password must be >8 Chars";
        return;
    }
    if(props.userform.password !== props.userform.password2){

        document.getElementById("CorrectionBox2").innerHTML = "Passwords must match";
        return;
    }
    if(props.userform.username.length<3){

        document.getElementById("CorrectionBox2").innerHTML = "Username must be >3 Chars";
        return;
    }
    if(!props.userform.email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        document.getElementById("CorrectionBox").innerHTML = "Please enter a valid email address";
        return;
    }

    const newPerson = {...props.userform};
    console.log(newPerson);
    const response = await fetch("http://localhost:5000/users/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
    })
        .catch(error => {
            window.alert("Could not add user to Database");
        });
    props.setUserform({email: '', username: '', password: '', password2: '', admin: false});
    props.setUsers(users => {
        return [...users, {newPerson}]
    })
}




export function wantsToRegistreFunc(props){
    props.setWantsToRegistre(!props.wantsToRegistre)
    document.getElementById("CorrectionBox").innerHTML = "";
}

export function logout(props){
    props.props.setAccount('');
    props.props.setLoggedIn(false);
    props.setForm({ email: "", password: ""});
    clear();
    if(props.props.openedItem === 'account' || props.props.openedItem === 'admin') {
        props.props.setOpenedItem("null")
    }
}

export async function deleteUser(id, users, setUsers) {

    const user = users.filter(e => e._id.includes(id))
    console.log(user)
    const comments = user[0].Comments
    comments.forEach(element => deleteComment(element))

    await fetch(`http://localhost:5000/delUser/${id}`, {
        method: "DELETE"
    });

    const newUsers = users.filter((el) => el._id !== id);
    setUsers(newUsers);
}
export async function deleteComment(comment) {

    await fetch(`http://localhost:5000/delComment/${comment.id}`, {
        method: "DELETE"
    });


}
