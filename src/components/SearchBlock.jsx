import React from "react";
import { useSelector } from "react-redux";

import Card from "./Card";

const SearchBlock = ({ onSelectDeleteItem, onSelectBuy }) => {
    const { gamesForSearch, searchedStr } = useSelector((state) => state.games);

    const searched = gamesForSearch.filter((item) =>
        item.name.toLowerCase().includes(searchedStr.toLowerCase())
    );

    return (
        <div className="searchBlock">
            <h2 className="searchBlock__title">
                Результаты поиска: {searched.length}
            </h2>
            <div className="searchBlock__items">
                {searched.map((item) => {
                    return (
                        <Card
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
