import './App.css';
import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useEffect, useRef, useState} from "react";
import SubWindow from "./SubWindows/SubWindow";
import { ReactSession } from 'react-client-session';
import HamNav from "./TopNavComponents/HamNav";

import SideNav from "./BackgroundComponents/SideNav";
import BackGroundGrafix from "./BackgroundComponents/BackGroundGrafix";

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

    ReactSession.setStoreType("localStorage");


    useEffect(() => {
        setLoading(!loading)
    },[reload.valueOf()]);


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



    const useMousePosition = () => {
        const [position, setPosition] = useState({ x: 0, y: 0 });
        useEffect(() => {
            const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
            window.addEventListener("mousemove", setFromEvent);
            return () => {
                window.removeEventListener("mousemove", setFromEvent);
            };
        }, []);
        return position;
    };




    const position = useMousePosition();

    return (

        <div>
            <div id="mouse-circle" style={{
                left: position.x,
                top: position.y, zIndex: 20}}> </div>
            <div className={'TopNavWrapper'}>
        <TopNav setReload={setReload} reload={reload} basket={basket} setAccComments={setAccComments} setPurchases={setPurchases} isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn} account={account} setAccount={setAccount} openedItem={openedItem}
                setOpenedItem={setOpenedItem}/>
                <HamNav setReload={setReload} reload={reload} basket={basket} setAccComments={setAccComments} setPurchases={setPurchases} isLoggedIn={isLoggedIn}
                        setLoggedIn={setLoggedIn} account={account} setAccount={setAccount} openedItem={openedItem}
                        setOpenedItem={setOpenedItem}/>

            </div>
            <a  href={"https://lucaslichner.de"} target={"_blank"} className={'logo'}>lucaslichner. </a>
                <p className={'maintext'}><span>buy.</span><span>my.</span><span style={{textDecoration: 'line-through'}}>shit</span>.<span style={{fontStyle: 'italic'}}>stuff</span>.</p>
                <div className={"partingline"}> </div>
            <div className={"breakingNewsCont"}> <div className={"breakingNews"} >Thank you for visiting! If youre in need of help or explanation please consult the container on the right hand side </div> </div>
            <SideNav/>

        <ProductList  isLoggedIn={isLoggedIn} basket={basket} setBasket={setBasket} accComments={accComments} purchases={purchases} products={products} setProducts={setProducts}
                     openedItem={openedItem} setOpenedItem={setOpenedItem}/>
        <SubWindow setReload={setReload} reload={reload} isLoggedIn={isLoggedIn} basket={basket} setBasket={setBasket} accComments={accComments} setAccComments={setAccComments} purchases={purchases} account={account} setAccount={setAccount}
                   openedItem={openedItem} setOpenedItem={setOpenedItem} products={products}/>
            <div className={"frame"}>

            </div>
        </div>

      );
}

