import AdminControl from "../AdminComponents/AdminControl";
import {AccountWindow} from "../AccountComponents/AccountWindow";
import BasketComponent from "../TopNavComponents/BasketComponent";

export default function SubWindow(props){

    //This Components works as a route for the Different FocusWindows

return(
    <>
    {props.openedItem === 'admin' && (
        <AdminControl setOpenedItem={props.setOpenedItem}
                      products={props.products}
                      setProducts={props.setProducts}
                      comments={props.comments}
                      setComments={props.setComments}
        />

    )}

    {props.openedItem === 'account' && (
        <AccountWindow isLoggedIn={props.isLoggedIn}
                       setLoggedIn={props.setLoggedIn}
                       setOpenedItem={props.setOpenedItem}
                       setComments={props.setComments}
        />
    )}
    {props.openedItem === 'basket' && (
        <BasketComponent setOpenedItem={props.setOpenedItem}

                         isLoggedIn={props.isLoggedIn}
                         setLoggedIn={props.setLoggedIn}
                         setBasket={props.setBasket}
                         basket={props.basket}/>
    )}
    </>
    )}
