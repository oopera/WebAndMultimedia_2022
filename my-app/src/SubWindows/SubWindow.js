import AdminControl from "../AdminComponents/AdminControl";
import {AccountWindow} from "../AccountComponents/AccountWindow";
import BasketComponent from "../TopNavComponents/BasketComponent";

export default function SubWindow(props){
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
                       rerender={props.rerender}
                       setRerender={props.setRerender}
        />
    )}
    {props.openedItem === 'basket' && (
        <BasketComponent setOpenedItem={props.setOpenedItem}
                         setReload={props.setReload}
                         reload={props.reload}
                         isLoggedIn={props.isLoggedIn}
                         setLoggedIn={props.setLoggedIn}
                         setBasket={props.setBasket}
                         basket={props.basket}/>
    )}
    </>
    )}
