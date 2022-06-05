import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Home, Cart, Favorites } from "./Pages";
import { Header } from "./components";
import { addItem, deleteItem } from "./sliceces/cartSlice";
import { postItem, deleteFavItem } from "./sliceces/favoritesSlice";

function App() {
    const dispatch = useDispatch();

    const onSelectDeleteFavItem = useCallback((id) => {
        dispatch(deleteFavItem(id));
    }, []);

    const onSelectBuy = useCallback((item) => {
        dispatch(addItem(item));
    }, []);

    const onSelectDeleteItem = useCallback((id, price) => {
        dispatch(deleteItem({ id, price }));
    }, []);

    const onSelectAddFavItem = useCallback((item) => {
        dispatch(postItem(item));
    }, []);

    return (
        <>
            <Header />
            <div className="content">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                onSelectAddFavItem={onSelectAddFavItem}
                                onSelectDeleteFavItem={onSelectDeleteFavItem}
                                onSelectBuy={onSelectBuy}
                                onSelectDeleteItem={onSelectDeleteItem}
                            />
                        }
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/favorites"
                        element={
                            <Favorites
                                onSelectAddFavItem={onSelectAddFavItem}
                                onSelectDeleteFavItem={onSelectDeleteFavItem}
                                onSelectBuy={onSelectBuy}
                                onSelectDeleteItem={onSelectDeleteItem}
                            />
                        }
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
