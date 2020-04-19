import { useCallback } from "react";

const loaderHeight = 200;

// determines if window scroll is at the bottom of the page
const useIsScrollBottom = () => useCallback(
    () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;

        return  windowBottom >= docHeight - 1 - loaderHeight;
    },
    []
);

export { useIsScrollBottom };
