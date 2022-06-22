import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Cart, Favorites } from "./Pages";
import { Header } from "./components";

function App() {
    return (
        <>
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
