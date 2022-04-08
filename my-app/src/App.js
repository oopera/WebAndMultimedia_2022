import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useState} from "react";
export default function App() {
    const [show, setVisibility] = useState();

    return (

            <div>
              <TopNav />

              <ProductList />
            </div>

      );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

