import React from "react";

import "../styles/photo.css";

import { getPhotoUrl } from "app/helpers";
import { IRecentPicture } from "client/contracts";

interface IProps {
    photo: IRecentPicture
}

const Photo: React.FC<IProps> = React.memo(({ photo }) => (
    <div className="photo">
        <img
            className="photo__image"
            alt={photo.title}
            src={getPhotoUrl(photo)}
        />
    </div>
));

export { Photo };
