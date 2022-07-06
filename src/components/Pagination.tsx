import { useSelector, useDispatch } from "react-redux";
import { memo } from "react";

import {
    changePaginateCount,
    allGamesSelector,
} from "../redux/sliceces/games/gamesSlice";

type PaginationProps = {
    activePage: number;
    gamesOnPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ activePage, gamesOnPage }) => {
    const dispatch = useDispatch();

    const allGames = useSelector(allGamesSelector);

    const pagesLength = Math.ceil(allGames.length / gamesOnPage);

    const onClickPaginationLi = (index: number) => {
        dispatch(changePaginateCount(index));
    };

    return (
        <ul className="pagination">
            {allGames.map((_, i: number) => {
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

export default memo(Pagination);
