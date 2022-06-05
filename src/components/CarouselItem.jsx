import React from "react";
import { Button } from "./";

const CarouselItem = ({
    id,
    name,
    price,
    imageUrl,
    bigImageUrl,
    onSelectBuy,
    onSelectDeleteItem,
}) => {
    const onClickBuy = () => {
        onSelectBuy({ id, name, price, imageUrl });
    };
    const onClickDeleteItem = () => {
        onSelectDeleteItem(id, price);
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
