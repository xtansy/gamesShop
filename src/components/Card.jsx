import React from "react";
import like from "../assets/like.png";
import { Button } from "./";
import { useSelector } from "react-redux";

const Card = ({
    name,
    price,
    imageUrl,
    id,
    onSelectBuy,
    onSelectDeleteItem,
    onSelectDeleteFavItem,
    onSelectAddFavItem,
}) => {
    const { favorites } = useSelector((state) => state.favorites);

    const added = favorites.findIndex((item) => item.id === id) > -1;

    const onClickBuy = () => {
        onSelectBuy({ id, name, imageUrl, price });
    };

    const onClickDeleteItem = () => {
        onSelectDeleteItem(id, price);
    };

    const onClickAddFavItem = () => {
        onSelectAddFavItem({ id, name, imageUrl, price });
    };

    const onClickDeleteFavItem = () => {
        onSelectDeleteFavItem(id);
    };

    return (
        <div className="card">
            <img src={imageUrl} alt="1" />

            <Button id={id} onAdd={onClickBuy} onDelete={onClickDeleteItem} />

            <img
                onClick={added ? onClickDeleteFavItem : onClickAddFavItem}
                className={`card__like ${added && "card__like_active"}`}
                width={36}
                src={like}
                alt="like"
            />

            <p className="card__name">{name}</p>
            <p className="card__price">{price} P</p>
        </div>
    );
};

export default Card;
