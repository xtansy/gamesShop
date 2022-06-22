import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        selectCategory: (state, action) => {
            state.category = action.payload;
        },
        selectPopup: (state, action) => {
            state.sortBy.type = action.payload;
        },
    },
});

const { actions, reducer } = filters;

const filtersSelector = (state) => state.filters;

export default reducer;
export const { selectCategory, selectPopup } = actions;

export { filtersSelector };
