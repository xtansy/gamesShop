import React from "react";
import like from "../assets/like.png";
import { useSelector, useDispatch } from "react-redux";

import { Button, CartCount } from "./";
import {
    favoritesItemsSelector,
    postFavItem,
    deleteFavItem,
} from "../redux/sliceces/favoritesSlice";
import { addItem, deleteItem } from "../redux/sliceces/cartSlice";

const Card = ({ name, price, imageUrl, id }) => {
    const dispatch = useDispatch();

    const favorites = useSelector(favoritesItemsSelector);
    const favoritesAdded = favorites.findIndex((item) => item.id === id) > -1;

    const onClickBuy = () => {
        dispatch(addItem({ id, name, imageUrl, price }));
    };

    const onClickDeleteItem = () => {
        dispatch(deleteItem({ id, price }));
    };

    const onClickAddFavItem = () => {
        dispatch(postFavItem({ id, name, imageUrl, price }));
    };

    const onClickDeleteFavItem = () => {
        dispatch(deleteFavItem(id));
    };

    return (
        <div className="card">
            <img src={imageUrl} alt="1" />

            <Button id={id} onAdd={onClickBuy} onDelete={onClickDeleteItem} />

            <img
                onClick={
                    favoritesAdded ? onClickDeleteFavItem : onClickAddFavItem
                }
                className={`card__like ${
                    favoritesAdded && "card__like_active"
                }`}
                width={36}
                src={like}
                alt="like"
            />
            <div className="cart__descr">
                <div className="card__info">
                    <p className="card__name">{name}</p>
                    <p className="card__price">{price} P</p>
                </div>
                <CartCount id={id} />
            </div>
        </div>
    );
};

export default Card;
