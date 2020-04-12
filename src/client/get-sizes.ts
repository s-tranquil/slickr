import { get } from "./fetch-client";

async function getSizes(id: string): Promise<any> {
    const response = await get({
        method: "flickr.photos.getSizes",
        photo_id: id,
    });

    if (response.ok) {
        const result = await response.json();
        return result;
    }

    return {};
};

export { getSizes };
