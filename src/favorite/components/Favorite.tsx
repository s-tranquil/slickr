import React from "react";

import "../styles/favorite.css";

import {
    IFavoriteAction,
    IFavoriteState
} from "favorite/contracts";

import { FavoriteItem } from "./FavoriteItem";

interface IProps {
    state: IFavoriteState,
    dispatch: React.Dispatch<IFavoriteAction>
}

const Favorite: React.FC<IProps> = ({
    state,
    dispatch
}) => {
    return (
        <div className="favorite">
            {state.items.map(item => (
                <FavoriteItem
                    key={item.id}
                    item={item}
                    dispatch={dispatch}
                />
            ))}
        </div>
    );
};

export { Favorite };
