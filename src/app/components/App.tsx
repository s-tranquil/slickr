import React, {
    useCallback,
    useContext
} from "react";

import "../styles/app.css";

import { getPicturesList } from "client";
import { IRecentPicture } from "client/contracts";
import {
    Favorite,
    FavoriteContext
} from "favorite";
import { Infinite } from "infinite";
import {
    Photo,
    PhotoOverlay
} from "photo";

import type { IInfinitePage } from "infinite";
function App() {
    const { favorites } = useContext(FavoriteContext);

    const getPhotos = useCallback(
        (pageNo: number) =>
            getPicturesList(pageNo)
                .then(result => ({
                    items: result.photos.photo,
                    totalPages: result.photos.pages
                } as IInfinitePage<IRecentPicture>)),
        []
    );

    const renderPhoto = useCallback(
        (photo: IRecentPicture) => (
            <Photo
                key={photo.id}
                photo={photo}
                overlay={(
                    <PhotoOverlay photo={photo} />
                )}
            />
        ),
        []
    );

    return (
        <>
            <div
                className={(
                    favorites.length
                        ? "body body_with_favorite"
                        : "body"
                )}
            >
                <Infinite
                    fetchData={getPhotos}
                    renderItem={renderPhoto}
                />
            </div>
            {!!favorites.length && (
                <Favorite />
            )}
        </>
    );
}

export { App };
