import './App.css';
import Background from "./BackgroundComponents/Background";
import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useState} from "react";
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
    const [openedItem, setOpenedItem] = useState('null');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [account, setAccount] = useState('null');
    return (
            <div>
              <p className={'logo'}>lucaslichner.</p>
                <p className={'maintext'}>buy.my.shit.</p>
                <Background/>
              <TopNav account={account} setAccount={setAccount} openedItem={openedItem} setOpenedItem={setOpenedItem}/>
              <ProductList openedItem={openedItem} setOpenedItem={setOpenedItem} />
              <AdminControl openedItem={openedItem} setOpenedItem={setOpenedItem}/>
            </div>
      );
}
