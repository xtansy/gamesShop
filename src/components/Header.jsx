import React from "react";
import vk from "../assets/logo.png";
import cart from "../assets/cart.png";
import like from "../assets/like.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <Link style={{ textDecoration: "none" }} to="/">
                <div className="header__logo">
                    <img src={vk} alt="logo" />
                    <div className="header__logo-content">
                        <h2>SkiddySell</h2>
                        <span>лучшие игры</span>
                    </div>
                </div>
            </Link>

            <div className="header__settings">
                <Link style={{ textDecoration: "none" }} to="/favorites">
                    <img
                        src={like}
                        width={36}
                        className="header__settings-like"
                        alt="img"
                    ></img>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/cart">
                    <img
                        src={cart}
                        width={36}
                        className="header__settings-cart"
                        alt="img"
                    ></img>
                </Link>
            </div>
        </header>
    );
};

export default Header;
