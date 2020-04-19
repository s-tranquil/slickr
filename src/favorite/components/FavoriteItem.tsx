import React from "react";

import "../styles/favorite.css";

import { IRecentPicture } from "client/contracts";
import {
    Photo,
    PhotoOverlay
} from "photo";

interface IProps {
    item: IRecentPicture;
}

const FavoriteItem: React.FC<IProps> = ({
    item
}) => {
    return (
        <div className="favorite__item">
            <Photo
                photo={item}
                overlay={(
                    <PhotoOverlay
                        photo={item}
                        compact={true}
                    />
                )}
            />
        </div>
    );
};

export { FavoriteItem };
