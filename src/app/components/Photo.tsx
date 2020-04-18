import React, { useCallback } from "react";

import "../styles/photo.css";

import { getPhotoUrl } from "app/helpers";
import { IRecentPicture } from "client/contracts";

interface IProps {
    photo: IRecentPicture,
    onClick?: (photo: IRecentPicture) => void;
}

const Photo: React.FC<IProps> = React.memo(({ photo, onClick }) => {
    const handleClick = useCallback(
        () => onClick && onClick(photo),
        [photo, onClick]
    );

    return (
        <div className="photo" onClick={handleClick}>
            <img
                className="photo__image"
                alt={photo.title}
                src={getPhotoUrl(photo)}
            />
        </div>
    )
});

export { Photo };
