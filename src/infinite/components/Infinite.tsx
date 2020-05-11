import React from "react";

import "../styles/infinite.css";

import {
    useIsScrollBottom,
    useWindowChangeListener
} from "infinite/hooks";
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
    const [items, setItems] = React.useState<TItem[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [pageNo, setPageNo] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(1);

    const fetchPage = React.useCallback(
        async (pageNo: number) => {
            setIsLoading(true);

            const data = await fetchData(pageNo);

            setItems(oldItems => oldItems.concat(data.items));
            setTotalPages(data.totalPages);

            setPageNo(pageNo);
            setIsLoading(false);
        },
        [fetchData]
    );

    const fetchNextPage = React.useCallback(
        async () => {
            await fetchPage(pageNo + 1);
        },
        [fetchPage, pageNo]
    );

    const isScrollBottom = useIsScrollBottom();
    const needsNextPage = React.useCallback(
        () => {
            return (
                !isLoading &&
                isScrollBottom() &&
                pageNo < totalPages
            );
        },
        [pageNo, totalPages, isScrollBottom, isLoading]
    );

    const getNextPageIfNeeded = React.useCallback(
        async () => {
            if (needsNextPage()) {
                await fetchNextPage();
            }
        },
        [fetchNextPage, needsNextPage]
    );

    const onScroll = React.useCallback(getNextPageIfNeeded, [getNextPageIfNeeded]);
    useWindowChangeListener(onScroll);

    // check if we need to load more after previous page loaded, and for the first page
    React.useEffect(
        () => {
            if (!isLoading) {
                const fetchNextPageAsync = async () => {
                    await getNextPageIfNeeded()
                };
                fetchNextPageAsync();
            }
        },
        [getNextPageIfNeeded, isLoading]
    );

    return (
        <div className="infinite">
            {!items.length && (
                <div className="infinite__loader infinite__loader_initial">
                    <Loader />
                </div>
            )}
            {!!items.length && (
                <>
                    <div className="infinite__items">
                        {items.map((item: TItem, index: number) => (
                            // it's okay to use index as a key as we only extend items array
                            <InfiniteItem
                                key={index}
                                item={item}
                                renderItem={renderItem}
                            />
                        ))}
                    </div>
                    {pageNo < totalPages && (
                        <div className="infinite__loader infinite__loader_more">
                            <Loader />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

// It is an empty wrapper
// Needed because if replaced with <React.Fragment> stops working in production build
function InfiniteItem<T>(
    {
       item,
       renderItem
    }: {
        item: T,
        renderItem: (item: T) => React.ReactElement
    }
) {
    return (<>{renderItem(item)}</>);
}

export { Infinite };
