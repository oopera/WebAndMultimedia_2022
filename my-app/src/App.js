import './App.css';

import TopNav from "./TopNavComponents/TopNav";
import ProductList from "./ProductComponents/ProductList"
import React, {useState} from "react";
export default function App() {
    return (
            <div>
              <TopNav />
              <ProductList />
            </div>
      );
}
