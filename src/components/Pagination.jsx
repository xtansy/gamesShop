import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePaginateCount } from "../sliceces/gamesSlice";

const Pagination = ({ activePage, gamesOnPage }) => {
    const dispatch = useDispatch();

    const { allGames, games } = useSelector((state) => state.games);

    const pagesLength = Math.ceil(allGames.length / gamesOnPage);

    const onClickPaginationLi = (index) => {
        dispatch(changePaginateCount(index));
    };

    return (
        <ul className="pagination">
            {allGames.map((_, i) => {
                if (i < pagesLength) {
                    return (
                        <li
                            onClick={() => onClickPaginationLi(i + 1)}
                            key={i}
                            className={`pagination__li ${
                                activePage === i + 1 && "pagination__li_active"
                            }`}
                        >
                            {i + 1}
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default Pagination;
