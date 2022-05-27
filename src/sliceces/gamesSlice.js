import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    games: [],
    isLoading: false,
};
export const fetchGames = createAsyncThunk(
    "games/fetchGames",
    async (action) => {
        const { category, sortBy } = action;

        const categoryParams = `${category ? `type=${category}` : ""}`;

        const sortByParams = `${
            sortBy.type ? `&_sort=${sortBy.type.type}` : ""
        }&_order=${sortBy.order}`;

        const { data } = await axios.get(
            `http://localhost:3001/games?${categoryParams + sortByParams}`
        );
        return data;
    }
);

const games = createSlice({
    name: "games",
    initialState,
    reducers: {
        changeLoading: (state) => {
            state.isLoading = !state.loading;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.isLoading = false;
                state.games = action.payload;
            })
            .addCase(fetchGames.rejected, (state) => {
                state.isLoading = true;
            });
    },
});

const { actions, reducer } = games;

export default reducer;
export const { changeLoading } = actions;
