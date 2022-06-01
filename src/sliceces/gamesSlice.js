import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    games: [],
    gamesForSlider: [],
    gamesForSearch: [],
    searchedStr: "",
    isLoading: false,
    paginateCount: 1,
};
export const fetchGames = createAsyncThunk(
    "games/fetchGames",
    async (action, state) => {
        const { category, sortBy } = action;

        const categoryParams = `${category ? `type=${category}` : ""}`;

        const sortByParams = `${
            sortBy.type ? `&_sort=${sortBy.type.type}` : ""
        }&_order=${sortBy.order}`;

        const paginationParams = `&_page=${
            state.getState().games.paginateCount
        }&_limit=4`;

        const { data } = await axios.get(
            `http://localhost:3001/games?${
                categoryParams + sortByParams + paginationParams
            }`
        );
        return data;
    }
);

const games = createSlice({
    name: "games",
    initialState,
    reducers: {
        changeSearchedStr: (state, action) => {
            if (action.payload.length === 0) {
                state.searchedStr = "";
                return;
            }
            state.searchedStr = action.payload;
        },
        changePaginateCount: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.games = action.payload;
                !state.gamesForSlider.length &&
                    (state.gamesForSlider = action.payload.filter(
                        (item) => item.bigImageUrl
                    ));
                !state.gamesForSearch.length &&
                    (state.gamesForSearch = action.payload);

                state.isLoading = false;
            })
            .addCase(fetchGames.rejected, (state) => {
                state.isLoading = true;
            });
    },
});

const { actions, reducer } = games;

export default reducer;
export const { changeSearchedStr } = actions;
