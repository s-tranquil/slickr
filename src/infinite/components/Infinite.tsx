import React, {
    useCallback,
    useEffect,
    useState
} from "react";

import "../styles/infinite.css";

import { Loader } from "loader";

import type { IInfinitePage } from "../contracts/IInfinitePage";

interface IProps<TItem> {
    fetchData: (pageNo: number) => Promise<IInfinitePage<TItem>>;
    renderItem: (item: TItem) => JSX.Element;
}

function Infinite<TItem>({
    renderItem,
    fetchData
}: IProps<TItem>) {
    // TODO: switch to reducer 
    const [items, setItems] = useState<TItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageNo, setPageNo] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchNextPage = useCallback(
        () => {
            if (!isLoading) { 
                setIsLoading(true);
                const newPageNo = pageNo + 1;
                fetchData(newPageNo).then(
                    (data) => {
                        setItems(oldItems => oldItems.concat(data.items));
                        setIsLoading(false);
                        setPageNo(newPageNo);
                        if (data.totalPages !== totalPages) {
                            setTotalPages(data.totalPages);
                        }
                    }
                );
            }
        },
        [fetchData, pageNo, isLoading, totalPages]
    );

    const onScroll = useCallback(
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
            
            if (
                windowBottom >= docHeight - 1 && 
                pageNo < totalPages
            ) {
                fetchNextPage();
            }
        },
        [fetchNextPage, pageNo, totalPages]
    );

    useEffect(
        () => {
            // immediately triggering handler in case we need more items
            // before user actually scrolls down
            onScroll();
            window.addEventListener("scroll", onScroll);
            return () => window.removeEventListener("scroll", onScroll);
        },
        [onScroll]
    );

    // for the first page
    useEffect(fetchNextPage, []);

    return (
        <div className="infinite">
            {!items && (
                <div className="infinite__loader infinite__loader_initial">
                    <Loader />
                </div>
            )}
            {items && (
                <div className="infinite__items">
                    {items.map(renderItem)}
                </div>
            )}
            {items && isLoading && (
                <div className="infinite__loader infinite__loader_more">
                    <Loader />
                </div>
            )}
        </div>
    );
}

export { Infinite };
