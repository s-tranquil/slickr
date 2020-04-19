import React from "react";

import "../styles/photo.css";

import { IRecentPicture } from "client/contracts";

import { getPhotoUrl } from "../helpers";

interface IProps {
    photo: IRecentPicture,
    overlay: React.ReactElement;
}

const Photo: React.FC<IProps> = React.memo(({
    photo,
    overlay
}) => {
    return (
        <div className="photo">
            <div className="photo__frame">
                <img
                    className="photo__image"
                    alt={photo.title}
                    src={getPhotoUrl(photo)}
                />
                {overlay}
            </div>
        </div>
    )
});

export { Photo };
