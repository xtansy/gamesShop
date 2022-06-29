type CategoriesSetting = {
    name: string;
    type: string | null;
};
type CategoriesProps = {
    categories: CategoriesSetting[];
    onSelectCategory: (setting: string | null) => void;
    activeCategory: string | null;
};

const Categories: React.FC<CategoriesProps> = ({
    categories,
    onSelectCategory,
    activeCategory,
}) => {
    const onClickCategory = (type: string | null) => {
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
