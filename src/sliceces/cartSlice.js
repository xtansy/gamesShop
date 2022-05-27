import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: [],
    totalPrice: 0,
    totalCount: 0,
};

// export const postItem = createAsyncThunk("cart/postItem", async (action) => {
//     const { data } = await axios.post("http://localhost:3001/cart", action);
//     return data;
// });

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.cart.push(action.payload);
            state.totalPrice += action.payload.price;
            state.totalCount++;
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
            state.totalPrice -= action.payload.price;
            state.totalCount--;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(postItem.pending, (state) => {})
    //         .addCase(postItem.fulfilled, (state, action) => {
    //             state.cart.push(action.payload);
    //         })
    //         .addCase(postItem.rejected, (state) => {});
    // },
});

const { reducer, actions } = cart;
export default reducer;
export const { addItem, deleteItem } = actions;
