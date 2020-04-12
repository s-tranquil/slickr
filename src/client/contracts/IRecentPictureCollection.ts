import type { IRecentPicture } from "./IRecentPicture";
import type { StatType } from "./StatType";

interface IRecentPictureCollection {
    photos: {
        page: number,
        pages: number,
        per_page: number,
        total: number,
        photo: IRecentPicture[];
    }
    stat: StatType;
}

export type { IRecentPictureCollection };
