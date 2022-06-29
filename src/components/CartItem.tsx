import deleteItemPng from "../assets/deleteCart.png";
import { useDispatch } from "react-redux";

import { CartCount } from ".";
import { deleteItem } from "../redux/sliceces/cart/cartSlice";

type CartItemProps = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
};

const CartItem: React.FC<CartItemProps> = ({ id, name, imageUrl, price }) => {
    const dispatch = useDispatch();

    const onClickDeleteItem = () => {
        dispatch(deleteItem(id));
    };

    return (
        <>
            <div className="cart__item">
                <div className="cart__item-info">
                    <img
                        width={120}
                        className="cart__item-img"
                        src={imageUrl}
                        alt="img"
                    />
                    <div className="cart__item-text">
                        <h3>{name}</h3>
                        <p>{price} Р</p>
                    </div>
                </div>

                <CartCount id={id} />

                <img
                    onClick={onClickDeleteItem}
                    className="cart__item-delete"
                    width={64}
                    src={deleteItemPng}
                    alt="img"
                />
            </div>
            <hr />
        </>
    );
};

export default CartItem;
