import './App.css';
import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useEffect, useState} from "react";
import SubWindow from "./SubWindows/SubWindow";
import { ReactSession } from 'react-client-session';
import HamNav from "./TopNavComponents/HamNav";
import SideNav from "./BackgroundComponents/SideNav";
import BackGroundGrafix from "./BackgroundComponents/BackGroundGrafix";
import {setStorage} from "./HelperFunctions/SessionFunctions";

export default function App() {

    //Explicit explanation to all States can be found in the Developer documentation
    const [basket, setBasket] = useState([]);
    const [comments, setComments] = useState([]);
    const [products, setProducts] = useState([]);
    const [openedItem, setOpenedItem] = useState('null');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loadingScreen, setloadingScreen] = useState(true);

    ReactSession.setStoreType("localStorage");

    //set Storage on first Load only, afterwards setStorage has to be called explicitly
    useEffect(() => {
        setStorage(isLoggedIn, setLoggedIn);
    },[]);

    //If the user is LoggedIn, set the Session to that account, if not - but Data is already present, load data.


    //Load Comments and Products
    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`https://webundmultimedia2022.herokuapp.com/webweb/products`);
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
    }, [products.length]);

    useEffect(() => {
        async function getComments() {
            const response = await fetch(`https://webundmultimedia2022.herokuapp.com/webweb/comments`);
            if (!response.ok) {
                const message = `Comments could not be loaded`;
                window.alert(message);
            }
            const comments = await response.json();
            setComments(comments);
            setLoading2(false)
        }
        getComments();
    }, [comments.length]);

    // gets Mouse position for to replace the cursor with position and circle
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

    //Controls the Loading Animation, once comments and products are loaded, the load in animation starts, which gets removed from render once setLoadingScreen is false
        useEffect(() => {
            if(loading === false && loading2 === false) {
                setTimeout(() => {
                    setloadingScreen(false);
                }, 2000)
            }
    }, [loading, loading2]);


    const position = useMousePosition();

    // if loadingscreen === true, play loading animation. if true and loading&loading1 === false, please loading transition
    //display all relevant components, topnavwrapper, mobilenavwrapper, background graphics, produclist and subwindows
    return (
        <div className={'siteWrapper'}>

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
            {/* Renders the loading animation */}
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

            {/* Renders the Transition from loading animation to loaded website */}
                    {loading === false && loading2 === false && (
                        <div className={'loadingMover'}>
                            <div className={'welcomeTing'}> WELCOME </div>
                        </div>
                    )}
            </div>
        )}

        {loadingScreen === false && (

            <div>
                <div className={'loadingMoverBackDown'}>
                    <div className={'welcomeTing'}> WELCOME </div>
                </div>

        <div className={'TopNavWrapper'}>

            <HamNav
                    basket={basket}
                    isLoggedIn={isLoggedIn}
                    setLoggedIn={setLoggedIn}
                    openedItem={openedItem}
                    setOpenedItem={setOpenedItem}/>

            <TopNav
                    basket={basket}
                    isLoggedIn={isLoggedIn}
                    setLoggedIn={setLoggedIn}
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
            />

        <SubWindow     isLoggedIn={isLoggedIn}
                       setLoggedIn={setLoggedIn}
                       basket={basket}
                       setBasket={setBasket}
                       openedItem={openedItem}
                       setOpenedItem={setOpenedItem}
                       products={products}
                       setProducts={setProducts}
                       comments={comments}
                       setComments={setComments}
            />

            <div className={"frame frame2"}>
            </div>
            <div className={"frame"}>
            </div>

        </div>
            )}
        </div>
      );
}

