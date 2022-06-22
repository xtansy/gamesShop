import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "./";
import { addItem, deleteItem } from "../redux/sliceces/cartSlice";

const CarouselItem = ({ id, name, price, imageUrl, bigImageUrl }) => {
    const dispatch = useDispatch();

    const onClickBuy = () => {
        dispatch(addItem({ id, name, price, imageUrl }));
    };
    const onClickDeleteItem = () => {
        dispatch(deleteItem({ id, price }));
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

export default React.memo(CarouselItem);
