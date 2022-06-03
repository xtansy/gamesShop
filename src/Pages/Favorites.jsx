import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../sliceces/favoritesSlice";
import Card from "../components/Card";

const Favorites = () => {
    const dispatch = useDispatch();

    const { favorites, isLoading } = useSelector((state) => state.favorites);

    useEffect(() => {
        dispatch(getItems());
    }, []);

    return (
        <div className="favorites _container">
            <h1 className="favorites__title">Избранное:</h1>
            <div className="favorites__items items-content">
                {}

                {!isLoading ? (
                    favorites.map((item) => {
                        return (
                            <Card
                                name={item.name}
                                key={item.id}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                id={item.id}
                            />
                        );
                    })
                ) : (
                    <h1>Загрузка</h1>
                )}
            </div>
        </div>
    );
};

export default Favorites;
