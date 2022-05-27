import { configureStore } from "@reduxjs/toolkit";
import games from "../sliceces/gamesSlice";
import filters from "../sliceces/filtersSlice";
import cart from "../sliceces/cartSlice";

const store = configureStore({
    reducer: { games, filters, cart },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});
window.store = store;
export default store;
