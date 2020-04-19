import {
    useEffect,
    useReducer
} from "react";

import { IFavoriteState } from "favorite/contracts";
import { favoriteReducer } from "favorite/reducers/favoriteReducer";

const initialState: IFavoriteState = {
    items: []
};

const localStorageUserKey = "slickr:favorite";

const useFavoriteReducer = () => {
    const localStorageJson = localStorage.getItem(localStorageUserKey);
    const initial = localStorageJson
        ? JSON.parse(localStorageJson)
        : initialState;

    const [state, dispatch] = useReducer(favoriteReducer, initial);

    useEffect(
        () => {
            return () => localStorage.setItem(
                localStorageUserKey,
                JSON.stringify(state)
            );
        },
        [state]
    );

    return [state, dispatch];
}

export { useFavoriteReducer };
