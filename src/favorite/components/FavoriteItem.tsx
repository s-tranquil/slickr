import React, { useCallback } from "react";

import "../styles/favorite.css";

import { Photo } from "app/components/Photo";
import { IRecentPicture } from "client/contracts";
import {
    FavoriteActionType,
    IFavoriteAction
} from "favorite/contracts";

interface IProps {
    item: IRecentPicture;
    dispatch: React.Dispatch<IFavoriteAction>
}

const FavoriteItem: React.FC<IProps> = ({
    item,
    dispatch
}) => {
    const onClick = useCallback(
        () => {
            dispatch({
                type: FavoriteActionType.Remove,
                payload: item
            })
        },
        [item, dispatch]
    );
    
    return (
        <div className="favorite__item">
            <Photo photo={item} onClick={onClick} />
        </div>
    );
};

export { FavoriteItem };
