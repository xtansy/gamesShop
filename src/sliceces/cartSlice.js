import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalPrice: 0,
    totalCount: 0,
};

const findCartItemIndex = (index, cart) => {
    return cart.findIndex((item) => item.id === index);
};

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            action.payload.count = 1;
            state.cart.push(action.payload);
            state.totalPrice += action.payload.price;
            state.totalCount++;
        },
        deleteItem: (state, action) => {
            const index = findCartItemIndex(action.payload.id, state.cart);

            state.totalPrice -=
                state.cart[index].count * state.cart[index].price;

            state.totalCount -= state.cart[index].count;

            state.cart = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
        },

        plusItemCount: (state, action) => {
            const index = findCartItemIndex(action.payload, state.cart);
            state.cart[index].count++;
            state.totalPrice += state.cart[index].price;
            state.totalCount++;
        },

        MinusItemCount: (state, action) => {
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

const { reducer, actions } = cart;
export default reducer;
export const { addItem, deleteItem, plusItemCount, MinusItemCount } = actions;
