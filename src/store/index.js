import { configureStore } from "@reduxjs/toolkit";
import games from "../sliceces/gamesSlice";
import filters from "../sliceces/filtersSlice";
import cart from "../sliceces/cartSlice";
import favorites from "../sliceces/favoritesSlice";

const store = configureStore({
    reducer: { games, filters, cart, favorites },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});
window.store = store;
export default store;
