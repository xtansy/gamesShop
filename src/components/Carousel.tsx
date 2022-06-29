import { memo, Children, ReactElement, useState } from "react";

import left from "../assets/left-arrow.png";
import right from "../assets/right-arrow.png";

type CarouselProps = {
    children: ReactElement[];
    visibleSearch: boolean;
};

const Carousel: React.FC<CarouselProps> = ({ children, visibleSearch }) => {
    const [offset, setOffset] = useState(0);

    const [count, setCount] = useState(0);

    const onClickLeft = () => {
        if (count === 0) {
            setCount(Children.count(children) - 1);

            const size =
                -document.documentElement.clientWidth *
                (Children.count(children) - 1);

            setOffset(size);
        } else {
            setCount(count - 1);
            const size = offset + document.documentElement.clientWidth;
            setOffset(size);
        }
    };

    const onClickRight = () => {
        if (count === Children.count(children) - 1) {
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
                onClick={!visibleSearch ? onClickLeft : () => {}}
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

export default memo(Carousel);
