import { useState, useCallback, useRef, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { SearchBlock } from "./";
import { changeSearchedStr } from "../redux/sliceces/games/gamesSlice";
import lupa from "../assets/lupa.png";

type SearchClick = MouseEvent & {
    path: Node[];
};

const SearchGames = () => {
    const dispatch = useDispatch();

    const searchRef = useRef<HTMLDivElement>(null);
    const searchBlockRef = useRef<HTMLDivElement>(null);

    const [visible, setVisible] = useState(false);

    const onClickSearch = () => {
        document.body.style.overflow = "hidden";
        setVisible(true);
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
        setVisible(false);
        document.body.style.overflow = "auto";
    };

    const handleOutsideClick = (e: MouseEvent) => {
        const _e = e as SearchClick;
        if (
            searchBlockRef.current &&
            searchRef.current &&
            !_e.path.includes(searchBlockRef.current) &&
            !_e.path.includes(searchRef.current)
        ) {
            setVisible(false);
            document.body.style.overflow = "auto";
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
                style={{ width: visible ? "43%" : "43%" }}
                ref={searchRef}
                onClick={onClickSearch}
                className="search"
            >
                {!visible && <img src={lupa} width={40} alt="img" />}
                <input
                    style={{ opacity: visible ? 0.6 : 0.6 }}
                    onChange={onChangeInput}
                    type="text"
                    placeholder="Поиск..."
                />
            </div>
            <div ref={searchBlockRef}>
                {visible && <SearchBlock onClickClose={onClickClose} />}
            </div>
        </>
    );
};

export default SearchGames;
