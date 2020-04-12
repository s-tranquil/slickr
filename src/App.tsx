import React from "react";

import "./App.css";

import { getPicturesList } from "./client";
import {
    IRecentPicture,
    IRecentPictureCollection
} from "./client/contracts";
import { Loader } from "./loader";

function getPhotoUrl(photo: IRecentPicture) {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
}

function App() {
    const [images, setImages] = React.useState<IRecentPictureCollection>();

    React.useEffect(
        () => {
            getPicturesList().then(setImages)
        },
        []
    );

    return (
        <div className="body">
            {!images && (
                <div className="body__loader">
                    <Loader />
                </div>
            )}
            {images && (
                <div className="photos">
                {images.photos.photo.map(photo => (
                    <div className="photo" key={photo.id}>
                        <img className="photo__image" src={getPhotoUrl(photo)} />
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}

export default App;
