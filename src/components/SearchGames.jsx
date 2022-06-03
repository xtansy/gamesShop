import React, { useState, useCallback, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import SearchBlock from "./SearchBlock";
import { changeSearchedStr } from "../sliceces/gamesSlice";
import { useDispatch } from "react-redux";

const SearchGames = ({
    onSelectDeleteItem,
    onSelectBuy,
    onSelectDeleteFavItem,
    onSelectAddFavItem,
}) => {
    const dispatch = useDispatch();

    const searchRef = useRef();
    const searchBlockRef = useRef();

    const [term, setTerm] = useState("");
    const [visible, setVisible] = useState(false);

    const onClickSearch = () => {
        document.body.style.overflow = "hidden";
        setVisible(true);
    };

    const onChangeInput = (e) => {
        setTerm(e.target.value);
        onUpdateFilter(e.target.value);
    };

    const onUpdateFilter = useCallback(
        debounce((str) => {
            dispatch(changeSearchedStr(str));
        }, 1000),
        []
    );

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
            <div ref={searchRef} onClick={onClickSearch} className="search">
                <input
                    onChange={onChangeInput}
                    type="text"
                    placeholder="Поиск..."
                />
                {/* <img src="" alt="img" /> */}
            </div>
            <div ref={searchBlockRef}>
                {visible && (
                    <SearchBlock
                        term={term}
                        onSelectBuy={onSelectBuy}
                        onSelectDeleteItem={onSelectDeleteItem}
                        onSelectDeleteFavItem={onSelectDeleteFavItem}
                        onSelectAddFavItem={onSelectAddFavItem}
                    />
                )}
            </div>
        </>
    );
};

export default SearchGames;
