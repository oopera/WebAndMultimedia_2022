import {ReactSession} from "react-client-session";

export function clear(){
    ReactSession.set("wholeAcc", "");
    ReactSession.set("admin", "");
    ReactSession.set("hasData", false);
}
