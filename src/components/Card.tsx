import like from "../assets/like.png";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/store";
import {
    favoritesItemsSelector,
    postFavItem,
    deleteFavItem,
} from "../redux/sliceces/favorites/favoritesSlice";
import { Button, CartCount } from "./";
import { addItem, deleteItem } from "../redux/sliceces/cart/cartSlice";
import { CartItem } from "../redux/sliceces/cart/types";
import { FavoriteItem } from "../redux/sliceces/favorites/types";

type CardProps = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
};

const Card: React.FC<CardProps> = ({ name, price, imageUrl, id }) => {
    const dispatch = useAppDispatch();

    const favorites = useSelector(favoritesItemsSelector);
    const favoritesAdded = favorites.findIndex((item) => item.id === id) > -1;

    const onClickBuy = () => {
        const item: CartItem = { id, name, imageUrl, price, count: 1 };
        dispatch(addItem(item));
    };

    const onClickDeleteItem = () => {
        dispatch(deleteItem(id));
    };

    const onClickAddFavItem = () => {
        const item: FavoriteItem = { id, name, imageUrl, price, count: 1 };
        dispatch(postFavItem(item));
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
