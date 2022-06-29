import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import games from "../sliceces/games/gamesSlice";
import filters from "../sliceces/filters/filtersSlice";
import cart from "../sliceces/cart/cartSlice";
import favorites from "../sliceces/favorites/favoritesSlice";

const store = configureStore({
    reducer: { games, filters, cart, favorites },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type State = typeof store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
