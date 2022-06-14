import './App.css';
import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useEffect, useState} from "react";
import SubWindow from "./SubWindows/SubWindow";
import { ReactSession } from 'react-client-session';
import HamNav from "./TopNavComponents/HamNav";
import SideNav from "./BackgroundComponents/SideNav";
import BackGroundGrafix from "./BackgroundComponents/BackGroundGrafix";

export default function App() {
    const [products, setProducts] = useState([]);
    const [openedItem, setOpenedItem] = useState('null');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [account, setAccount] = useState();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loadingScreen, setloadingScreen] = useState(true);
    const [reload, setReload] = useState(false);
    const [basket, setBasket] = useState([]);
    const [comments, setComments] = useState([]);
    const [rerender, setRerender] = useState(false)
    ReactSession.setStoreType("localStorage");


    useEffect(() => {
        setStorage();
    },[reload]);

    function setStorage() {
        if (isLoggedIn !== false) {
            ReactSession.set("wholeAcc", isLoggedIn);
            ReactSession.set("admin", account);
            ReactSession.set("hasData", true);
            setLoggedIn(isLoggedIn)
        } else if (ReactSession.get("hasData") === true) {
            setLoggedIn(ReactSession.get("wholeAcc"))
            setAccount(ReactSession.get("admin"))
        }
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
            setLoading(false)
        }
        getProducts();

    }, [products]);

    useEffect(() => {
        async function getComments() {
            const response = await fetch(`http://localhost:5000/webweb/comments`);
            if (!response.ok) {
                const message = `Comments could not be loaded`;
                window.alert(message);
            }
            const comments = await response.json();
            setComments(comments);
            setLoading2(false)
        }
        getComments();
    }, [comments, rerender]);


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

        useEffect(() => {
            if(loading === false && loading2 === false) {
                setTimeout(() => {
                    setloadingScreen(false);
                }, 2000)
            }
    }, [loading, loading2]);


    const position = useMousePosition();
    return (
        <div>
        {loadingScreen === true && (
            <div className={'loadingScreen'}>
                <div className={'loadingBox'}>
                    <div className={'superCircle'}>
                    <div className={'centerCircle'}>
                    <div className={'loadingText'} id={'loadingText'}>
           <span className={'first'}>L</span>
           <span className={'second'}>O</span>
           <span className={'third'}>A</span>
           <span className={'fourth'}>D</span>
           <span className={'fifth'}>I</span>
           <span className={'sixth'}>N</span>
           <span className={'seventh'}>G</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div id="mouse-circle" style={{
                    left: position.x,
                    top: position.y, zIndex: 20}}>
                    <p style={{
                        left: 15,
                    }} className={'movePosition'}>{position.x}</p>
                    <p style={{
                        left: 15,
                        top: -8 }} className={'movePosition'}>{position.y}</p>
                </div>
                {loading === false && loading2 === false && (
                    <div className={'loadingMover'}>
                        <div className={'welcomeTing'}> WELCOME </div>
                    </div>
                )}
            </div>
        )

    }   {loadingScreen === false && (

        <div>
            <div className={'loadingMoverBackDown'}>
                <div className={'welcomeTing'}> WELCOME </div>
            </div>


            <div id="mouse-circle" style={{
                left: position.x,
                top: position.y, zIndex: 20}}>
                <p style={{
                    left: 15,
                }} className={'movePosition'}>{position.x}</p>
                <p style={{
                    left: 15,
                    top: -8 }} className={'movePosition'}>{position.y}</p>
            </div>


        <div className={'TopNavWrapper'}>

            <TopNav setReload={setReload}
                    reload={reload}
                    basket={basket}
                    isLoggedIn={isLoggedIn}
                    setLoggedIn={setLoggedIn}
                    account={account}
                    setAccount={setAccount}
                    openedItem={openedItem}
                    setOpenedItem={setOpenedItem}/>

            <HamNav setReload={setReload}
                    reload={reload}
                    basket={basket}
                    isLoggedIn={isLoggedIn}
                    setLoggedIn={setLoggedIn}
                    account={account}
                    setAccount={setAccount}
                    openedItem={openedItem}
                    setOpenedItem={setOpenedItem}/>
        </div>
            <BackGroundGrafix logoName={'logo'} mainText={'maintext'}/>
                <div className={"partingline"}> </div>
                <div className={"breakingNewsCont"}>
                    <div className={"breakingNews"} >Thank you for visiting! If youre in need of help or explanation please consult the container on the right hand side </div>
                </div>

                <SideNav/>

        <ProductList  isLoggedIn={isLoggedIn}
                      basket={basket}
                      setBasket={setBasket}
                      products={products}
                      setProducts={setProducts}
                      openedItem={openedItem}
                      comments={comments}
                      setComments={setComments}
                      rerender={rerender}
                      setRerender={setRerender}
            />
        <SubWindow
                   reload={reload}
                   setReload={setReload}
                   isLoggedIn={isLoggedIn}
                   setLoggedIn={setLoggedIn}
                   basket={basket}
                   setBasket={setBasket}
                   account={account}
                   setAccount={setAccount}
                   openedItem={openedItem}
                   setOpenedItem={setOpenedItem}
                   products={products}
                   setProducts={setProducts}
                   rerender={rerender}
                   setRerender={setRerender}
        />

            <div className={"frame2"}>
            </div>
            <div className={"frame"}>
            </div>

        </div>
            )}
        </div>
      );
}

