import { useSelector } from "react-redux";

import { cartItemsSelector } from "../redux/sliceces/cart/cartSlice";

type ButtonProps = {
    id: number;
    onAdd: () => void;
    onDelete: () => void;
    slider?: boolean;
};

const Button: React.FC<ButtonProps> = ({ id, onAdd, onDelete, slider }) => {
    const addedGames = useSelector(cartItemsSelector);

    const isAdded = addedGames.findIndex((item) => item.id === id) > -1;

    return (
        <>
            {!isAdded ? (
                <button
                    onClick={onAdd}
                    className={`button ${
                        slider ? "carousel__button" : "card__button"
                    }`}
                >
                    В корзину
                </button>
            ) : (
                <button
                    onClick={onDelete}
                    className={`button ${
                        slider
                            ? "carousel__button"
                            : "card__button card__button_delete"
                    }`}
                >
                    Удалить из корзины
                </button>
            )}
        </>
    );
};

export default Button;
