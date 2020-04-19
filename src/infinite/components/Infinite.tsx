import React, {
    Fragment,
    useCallback,
    useEffect,
    useState
} from "react";

import "../styles/infinite.css";

import { useIsScrollBottom } from "infinite/hooks/useIsScrollBottom";
import { Loader } from "loader";

import { useWindowChangeListener } from "../hooks/useWindowChangeListener";

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
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchPage = useCallback(
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

    const fetchNextPage = useCallback(
        async () => {
            await fetchPage(pageNo + 1);
        },
        [fetchPage, pageNo]
    );

    const isScrollBottom = useIsScrollBottom();
    const needsNextPage = useCallback(
        () => {
            return (
                !isLoading &&
                isScrollBottom() &&
                pageNo < totalPages
            );
        },
        [pageNo, totalPages, isScrollBottom, isLoading]
    );

    const getNextPageIfNeeded = useCallback(
        async () => {
            if (needsNextPage()) {
                await fetchNextPage();
            }
        },
        [fetchNextPage, needsNextPage]
    );

    const onScroll = useCallback(getNextPageIfNeeded, [getNextPageIfNeeded]);
    useWindowChangeListener(onScroll);

    // check if we need to load more after previous page loaded, and for the first page
    useEffect(
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

    const renderKeyed = useCallback(
        (item: TItem, index: number) => (
            // it's okay to address by index, we only adding items to the end
            // we cannot key by id, because there could be duplicates
            <Fragment key={index}>
                {renderItem(item)}
            </Fragment>
        ),
        [renderItem]
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
                        {items.map(renderKeyed)}
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

export { Infinite };
