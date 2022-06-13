import AdminControl from "../AdminComponents/AdminControl";
import {AccountWindow} from "../AccountComponents/AccountWindow";
import BasketComponent from "../TopNavComponents/BasketComponent";

export default function SubWindow(props){
return(
    <>
    {props.openedItem === 'admin' && (
        <AdminControl setOpenedItem={props.setOpenedItem} products={props.products} setProducts={props.setProducts}/>

    )}

    {props.openedItem === 'account' && (
        <AccountWindow isLoggedIn={props.isLoggedIn} setOpenedItem={props.setOpenedItem}  setAccComments={props.setAccComments} accComments={props.accComments} purchases={props.purchases}/>
    )}
    {props.openedItem === 'basket' && (
        <BasketComponent setOpenedItem={props.setOpenedItem} setReload={props.setReload} reload={props.reload} isLoggedIn={props.isLoggedIn} setLoggedIn={props.setLoggedIn} setBasket={props.setBasket} basket={props.basket}/>
    )}
    </>
    )}
