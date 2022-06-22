import React from "react";
import { useSelector } from "react-redux";
import close from "../assets/deleteCart.png";

import { Card } from "./";
import { gamesSelector } from "../redux/sliceces/gamesSlice";

const SearchBlock = ({
    onClickClose,
    onSelectDeleteItem,
    onSelectBuy,
    onSelectAddFavItem,
    onSelectDeleteFavItem,
}) => {
    const { allGames, searchedStr } = useSelector(gamesSelector);

    const searched = allGames.filter((item) =>
        item.name.toLowerCase().includes(searchedStr.toLowerCase())
    );

    return (
        <div className="searchBlock">
            <img
                onClick={onClickClose}
                className="searchBlock__close"
                src={close}
                alt="close"
            />
            <h2 className="searchBlock__title">
                Результаты поиска: {searched.length}
            </h2>
            <div className="searchBlock__items">
                {searched.map((item) => {
                    return (
                        <Card
                            onSelectAddFavItem={onSelectAddFavItem}
                            onSelectDeleteFavItem={onSelectDeleteFavItem}
                            onSelectDeleteItem={onSelectDeleteItem}
                            onSelectBuy={onSelectBuy}
                            key={item.id}
                            {...item}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SearchBlock;
