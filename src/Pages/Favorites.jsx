import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "../components";
import CardLoadingBlock from "../loadingComponents/CardLoadingBlock";
import {
    getFavItems,
    favoritesSelector,
} from "../redux/sliceces/favoritesSlice";

const Favorites = () => {
    const dispatch = useDispatch();

    const { favorites, isLoading } = useSelector(favoritesSelector);

    useEffect(() => {
        dispatch(getFavItems());
    }, []);

    return (
        <div className="favorites _container">
            <h1 className="favorites__title">Избранное:</h1>
            <div className="favorites__items items-content">
                {!isLoading
                    ? favorites.map((item) => {
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
