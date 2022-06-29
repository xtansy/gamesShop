import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { IFilter, typeOfSort } from "./type";

const initialState: IFilter = {
    category: null,
    sortBy: {
        type: { name: "Популярности", type: "rating" },
        order: "desc",
    },
};

const filters = createSlice({
    name: "filters",
    initialState,
    reducers: {
        selectCategory: (state, action: PayloadAction<string | null>) => {
            state.category = action.payload;
        },
        selectPopup: (state, action: PayloadAction<typeOfSort>) => {
            state.sortBy.type = action.payload;
        },
    },
});

const { actions, reducer } = filters;

const filtersSelector = (state: RootState) => state.filters;

export default reducer;
export const { selectCategory, selectPopup } = actions;

export { filtersSelector };
