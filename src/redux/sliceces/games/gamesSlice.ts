import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IGames, Game } from "./types";
import { RootState } from "../../store";
import { IFilter } from "../filters/type";

const initialState: IGames = {
    games: [],
    allGames: [],
    searchedStr: "",
    isLoading: false,
    paginateCount: 1,
};
type fetchGamesResult = {
    filteredGames: Game[];
    allGames?: Game[];
};

export const fetchGames = createAsyncThunk<
    fetchGamesResult,
    IFilter,
    {
        state: RootState;
    }
>("games/fetchGames", async (action, state) => {
    const { category, sortBy } = action;

    const categoryParams = `${category ? `type=${category}` : ""}`;

    const sortByParams = `${
        sortBy.type ? `&_sort=${sortBy.type.type}` : ""
    }&_order=${sortBy.order}`;

    const paginationParams = `&_page=${
        state.getState().games.paginateCount
    }&_limit=4`;

    if (!state.getState().games.allGames.length) {
        const { data: allGames } = await axios.get(`/games`);

        const { data: filteredGames } = await axios.get(
            `/games?${categoryParams + sortByParams + paginationParams}`
        );

        return { allGames, filteredGames };
    }

    const { data: filteredGames } = await axios.get(
        `/games?${categoryParams + sortByParams + paginationParams}`
    );
    return { filteredGames };
});

const games = createSlice({
    name: "games",
    initialState,
    reducers: {
        changeSearchedStr: (state, action: PayloadAction<string>) => {
            if (action.payload.length === 0) {
                state.searchedStr = "";
                return;
            }
            state.searchedStr = action.payload;
        },
        changePaginateCount: (state, action: PayloadAction<number>) => {
            state.paginateCount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.games = action.payload.filteredGames;

                if (action.payload.allGames !== undefined) {
                    state.allGames = action.payload.allGames;
                }

                state.isLoading = false;
            })
            .addCase(fetchGames.rejected, (state) => {
                state.isLoading = true;
            });
    },
});

const allGamesSelector = (state: RootState) => state.games.allGames;
const gamesSelector = (state: RootState) => state.games;

const { actions, reducer } = games;

export default reducer;
export const { changeSearchedStr, changePaginateCount } = actions;

export { allGamesSelector, gamesSelector };
