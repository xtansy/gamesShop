import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    favorites: [],
};

export const getItems = createAsyncThunk("favorites/getItems", async () => {
    const { data } = await axios.get("/favorites");
    return data;
});

export const postItem = createAsyncThunk(
    "favorites/postItem",
    async (action) => {
        const { data } = await axios.post("/favorites", action);
        return action;
    }
);

export const deleteFavItem = createAsyncThunk(
    "favorites/deleteFavItem",
    async (action) => {
        await axios.delete(`/favorites/${action}`);
        return action;
    }
);

const favorites = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addItem: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(postItem.pending, (state) => {})

            .addCase(postItem.fulfilled, (state, action) => {
                state.favorites.push(action.payload);
            })

            .addCase(getItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = action.payload;
            })

            .addCase(deleteFavItem.fulfilled, (state, action) => {
                state.favorites = state.favorites.filter(
                    (item) => item.id !== action.payload
                );
            });
    },
});

const { reducer, actions } = favorites;
export default reducer;
export const { addItem } = actions;