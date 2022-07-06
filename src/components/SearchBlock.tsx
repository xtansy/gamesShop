import { memo } from "react";
import { useSelector } from "react-redux";
import close from "../assets/deleteCart.png";

import { Card } from ".";
import { gamesSelector } from "../redux/sliceces/games/gamesSlice";
import { favoritesItemsSelector } from "../redux/sliceces/favorites/favoritesSlice";

type SearchBlockProps = {
    onClickClose: () => void;
};

const SearchBlock: React.FC<SearchBlockProps> = ({ onClickClose }) => {
    const { allGames, searchedStr } = useSelector(gamesSelector);
    const favorites = useSelector(favoritesItemsSelector);

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
                    const favoritesAdded =
                        favorites.findIndex((fav) => fav.id === item.id) > -1;
                    return (
                        <Card
                            favoritesAdded={favoritesAdded}
                            key={item.id}
                            {...item}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default memo(SearchBlock);
