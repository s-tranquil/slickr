import { secrets } from "./secrets";

const headerOrigin = "http://localhost";

async function get(
    urlParams: {[key: string]: string | number},
    requestInit?: RequestInit
) {
    const params = new URLSearchParams();
    Object.keys(urlParams).forEach(key =>
        params.append(key, String(urlParams[key]))
    );
    params.append("api_key", secrets.apiKey);
    params.append("format", "json");
    params.append("nojsoncallback", "1");

    const url = `${secrets.flickrServicesCorsUrl}?${params.toString()}`;

    const init = {
        ...requestInit,
        headers: {
            ...requestInit?.headers,
            "origin": headerOrigin
        }
    };

    return fetch(url, init);
}

export {
    get
};
