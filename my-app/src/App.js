import './App.css';

import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useState} from "react";
import AdminControl from "./AdminComponents/AdminControl";

/*
Umzusetzende Funktionen aufrufbar aus dem Browser
• Responsive Design
• Add/Remove von Benutzern/Kunden (Email, Name, Vorname, …)
• Registrierung/Login durch Kunde
• Produktverwaltung (Admin)
• Anlegen / Editieren
• Löschen von Produkten
• Update Anzahl verfügbarer von Produkten (auf Lager)
• Eingabe von Bewertungen / Kommentaren durch Kunden
• Anzeige von Produkten aus Kundensicht
• Allgemeine Ansicht
• Produkte und Bewertungen
• Anzahl verfügbarer Produkte
• Markierung von Bewertungen tatsächlich von diesem User gekaufter Waren
• Liste eigener Bewertungen
• Liste eigener Käufe
• Kauf
• Aktualisierung der Anzahl verfügbarer Produkte
• Aufnahme in die Liste gekaufter Produkte
• Dynamische Elemente
• Gefilterte Suche nach Produkten („Appl…“)
• Suche nach Usern („Mic….“) durch Admin
• Canvas2D: Charts für Aktivität des Systems (Anzahl verkaufter Produkte, Lagerstand, …)
 */
export default function App() {
    const [openedItem, setOpenedItem] = useState('null');

    return (
            <div>
              <TopNav openedItem={openedItem} setOpenedItem={setOpenedItem}/>
              <ProductList openedItem={openedItem} setOpenedItem={setOpenedItem} />
                <AdminControl openedItem={openedItem} setOpenedItem={setOpenedItem}/>
            </div>
      );
}
