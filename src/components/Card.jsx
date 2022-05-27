import React from "react";
import like from "../assets/like.png";
import { useSelector } from "react-redux";

const Card = ({
    name,
    price,
    imageUrl,
    id,
    onSelectBuy,
    onSelectDeleteItem,
}) => {
    const addedGames = useSelector((state) => state.cart.cart);

    const isAdded = addedGames.findIndex((item) => item.id === id) > -1;

    const onClickBuy = () => {
        onSelectBuy({ id, name, imageUrl, price });
    };

    const onClickDeleteItem = () => {
        onSelectDeleteItem(id, price);
    };

    return (
        <div className="card">
            <img src={imageUrl} alt="1" />

            {!isAdded ? (
                <button onClick={onClickBuy} className="button card__button">
                    В корзину
                </button>
            ) : (
                <button
                    onClick={onClickDeleteItem}
                    className="button card__button card__button_delete"
                >
                    Удалить из корзины
                </button>
            )}

            <img className="card__like" width={36} src={like} alt="like" />

            <p className="card__name">{name}</p>
            <p className="card__price">{price} P</p>
        </div>
    );
};

export default Card;
