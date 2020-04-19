import React, {
    useCallback,
    useContext
} from "react";

import { IRecentPicture } from "client/contracts";
import { FavoriteContext } from "favorite";

interface IProps {
    photo: IRecentPicture;
    compact?: boolean;
}

const PhotoOverlay: React.FC<IProps> = ({
    photo,
    compact
}) => {
    const {
        favorites,
        addFavorite,
        removeFavorite
    } = useContext(FavoriteContext);

    const isFavorited = favorites.some(x => x.id === photo.id);

    const onClick = useCallback(
        () => {
            if (isFavorited) {
                removeFavorite(photo);
            } else {
                addFavorite(photo);
            }
        },
        [isFavorited, photo, addFavorite, removeFavorite]
    );

    return (
        <div className="overlay">
            <div className="overlay__content">
                {!compact && (
                    <div className="overlay__caption">
                        <div className="overlay__text overlay__text-bold">
                            {photo.title}
                        </div>
                        <hr className="overlay__line"/>
                        <div className="overlay__text overlay__text-italic">
                            {photo.ownername}
                        </div>
                    </div>
                )}
                <button
                    className="overlay__button"
                    onClick={onClick}
                >
                    {isFavorited ? "Unfavorite" : "Favorite"}
                </button>
            </div>
        </div>
    );
}

export { PhotoOverlay };
