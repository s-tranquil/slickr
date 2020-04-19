import React, { useCallback } from "react";

import "../styles/app.css";

import { getPicturesList } from "client";
import { IRecentPicture } from "client/contracts";
import {
    Favorite,
    useFavoriteReducer
} from "favorite";
import { FavoriteActionType } from "favorite/contracts";
import { Infinite } from "infinite";

import { Photo } from "./Photo";

import type { IInfinitePage } from "infinite";
function App() {
    const [state, dispatch] = useFavoriteReducer();

    const getPhotos = useCallback(
        (pageNo: number) =>
            getPicturesList(pageNo)
                .then(result => ({
                    items: result.photos.photo,
                    totalPages: result.photos.pages
                } as IInfinitePage<IRecentPicture>)),
        []
    );

    const onClick = useCallback(
        (photo: IRecentPicture) => {
            dispatch({
                type: FavoriteActionType.Add,
                payload: photo
            })
        },
        [dispatch]
    );

    const renderPhoto = useCallback(
        (photo: IRecentPicture) => (
            <Photo
                key={photo.id}
                photo={photo}
                onClick={onClick}
            />
        ),
        [onClick]
    );

    return (
        <>
            <div
                className={(
                    state.items.length
                        ? "body body_with_favorite"
                        : "body"
                )}
            >
                <Infinite
                    fetchData={getPhotos}
                    renderItem={renderPhoto}
                />
            </div>
            {!!state.items.length && (
                <Favorite
                    state={state}
                    dispatch={dispatch}
                />
            )}
        </>
    );
}

export { App };
