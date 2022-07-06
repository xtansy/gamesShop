import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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

    if (cartItems.length === 0) {
        return (
            <div className="cart__empty-container _container">
                <h1 className="cart__empty-container__title">Корзина: </h1>
                <div className="empty cart__empty">
                    <h2 className="empty__title">Корзина пустая :(</h2>
                    <img
                        width={120}
                        src="cartIcons/cartImage.png"
                        alt="cartImage"
                    />
                    <p className="favorites__empty-subtitle empty__subtitle">
                        Вы ничего не добавили в корзину
                    </p>
                    <Link style={{ textDecoration: "none" }} to="/">
                        <button className="button favorites__empty-button empty__button">
                            <img src="button/arrow-left.svg" alt="arrow-left" />
                            Вернуться назад
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

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
