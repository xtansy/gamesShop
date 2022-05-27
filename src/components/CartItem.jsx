import React from "react";
import deleteItemPng from "../assets/deleteCart.png";

const CartItem = ({ id, name, imageUrl, price, onSelectDeleteItem }) => {
    const onClickDeleteItem = () => {
        onSelectDeleteItem(id, price);
    };

    return (
        <>
            <div className="cart__item">
                <div className="cart__item-info">
                    <img
                        width={120}
                        className="cart__item-img"
                        src={imageUrl}
                        alt="img"
                    />
                    <div className="cart__item-text">
                        <h3>{name}</h3>
                        <p>{price} Р</p>
                    </div>
                </div>
                <img
                    onClick={onClickDeleteItem}
                    className="cart__item-delete"
                    width={64}
                    src={deleteItemPng}
                    alt="img"
                />
            </div>
            <hr />
        </>
    );
};

export default CartItem;
