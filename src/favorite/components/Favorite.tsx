import React, { useContext } from "react";

import "../styles/favorite.css";

import { FavoriteContext } from "favorite/contracts/FavoriteContext";

import { FavoriteItem } from "./FavoriteItem";

const Favorite: React.FC = () => {
    const { favorites } = useContext(FavoriteContext);

    return (
        <div className="favorite">
            {favorites.map(item => (
                <FavoriteItem
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
};

export { Favorite };
