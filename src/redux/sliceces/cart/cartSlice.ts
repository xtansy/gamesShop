import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ICart, CartItem } from "./types";

const initialState: ICart = {
    cart: [],
    totalPrice: 0,
    totalCount: 0,
};

const findCartItemIndex = (index: number, cart: CartItem[]) => {
    return cart.findIndex((item) => item.id === index);
};

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.cart.push(action.payload);
            state.totalPrice += action.payload.price;
            state.totalCount++;
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            const index = findCartItemIndex(action.payload, state.cart);

            state.totalPrice -=
                state.cart[index].count * state.cart[index].price;

            state.totalCount -= state.cart[index].count;

            state.cart = state.cart.filter(
                (item) => item.id !== action.payload
            );
        },

        plusItemCount: (state, action: PayloadAction<number>) => {
            const index = findCartItemIndex(action.payload, state.cart);
            state.cart[index].count++;
            state.totalPrice += state.cart[index].price;
            state.totalCount++;
        },

        minusItemCount: (state, action: PayloadAction<number>) => {
            const index = findCartItemIndex(action.payload, state.cart);
            if (state.cart[index].count === 1) return;
            state.cart[index].count--;
            state.totalPrice -= state.cart[index].price;
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

const cartSelector = (state: RootState) => state.cart;
const cartItemsSelector = (state: RootState) => state.cart.cart;

const { reducer, actions } = cart;
export default reducer;
export const { addItem, deleteItem, plusItemCount, minusItemCount } = actions;

export { cartSelector, cartItemsSelector };
