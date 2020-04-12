import { getSizes } from "../";

test('gets picture list from flickr api', async () => {
    const result = await getSizes("36165152083");
    expect(result.sizes).toEqual(expect.any(Object));
    expect(result.stat).toEqual("ok");
});