import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    plusItemCount,
    MinusItemCount,
    cartItemsSelector,
} from "../redux/sliceces/cartSlice";

const CartCount = ({ id }) => {
    const dispatch = useDispatch();

    const cart = useSelector(cartItemsSelector);

    const cartItemIndex = cart.findIndex((item) => item.id === id);

    const onClickPlusCartItem = () => {
        dispatch(plusItemCount(id));
    };

    const onClickMinusCartItem = () => {
        dispatch(MinusItemCount(id));
    };

    return (
        <>
            {cartItemIndex > -1 && (
                <div className="card__cartcount">
                    <div
                        onClick={onClickPlusCartItem}
                        className="card__cartcount-plus"
                    >
                        +
                    </div>
                    <div className="card__cartcount-count">
                        {cart[cartItemIndex].count}
                    </div>
                    <div
                        onClick={onClickMinusCartItem}
                        className="card__cartcount-minus"
                    >
                        -
                    </div>
                </div>
            )}
        </>
    );
};

export default CartCount;
