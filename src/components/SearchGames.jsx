import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { SearchBlock } from "./";
import { changeSearchedStr } from "../redux/sliceces/gamesSlice";
import lupa from "../assets/lupa.png";

const SearchGames = () => {
    const dispatch = useDispatch();

    const searchRef = useRef();
    const searchBlockRef = useRef();

    const [visible, setVisible] = useState(false);

    const onClickSearch = () => {
        document.body.style.overflow = "hidden";
        setVisible(true);
    };

    const onChangeInput = (e) => {
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

    const handleOutsideClick = (e) => {
        if (
            !e.path.includes(searchBlockRef.current) &&
            !e.path.includes(searchRef.current)
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
                style={{ width: visible && "43%" }}
                ref={searchRef}
                onClick={onClickSearch}
                className="search"
            >
                {!visible && <img src={lupa} width={40} alt="img" />}
                <input
                    style={{ opacity: visible && 0.6 }}
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
