import {ReactSession} from "react-client-session";
import {clear, setStorage} from "./SessionFunctions";
// Updates user to information passed by props.IsLoggedIn (i.e. currently loggedIn user) - this makes it so react state lines up with db information

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

// Calls login route with form passed by props, if email&password combination exists, set LoggedIn to received user Object.

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
    if(user === false){
        document.getElementById("CorrectionBox").innerHTML = "Wrong credentials";
    } else {

        props.props.setLoggedIn(user[0])
        setStorage(user[0], props.props.setLoggedIn)

    }
}

// Checks for valid input, pw length, pw===p2, email being a functioning email.
// calls wantsToRegistreFunc (changes TopNav state so the registre form is no longer shown)
// If Registration is successful sets Login Form to email and PW so user can login seamlessly
// If route returns false, either username or email is already in use

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

// Almost duplicate of register, but resets AdminInputs to "" and doesnt call wantsToRegistreFunc
// Also updates User State which is only available in AdminComponent.

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
    if(response.ok){
        document.getElementById("CorrectionBox2").innerHTML = "User successfully entered into the Database";
    }
    const newUser = user[0]
    props.setUsers(users => {
        return[...users, {newUser}]
    })
}

    // sets state in topnav
export function wantsToRegistreFunc(props){
    props.setWantsToRegistre(!props.wantsToRegistre)
    document.getElementById("CorrectionBox").innerHTML = "";
}

    // sets loggedIn state to false (like on load) closes account or admin window if opened, since those can no longer be accessed.
export function logout(props){
    props.props.setLoggedIn(false);
    props.setForm({ email: "", password: ""});
    clear();
    if(props.props.openedItem === 'account' || props.props.openedItem === 'admin') {
        props.props.setOpenedItem("null")
    }
}

    // Filters users state down to user with passed id (selectedUser in AdminControl)
    // Maps over all of the users comments, and calls deleteComment for each of them.
    // deletes user, and resets Comments and Users state
export async function deleteUser(id, users, setUsers, setComments) {
    const user = users.filter(e => e._id.includes(id))
    const comments = user[0].Comments
    comments.forEach(element => deleteComment(element))

    await fetch(`http://localhost:5000/delUser/${id}`, {
        method: "DELETE"
    });

    const newUsers = users.filter(el => el._id !== id);
    document.getElementById('deleteUsertext').innerHTML='User deleted'
    setUsers(newUsers);
    setComments([])
}
// Logs out the user, deletes all of the users comments, and closes any opened Subwindow
export async function deleteOwnAccount(isLoggedIn, setLoggedIn, setComments, setOpenedItem) {
    setOpenedItem('none')
    const comments = isLoggedIn.Comments
    comments.forEach(element => deleteComment(element))

    await fetch(`http://localhost:5000/delUser/${isLoggedIn._id}`, {
        method: "DELETE"
    });

    setLoggedIn(false)
    clear();
    setComments([])
}

    // Deletes comment. Checks if comment.id exists, if not call with _id if it does call with id
    // purely a safety measure inCase old data with differing structure is still present in DB
export async function deleteComment(comment) {

    if(comment.id === undefined){
        await fetch(`http://localhost:5000/delComment/${comment._id}`, {
            method: "DELETE"
        });

    } else {
        await fetch(`http://localhost:5000/delComment/${comment.id}`, {
            method: "DELETE"
        });
    }
}

    // Deletes a Comment from User Information. Does not get called when product gets deleted, since its not necessary. The comment is no longer displayed,
    // but the User might still want to see it.
    // Call deleteComments. Splices the Users Comments at index of Comments. Resets isLoggedIn state to updated UserInfo
    // updates User with updated Userinfo

export async function deleteAccComment(comment, setLoggedIn, isLoggedIn, index, setComments){
    await deleteComment(comment)
    let commeys = isLoggedIn.Comments
    commeys.splice(index, 1)
    isLoggedIn.Comments = commeys;
    setLoggedIn(isLoggedIn)
    await updateUser({isLoggedIn})
    setComments([])
}
