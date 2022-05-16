import './App.css';
import Background from "./BackgroundComponents/Background";
import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useEffect, useState} from "react";
import AdminControl from "./AdminComponents/AdminControl";

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
    const [account, setAccount] = useState('null');
    function theTime() {
        let Datte = new Date();
        let H = Datte.getHours();
        let m = Datte.getMinutes();
        let s = Datte.getSeconds();
        if (H < 10 ){
            H = "0" + H;
        }
        if (m < 10 ){
            m = "0" + m;
        }
        if (s < 10 ){
            s = "0" + s;
        }
        //document.getElementById("time").textContent = `${H} : ${m} : ${s}`
    }
    setInterval(theTime);

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
              <p className={'logo'}>lucaslichner.</p>
                <p className={'maintext'}>buy.my.shit.</p>
                <div style={{top: "95%", writingMode: "vertical-rl",
                    textOrientation: "mixed", fontSize: "150%", position: "absolute"}} id="time">placeholder</div>
                <Background/>
              <TopNav account={account} setAccount={setAccount} openedItem={openedItem} setOpenedItem={setOpenedItem}/>
              <ProductList products={products} setProducts={setProducts} openedItem={openedItem} setOpenedItem={setOpenedItem} />
              <AdminControl products={products} setProducts={setProducts} openedItem={openedItem} setOpenedItem={setOpenedItem}/>
            </div>
      );
}
