import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import CarouselItem from "../components/CarouselItem";
import Carousel from "../components/Carousel";
import SearchGames from "../components/SearchGames";
import Pagination from "../components/Pagination";

import { fetchGames, changePaginateCount } from "../sliceces/gamesSlice";
import { selectCategory, selectPopup } from "../sliceces/filtersSlice";
import { addItem, deleteItem } from "../sliceces/cartSlice";

import { postItem } from "../sliceces/favoritesSlice";

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
const gamesForSlider = [
    {
        id: 6,
        imageUrl: "card/CoreKeeper.jpg",
        bigImageUrl: "bigCard/CoreKeeper.jpg",
        name: "Core Keeper",
        price: 449,
        type: "world",
        rating: 5,
    },
    {
        id: 4,
        imageUrl: "card/ResidentEvil2.jpg",
        bigImageUrl: "bigCard/ResidentEvil2.jpg",
        name: "Resident Evil 2",
        price: 999,
        type: "world",
        rating: 7,
    },
    {
        id: 2,
        imageUrl: "card/hitman.jpg",
        bigImageUrl: "bigCard/hitman.jpg",
        name: "Hitman",
        price: 999,
        type: "shoter",
        rating: 3,
    },
    {
        id: 5,
        imageUrl: "card/overlord.jpg",
        bigImageUrl: "bigCard/overlord.jpg",
        name: "Stellaris: Overlord",
        price: 1200,
        type: "world",
        rating: 8,
    },
];

const Home = () => {
    const dispatch = useDispatch();

    const { games, isLoading, paginateCount } = useSelector(
        (state) => state.games
    );

    const { category, sortBy } = useSelector((state) => state.filters);

    useEffect(() => {
        dispatch(fetchGames({ category, sortBy }));
    }, [category, sortBy, paginateCount]);

    const onSelectCategory = (type) => {
        dispatch(selectCategory(type));
    };

    const onSelectPopup = (type) => {
        dispatch(selectPopup(type));
    };

    const onSelectBuy = useCallback((item) => {
        dispatch(addItem(item));
    }, []);

    const onSelectDeleteItem = useCallback((id, price) => {
        dispatch(deleteItem({ id, price }));
    }, []);

    return (
        <>
            <SearchGames
                onSelectDeleteItem={onSelectDeleteItem}
                onSelectBuy={onSelectBuy}
            />

            <Carousel>
                {!isLoading ? (
                    gamesForSlider.map((item) => {
                        return (
                            <CarouselItem
                                key={item.id}
                                id={item.id}
                                onSelectBuy={onSelectBuy}
                                onSelectDeleteItem={onSelectDeleteItem}
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
            <div className="content__items items-content">
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
            {!games.length && (
                <h1 className="content__items-clear">Пусто...</h1>
            )}

            <Pagination activePage={paginateCount} gamesOnPage={4} />
        </>
    );
};

export default Home;
