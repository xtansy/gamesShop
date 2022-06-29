import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CartItem } from "../components";
import { cartSelector } from "../redux/sliceces/cart/cartSlice";
import { changeSearchedStr } from "../redux/sliceces/games/gamesSlice";

const Cart: React.FC = () => {
    const dispatch = useDispatch();

    const {
        cart: cartItems,
        totalPrice,
        totalCount,
    } = useSelector(cartSelector);

    useEffect(() => {
        document.body.style.overflow = "auto";
        dispatch(changeSearchedStr(""));
    }, []);

    return (
        <div className="cart _container">
            <div className="cart__content">
                <h1>
                    МОЙ ЗАКАЗ <span>{totalCount}</span>
                </h1>
                <hr />
                {cartItems.map((item) => {
                    return (
                        <CartItem
                            name={item.name}
                            key={item.id}
                            imageUrl={item.imageUrl}
                            price={item.price}
                            id={item.id}
                        />
                    );
                })}
            </div>
            <div className="cart__buy">
                <div className="cart__buy-text">
                    <h2>ИТОГО</h2>
                    <p>{totalPrice} ₽</p>
                </div>
                <button className="button cart__buy-btn">оформить заказ</button>
            </div>
        </div>
    );
};

export default Cart;
