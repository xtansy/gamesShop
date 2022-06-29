import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "./";
import { addItem, deleteItem } from "../redux/sliceces/cart/cartSlice";
import { CartItem } from "../redux/sliceces/cart/types";

type CarouselItemProps = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    bigImageUrl: string;
};

const CarouselItem: React.FC<CarouselItemProps> = ({
    id,
    name,
    price,
    imageUrl,
    bigImageUrl,
}) => {
    const dispatch = useDispatch();

    const onClickBuy = () => {
        const item: CartItem = { id, name, imageUrl, price, count: 1 };

        dispatch(addItem(item));
    };
    const onClickDeleteItem = () => {
        dispatch(deleteItem(id));
    };

    return (
        <div className="item">
            <div className="item__descr">
                <h1>{name}</h1>

                <Button
                    slider
                    id={id}
                    onAdd={onClickBuy}
                    onDelete={onClickDeleteItem}
                />

                <span>{price} Р</span>
            </div>
            <img src={bigImageUrl} alt="img"></img>
        </div>
    );
};

export default CarouselItem;
