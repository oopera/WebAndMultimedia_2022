import {ReactSession} from "react-client-session";


// Clears the local storage.
export function clear(){
    ReactSession.set("wholeAcc", "");
    ReactSession.set("admin", "");
    ReactSession.set("hasData", false);
}
// Clears the local storage with response on input of "clear cache" button in the Account Window
export function clearCache(){
    ReactSession.set("wholeAcc", "");
    ReactSession.set("admin", "");
    ReactSession.set("hasData", false);
    document.getElementById('cacheBox').innerHTML = 'Cache has been cleared'
}

// If the user is logged in, set the storage to the currently logged in user, set hasData to true.
// If user isnt logged in but hasData is true, load user from local storage
export function setStorage(isLoggedIn, setLoggedIn) {
    if (isLoggedIn !== false) {
        ReactSession.set("wholeAcc", isLoggedIn);
        ReactSession.set("hasData", true);
        setLoggedIn(isLoggedIn)
    } else if (ReactSession.get("hasData") === true) {
        setLoggedIn(ReactSession.get("wholeAcc"))
    }
}
