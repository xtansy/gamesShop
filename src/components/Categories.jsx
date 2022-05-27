import React from "react";

const Categories = ({ categories, onSelectCategory, activeCategory }) => {
    const onClickCategory = (type) => {
        onSelectCategory(type);
    };
    return (
        <div className="categories">
            <ul>
                {categories.map((item, i) => {
                    return (
                        <li
                            className={`categories__li ${
                                item.type === activeCategory &&
                                "categories__li_active"
                            }`}
                            onClick={() => onClickCategory(item.type)}
                            key={i}
                        >
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Categories;
