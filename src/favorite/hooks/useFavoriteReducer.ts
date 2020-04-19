import { useReducer } from "react";

import { IFavoriteState } from "favorite/contracts";
import { favoriteReducer } from "favorite/reducers/favoriteReducer";

const InitialState: IFavoriteState = {
    items: []
};

const useFavoriteReducer = () => useReducer(favoriteReducer, InitialState);

export { useFavoriteReducer };
