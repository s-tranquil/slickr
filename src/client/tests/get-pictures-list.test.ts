import { getPicturesList } from "../";

test('gets picture list from flickr api', async () => {
    const result = await getPicturesList();
    expect(result.photos).toEqual(expect.any(Object));
    expect(result.stat).toEqual("ok");
});
