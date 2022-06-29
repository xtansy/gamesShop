import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { FavoriteItem, IFavorites } from "./types";

const initialState: IFavorites = {
    isLoading: true,
    favorites: [],
};

export const getFavItems = createAsyncThunk<FavoriteItem[]>(
    "favorites/getItems",
    async () => {
        const { data } = await axios.get<FavoriteItem[]>("/favorites");
        return data;
    }
);

export const postFavItem = createAsyncThunk<FavoriteItem, FavoriteItem>(
    "favorites/postItem",
    async (action) => {
        const { data } = await axios.post<FavoriteItem>("/favorites", action);
        return data;
    }
);

export const deleteFavItem = createAsyncThunk<number, number>(
    "favorites/deleteFavItem",
    async (action) => {
        await axios.delete(`/favorites/${action}`);
        return action;
    }
);

const favorites = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavItems.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(
                getFavItems.fulfilled,
                (state, action: PayloadAction<FavoriteItem[]>) => {
                    state.isLoading = false;
                    state.favorites = action.payload;
                }
            )

            .addCase(
                postFavItem.fulfilled,
                (state, action: PayloadAction<FavoriteItem>) => {
                    state.favorites.push(action.payload);
                }
            )

            .addCase(
                deleteFavItem.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.favorites = state.favorites.filter(
                        (item) => item.id !== action.payload
                    );
                }
            );
    },
});

const favoritesSelector = (state: RootState) => state.favorites;
const favoritesItemsSelector = (state: RootState) => state.favorites.favorites;

const { reducer } = favorites;
export default reducer;

export { favoritesItemsSelector, favoritesSelector };
