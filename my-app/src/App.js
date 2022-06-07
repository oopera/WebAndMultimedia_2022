import './App.css';
import Background from "./BackgroundComponents/Background";
import BackGroundGrafix from "./BackgroundComponents/BackGroundGrafix";
import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useEffect, useState} from "react";
import SubWindow from "./SubWindows/SubWindow";
import { ReactSession } from 'react-client-session';
import HamNav from "./TopNavComponents/HamNav";
/*

• Anlegen / Editieren / Löschen von Produkten
• Update Anzahl verfügbarer von Produkten (auf Lager)
• Add/Remove von Benutzern/Kunden (Email, Name, Vorname, …)
• Suche nach Usern („Mic….“) durch Admin

• Canvas2D: Charts für Aktivität des Systems (Anzahl verkaufter Produkte, Lagerstand, …)

 */
ReactSession.setStoreType("localStorage");

export default function App() {
    const [products, setProducts] = useState([]);
    const [openedItem, setOpenedItem] = useState('null');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [account, setAccount] = useState();
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [accComments, setAccComments] = useState(false);
    const [basket, setBasket] = useState([]);

    console.log(isLoggedIn)
    ReactSession.setStoreType("localStorage");


    useEffect(() => {
        setLoading(!loading)
    },[reload.valueOf()]);
    console.log(ReactSession.get("Purchases"))

    function setStorage() {
        if (isLoggedIn !== false) {
            ReactSession.set("wholeAcc", isLoggedIn);
            ReactSession.set("admin", account);
            ReactSession.set("Purchases", isLoggedIn.Purchases);
            ReactSession.set("Comments", isLoggedIn.Comments);
            ReactSession.set("hasData", true);
        } else if (ReactSession.get("hasData") === true) {
            setLoggedIn(ReactSession.get("wholeAcc"))
            setAccount(ReactSession.get("admin"))
            setAccComments(ReactSession.get("Comments"))
            setPurchases(ReactSession.get("Purchases"))
        }
    }


    useEffect(() => {
        setStorage();
        },[loading.valueOf()]);

    function clear(){
        ReactSession.set("wholeAcc", "");
        ReactSession.set("admin", "");
        ReactSession.set("Purchases", "");
        ReactSession.set("Comments", "");
        ReactSession.set("hasData", false);
        setLoggedIn(false)
        setAccount(false)
        setAccComments(false)
        setPurchases([])
    }

    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`http://localhost:5000/webweb/products`);
            if (!response.ok) {
                const message = `Products could not be loaded`;
                window.alert(message);
                return;
            }
            const prodDB = await response.json();
            setProducts(prodDB);
        }
        getProducts();
        return;
    }, [products.length]);

    return (

        <div>

            <div className={'TopNavWrapper'}>
        <TopNav setReload={setReload} reload={reload} basket={basket} setAccComments={setAccComments} setPurchases={setPurchases} isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn} account={account} setAccount={setAccount} openedItem={openedItem}
                setOpenedItem={setOpenedItem}/>
            </div>
            <HamNav setReload={setReload} reload={reload} basket={basket} setAccComments={setAccComments} setPurchases={setPurchases} isLoggedIn={isLoggedIn}
                    setLoggedIn={setLoggedIn} account={account} setAccount={setAccount} openedItem={openedItem}
                    setOpenedItem={setOpenedItem}/>
        <ProductList  isLoggedIn={isLoggedIn} basket={basket} setBasket={setBasket} accComments={accComments} purchases={purchases} products={products} setProducts={setProducts}
                     openedItem={openedItem} setOpenedItem={setOpenedItem}/>
        <SubWindow setReload={setReload} reload={reload} isLoggedIn={isLoggedIn} basket={basket} setBasket={setBasket} accComments={accComments} purchases={purchases} account={account} setAccount={setAccount}
                   openedItem={openedItem} setOpenedItem={setOpenedItem} products={products}/>
            <BackGroundGrafix/>

        </div>

      );
}
//<Background/>
