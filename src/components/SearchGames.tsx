import { useCallback, useRef, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { SearchBlock } from "./";
import { changeSearchedStr } from "../redux/sliceces/games/gamesSlice";
import lupa from "../assets/lupa.png";

type SearchClick = MouseEvent & {
    path: Node[];
};

type SearchGamesProps = {
    visibleSearch: boolean;
    setVisibleSearch: (state: boolean) => void;
};

const SearchGames: React.FC<SearchGamesProps> = ({
    visibleSearch,
    setVisibleSearch,
}) => {
    const dispatch = useDispatch();

    const searchRef = useRef<HTMLDivElement>(null);
    const searchBlockRef = useRef<HTMLDivElement>(null);

    const onClickSearch = () => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "17px"; // чтобы не было отступа от полосы прокрутки
        setVisibleSearch(true);
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        onUpdateFilter(e.target.value);
    };

    const onUpdateFilter = useCallback(
        debounce((str) => {
            dispatch(changeSearchedStr(str));
        }, 1000),
        []
    );

    const onClickClose = () => {
        setVisibleSearch(false);
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";
    };

    const handleOutsideClick = (e: MouseEvent) => {
        const _e = e as SearchClick;
        if (
            searchBlockRef.current &&
            searchRef.current &&
            !_e.path.includes(searchBlockRef.current) &&
            !_e.path.includes(searchRef.current)
        ) {
            onClickClose();
        }
    };
    useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <>
            <div
                // style={{ width: visible ? "43%" : "43%" }}
                style={{ width: "43%" }}
                ref={searchRef}
                onClick={onClickSearch}
                className="search"
            >
                {!visibleSearch && <img src={lupa} width={40} alt="img" />}
                <input
                    // style={{ opacity: visible ? 0.6 : 0.6 }}
                    style={{ opacity: 0.6 }}
                    onChange={onChangeInput}
                    type="text"
                    placeholder="Поиск..."
                />
            </div>
            <div ref={searchBlockRef}>
                {visibleSearch && <SearchBlock onClickClose={onClickClose} />}
            </div>
        </>
    );
};

export default SearchGames;
