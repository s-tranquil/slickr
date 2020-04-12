import React, {
    useCallback,
    useEffect,
    useState
} from "react";

import "../styles/infinite.css";

import { Loader } from "loader";

interface IProps<TItem> {
    fetchData: (pageNo: number) => Promise<TItem[]>;
    renderItem: (item: TItem) => JSX.Element;
}

function Infinite<TItem>({
    renderItem,
    fetchData
}: IProps<TItem>) {
    const [items, setItems] = useState<TItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageNo, setPageNo] = useState<number>(0);

    const fetchIfNeeded = useCallback(
        () => {
            if (pageNo === 0) {
                setIsLoading(true);
                const newPageNo = pageNo + 1
                fetchData(newPageNo).then(
                    (newItems) => {
                        setItems(oldItems => oldItems.concat(newItems));
                        setIsLoading(false);
                        setPageNo(newPageNo);
                    }
                );
            }
        },
        [fetchData, pageNo]
    );

    useEffect(fetchIfNeeded, []);

    return (
        <div className="infinite">
            {(!items || isLoading) && (
                <div className="infinite__loader">
                    <Loader />
                </div>
            )}
            {items && (
                <div className="infinite__items">
                    {items.map(renderItem)}
                </div>
            )}
        </div>
    );
}

export { Infinite };
