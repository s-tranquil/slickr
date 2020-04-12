import { get } from "./fetch-client";

import type { IRecentPictureCollection } from "./contracts";

async function getPicturesList(page: number): Promise<IRecentPictureCollection> {
    const response = await get({
        method: "flickr.photos.getRecent",
        page,
        per_page: 12,
        extras: "description, owner_name",
    });

    if (response.ok) {
        const result = await response.json();
        return result;
    }

    return {} as IRecentPictureCollection;
};

export { getPicturesList };
