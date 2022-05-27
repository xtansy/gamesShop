import React from "react";

const CarouselItem = ({
    id,
    name,
    price,
    imageUrl,
    bigImageUrl,
    onSelectBuy,
}) => {
    const onClickBuy = () => {
        onSelectBuy({ id, name, price, imageUrl });
    };

    return (
        <div className="item">
            <div className="item__descr">
                <h1>{name}</h1>
                <button onClick={onClickBuy}>В корзину</button>
                <span>{price} Р</span>
            </div>
            <img src={bigImageUrl} alt="img"></img>
        </div>
    );
};

export default CarouselItem;
