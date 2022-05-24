import './App.css';
import Background from "./BackgroundComponents/Background";
import BackGroundGrafix from "./BackgroundComponents/BackGroundGrafix";
import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useEffect, useState} from "react";
import AdminControl from "./AdminComponents/AdminControl";
import {ProductFocus} from "./ProductComponents/Product";
import SubWindow from "./SubWindows/SubWindow";

/*
Umzusetzende Funktionen aufrufbar aus dem Browser

• Registrierung/Login durch Kunde

(Admin)

• Anlegen / Editieren / Löschen von Produkten
• Update Anzahl verfügbarer von Produkten (auf Lager)
• Add/Remove von Benutzern/Kunden (Email, Name, Vorname, …)
• Suche nach Usern („Mic….“) durch Admin

• Eingabe von Bewertungen / Kommentaren durch Kunden

• Liste eigener Bewertungen
• Liste eigener Käufe

• Markierung von Bewertungen tatsächlich von diesem User gekaufter Waren / Nur user die gekauft haben können bewerten

• Canvas2D: Charts für Aktivität des Systems (Anzahl verkaufter Produkte, Lagerstand, …)

 */
export default function App() {
    const [products, setProducts] = useState([]);
    const [openedItem, setOpenedItem] = useState('null');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [account, setAccount] = useState();
    const [loading, setLoading] = useState(false);
    const [purchases, setPurchases] = useState(false);
    const [accComments, setAccComments] = useState(false);

    if(isLoggedIn !== false){
        console.log(purchases)
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
                <BackGroundGrafix/>
                <Background/>
              <TopNav setAccComments={setAccComments} setPurchases={setPurchases} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} account={account} setAccount={setAccount} openedItem={openedItem} setOpenedItem={setOpenedItem}/>
              <ProductList accComments={accComments} purchases={purchases} products={products} setProducts={setProducts} openedItem={openedItem} setOpenedItem={setOpenedItem} />
              <SubWindow accComments={accComments} purchases={purchases} account={account} setAccount={setAccount} openedItem={openedItem} setOpenedItem={setOpenedItem}/>
            </div>
      );
}
