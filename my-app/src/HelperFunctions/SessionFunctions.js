import {ReactSession} from "react-client-session";

export function clear(){
    ReactSession.set("wholeAcc", "");
    ReactSession.set("admin", "");
    ReactSession.set("hasData", false);
}

export function clearCache(){
    ReactSession.set("wholeAcc", "");
    ReactSession.set("admin", "");
    ReactSession.set("hasData", false);
    document.getElementById('cacheBox').innerHTML = 'Cache has been cleared'
}
export function setStorage(isLoggedIn, setLoggedIn) {
    if (isLoggedIn !== false) {
        ReactSession.set("wholeAcc", isLoggedIn);
        ReactSession.set("hasData", true);
        setLoggedIn(isLoggedIn)
    } else if (ReactSession.get("hasData") === true) {
        setLoggedIn(ReactSession.get("wholeAcc"))
    }
}
