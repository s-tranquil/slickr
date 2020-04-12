import React, { useCallback } from "react";

import "../styles/app.css";

import { getPicturesList } from "client";
import { IRecentPicture } from "client/contracts";
import { Infinite } from "infinite";

import { Photo } from "./Photo";

function App() {
    //const [images, setImages] = React.useState<IRecentPictureCollection>();

    // React.useEffect(
    //     () => {
    //         getPicturesList().then(setImages)
    //     },
    //     []
    // );

    const getNextPage = useCallback(
        (pageNo: number) =>
            getPicturesList(pageNo)
                .then(result => result.photos.photo),
        []
    );

    const renderPhoto = useCallback(
        (photo: IRecentPicture) => (
            <Photo photo={photo} />
        ),
        []
    );

    return (
        <div className="body">
            <Infinite
                fetchData={getNextPage}
                renderItem={renderPhoto}
            />
        </div>
    );
}

export { App };
