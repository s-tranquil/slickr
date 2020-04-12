import { IRecentPicture } from "client/contracts";

const getPhotoUrl = (photo: IRecentPicture) => 
    `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

export { getPhotoUrl };
