import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Card } from "../components";
import CardLoadingBlock from "../loadingComponents/CardLoadingBlock";
import {
    getFavItems,
    favoritesSelector,
} from "../redux/sliceces/favorites/favoritesSlice";
import { useAppDispatch } from "../redux/store";

const Favorites = () => {
    const dispatch = useAppDispatch();

    const { favorites, isLoading } = useSelector(favoritesSelector);

    useEffect(() => {
        dispatch(getFavItems());
    }, []);

    if (favorites.length === 0) {
        return (
            <div className="favorites _container">
                <h1 className="favorites__title">Избранное:</h1>

                <div className="favorites__empty empty">
                    <h2 className="favorites__empty-title empty__title">
                        Избранных товаров нет :(
                    </h2>
                    <img
                        width={250}
                        src="favoritesIcons/sadGamer.png"
                        alt="sadGamer"
                    />
                    <p className="favorites__empty-subtitle empty__subtitle">
                        Вы ничего не добавили в избранное
                    </p>
                    <Link style={{ textDecoration: "none" }} to="/">
                        <button className="button favorites__empty-button empty__button">
                            <img src="button/arrow-left.svg" alt="arrow-left" />
                            Вернуться назад
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites _container">
            <h1 className="favorites__title">Избранное:</h1>
            <div className="favorites__items items-content">
                {!isLoading
                    ? favorites.map((item) => {
                          const favoritesAdded =
                              favorites.findIndex((fav) => fav.id === item.id) >
                              -1;
                          return (
                              <Card
                                  name={item.name}
                                  key={item.id}
                                  imageUrl={item.imageUrl}
                                  price={item.price}
                                  id={item.id}
                                  favoritesAdded={favoritesAdded}
                              />
                          );
                      })
                    : Array(4)
                          .fill(0)
                          .map((_, index) => (
                              <CardLoadingBlock
                                  width={300}
                                  height={450}
                                  key={index}
                              />
                          ))}
            </div>
        </div>
    );
};

export default Favorites;
