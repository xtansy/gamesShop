import React, { useState } from "react";

import left from "../assets/left-arrow.png";
import right from "../assets/right-arrow.png";

const Carousel = ({ children }) => {
    const [offset, setOffset] = useState(0);

    const [count, setCount] = useState(0);

    const onClickLeft = () => {
        if (count === 0) {
            setCount(children.length - 1);
            setOffset(
                -document.documentElement.clientWidth * (children.length - 1)
            );
        } else {
            setCount(count - 1);
            setOffset(offset + document.documentElement.clientWidth);
        }
    };

    const onClickRight = () => {
        if (count === children.length - 1) {
            setCount(0);
            setOffset(0);
        } else {
            setCount(count + 1);
            setOffset(offset - document.documentElement.clientWidth);
        }
    };

    return (
        <div className="main-container">
            <img
                onClick={onClickLeft}
                className="arrow arrow-left"
                src={left}
                width={45}
                alt="left"
            />
            <div className="window">
                <div
                    style={{
                        transform: `translateX(${offset}px)`,
                    }}
                    className="all-pages-container"
                >
                    {children}
                </div>
            </div>
            <img
                onClick={onClickRight}
                className="arrow arrow-right"
                src={right}
                width={45}
                alt="left"
            />
        </div>
    );
};

export default React.memo(Carousel);
