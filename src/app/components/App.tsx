import React, { useCallback } from "react";

import "../styles/app.css";

import { getPicturesList } from "client";
import { IRecentPicture } from "client/contracts";
import { Infinite } from "infinite";

import { Photo } from "./Photo";

import type { IInfinitePage } from "infinite";

function App() {
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
            <Photo key={photo.id} photo={photo} />
        ),
        []
    );

    return (
        <div className="body">
            <Infinite
                fetchData={getPhotos}
                renderItem={renderPhoto}
            />
        </div>
    );
}

export { App };
