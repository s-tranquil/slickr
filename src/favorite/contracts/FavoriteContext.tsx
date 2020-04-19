import React, { useCallback } from "react";

import { IRecentPicture } from "client/contracts";

import { useFavoriteReducer } from "../hooks/useFavoriteReducer";
import { FavoriteActionType } from "./FavoriteActionType";

interface IFavoriteContext {
    favorites: IRecentPicture[];
    addFavorite: (item: IRecentPicture) => void;
    removeFavorite: (item: IRecentPicture) => void;
}

const initialState: IFavoriteContext = {
    favorites: [],
    addFavorite: () => {},
    removeFavorite: () => {}
};

const FavoriteContext = React.createContext<IFavoriteContext>(initialState);

const FavoriteProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useFavoriteReducer();

    const addItem = useCallback(
        (item: IRecentPicture) => {
            dispatch({
                type: FavoriteActionType.Add,
                payload: item
            })
        },
        [dispatch]
    );

    const removeItem = useCallback(
        (item: IRecentPicture) => {
            dispatch({
                type: FavoriteActionType.Remove,
                payload: item
            })
        },
        [dispatch]
    );

    return (
        <FavoriteContext.Provider
            value= {{
                favorites: state.items,
                addFavorite: addItem,
                removeFavorite: removeItem
            }}
          >
            {children}
        </FavoriteContext.Provider>
    );
}

export { FavoriteContext, FavoriteProvider };
