import { IRecentPicture } from "client/contracts";

import { FavoriteActionType } from "./FavoriteActionType";

interface IFavoriteAction {
    type: FavoriteActionType;
    payload: IRecentPicture;
}

export type { IFavoriteAction };
