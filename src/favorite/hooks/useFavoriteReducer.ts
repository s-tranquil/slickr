import {
    Dispatch,
    useEffect,
    useReducer
} from "react";

import {
    IFavoriteAction,
    IFavoriteState
} from "favorite/contracts";
import { favoriteReducer } from "favorite/reducers/favoriteReducer";

const initialState: IFavoriteState = {
    items: []
};

const localStorageUserKey = "slickr:favorite";

function useFavoriteReducer(): [IFavoriteState, Dispatch<IFavoriteAction>]  {
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
