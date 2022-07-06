import { useEffect, useState, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import {
    Card,
    Categories,
    SortPopup,
    CarouselItem,
    Carousel,
    SearchGames,
    Pagination,
} from "../components";
import CardLoadingBlock from "../loadingComponents/CardLoadingBlock";
import { fetchGames, gamesSelector } from "../redux/sliceces/games/gamesSlice";
import {
    selectCategory,
    selectPopup,
    filtersSelector,
} from "../redux/sliceces/filters/filtersSlice";
import { useAppDispatch } from "../redux/store";
import { typeOfSort } from "../redux/sliceces/filters/type";

import { favoritesItemsSelector } from "../redux/sliceces/favorites/favoritesSlice";

type GameForSlider = {
    id: number;
    type: string;
    name: string;
    price: number;
    rating: number;
    imageUrl: string;
    bigImageUrl: string;
};

const categories = [
    { name: "Все", type: null },
    { name: "новинки", type: "new" },
    { name: "хорроры", type: "horror" },
    { name: "шутеры", type: "shoter" },
    { name: "открытый мир", type: "world" },
];

const popup: typeOfSort[] = [
    { name: "Цене", type: "price" },
    { name: "Популярности", type: "rating" },
    { name: "Алфавиту", type: "name" },
];

const gamesForSlider: GameForSlider[] = [
    {
        id: 7,
        imageUrl: "card/CoreKeeper.jpg",
        bigImageUrl: "bigCard/CoreKeeper.jpg",
        name: "Core Keeper",
        price: 449,
        type: "world",
        rating: 5,
    },
    {
        id: 5,
        imageUrl: "card/ResidentEvil2.jpg",
        bigImageUrl: "bigCard/ResidentEvil2.jpg",
        name: "Resident Evil 2",
        price: 999,
        type: "world",
        rating: 7,
    },
    {
        id: 3,
        imageUrl: "card/hitman.jpg",
        bigImageUrl: "bigCard/hitman.jpg",
        name: "Hitman",
        price: 999,
        type: "shoter",
        rating: 3,
    },
    {
        id: 6,
        imageUrl: "card/overlord.jpg",
        bigImageUrl: "bigCard/overlord.jpg",
        name: "Stellaris: Overlord",
        price: 1200,
        type: "world",
        rating: 8,
    },
];

const Home: React.FC = () => {
    const [visibleSearch, setVisibleSearch] = useState(false);

    const dispatch = useAppDispatch();

    const { games, isLoading, paginateCount } = useSelector(gamesSelector);

    const favorites = useSelector(favoritesItemsSelector);

    const { category, sortBy } = useSelector(filtersSelector);

    useEffect(() => {
        dispatch(fetchGames({ category, sortBy }));
    }, [category, sortBy, paginateCount]);

    const onSelectCategory = useCallback((type: string | null) => {
        dispatch(selectCategory(type));
    }, []);

    const onSelectPopup = useCallback((type: typeOfSort) => {
        dispatch(selectPopup(type));
    }, []);

    return (
        <>
            <SearchGames
                visibleSearch={visibleSearch}
                setVisibleSearch={setVisibleSearch}
            />

            <Carousel visibleSearch={visibleSearch}>
                {gamesForSlider.map((item) => {
                    return (
                        <CarouselItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            bigImageUrl={item.bigImageUrl}
                        />
                    );
                })}
            </Carousel>

            <div className="content__filters">
                <Categories
                    categories={categories}
                    onSelectCategory={onSelectCategory}
                    activeCategory={category}
                />
                <SortPopup
                    items={popup}
                    sortBy={sortBy}
                    onSelectPopup={onSelectPopup}
                />
            </div>
            <div className="content__items items-content">
                {!isLoading
                    ? games.map((item) => {
                          const favoritesAdded =
                              favorites.findIndex((fav) => fav.id === item.id) >
                              -1;
                          return (
                              <Card
                                  id={item.id}
                                  key={item.id}
                                  name={item.name}
                                  price={item.price}
                                  imageUrl={item.imageUrl}
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
            {!games.length && (
                <h1 className="content__items-clear">Пусто...</h1>
            )}

            <Pagination activePage={paginateCount} gamesOnPage={4} />
        </>
    );
};

export default memo(Home);
