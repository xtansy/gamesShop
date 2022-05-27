import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import CarouselItem from "../components/CarouselItem";
import Carousel from "../components/Carousel";

import { fetchGames } from "../sliceces/gamesSlice";
import { selectCategory, selectPopup } from "../sliceces/filtersSlice";
import { addItem, deleteItem } from "../sliceces/cartSlice";

const categories = [
    { name: "Все", type: null },
    { name: "новинки", type: "new" },
    { name: "хорроры", type: "horror" },
    { name: "шутеры", type: "shoter" },
    { name: "открытый мир", type: "world" },
];

const popup = [
    { name: "Цене", type: "price" },
    { name: "Популярности", type: "rating" },
    { name: "Алфавиту", type: "name" },
];

const Home = () => {
    const dispatch = useDispatch();

    const games = useSelector((state) => state.games.games);
    const isLoading = useSelector((state) => state.games.isLoading);

    const category = useSelector((state) => state.filters.category);
    const sortBy = useSelector((state) => state.filters.sortBy);

    useEffect(() => {
        dispatch(fetchGames({ category, sortBy }));
    }, [category, sortBy]);

    const onSelectCategory = (type) => {
        dispatch(selectCategory(type));
    };

    const onSelectPopup = (type) => {
        dispatch(selectPopup(type));
    };

    const onSelectBuy = (item) => {
        dispatch(addItem(item));
    };

    const onSelectDeleteItem = (id, price) => {
        dispatch(deleteItem({ id, price }));
    };

    return (
        <>
            <Carousel>
                {!isLoading ? (
                    games
                        .filter((item) => item.bigImageUrl)
                        .map((item) => {
                            return (
                                <CarouselItem
                                    key={item.id}
                                    id={item.id}
                                    onSelectBuy={onSelectBuy}
                                    name={item.name}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    bigImageUrl={item.bigImageUrl}
                                />
                            );
                        })
                ) : (
                    <h1>Загрузка</h1>
                )}
            </Carousel>

            <div className="content__filters">
                <Categories
                    categories={categories}
                    onSelectCategory={onSelectCategory}
                    activeCategory={category}
                />
                <SortPopup
                    sortBy={sortBy}
                    onSelectPopup={onSelectPopup}
                    items={popup}
                />
            </div>
            <div className="content__items">
                {!isLoading ? (
                    games.map((item) => {
                        return (
                            <Card
                                onSelectDeleteItem={onSelectDeleteItem}
                                onSelectBuy={onSelectBuy}
                                key={item.id}
                                name={item.name}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                id={item.id}
                            />
                        );
                    })
                ) : (
                    <h1>Загрузка</h1>
                )}
            </div>
        </>
    );
};

export default Home;
