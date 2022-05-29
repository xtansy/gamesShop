import React from "react";
import like from "../assets/like.png";
import Button from "./Button";

const Card = ({
    name,
    price,
    imageUrl,
    id,
    onSelectBuy,
    onSelectDeleteItem,
}) => {
    const onClickBuy = () => {
        onSelectBuy({ id, name, imageUrl, price });
    };

    const onClickDeleteItem = () => {
        onSelectDeleteItem(id, price);
    };

    return (
        <div className="card">
            <img src={imageUrl} alt="1" />

            <Button id={id} onAdd={onClickBuy} onDelete={onClickDeleteItem} />

            <img className="card__like" width={36} src={like} alt="like" />

            <p className="card__name">{name}</p>
            <p className="card__price">{price} P</p>
        </div>
    );
};

export default Card;
