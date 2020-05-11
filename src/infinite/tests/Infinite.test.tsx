import React, { Dispatch } from "react";

import {
    mount,
    shallow
} from "enzyme";
import { IInfinitePage } from "infinite/contracts/IInfinitePage";
import * as infiniteHooks from "infinite/hooks";

import { Infinite } from "../components/Infinite";

interface ITestData {
    text: string;
}

const renderInfinite = (fetchData: (pageNo: number) => Promise<IInfinitePage<ITestData>>) => (
    <Infinite
        fetchData={fetchData}
        renderItem={(item: ITestData) => (<div key={item.text}>{item.text}</div>)}
    />
);

const renderEmpty = () => {
    const emptyDataMock = jest.fn().mockResolvedValue([] as ITestData[]);
    return renderInfinite(emptyDataMock);
}

describe("Infinite", () => {
    beforeEach(() => {
        jest.spyOn(React, "useCallback").mockImplementation(callback => (...args) => callback(args));
        jest.spyOn(React, "useState").mockImplementation(((initialState: unknown) => {
            let state: unknown = initialState;
            const setState: Dispatch<unknown> = (newState) => state = newState;
            return [state, setState] as [unknown, Dispatch<unknown>];
        }) as any);
        jest.spyOn(React, "useEffect").mockImplementation(_ => {});
        jest.mock("infinite/hooks", () => ({
            useIsScrollBottom: jest.fn(() => () => true),
            useWindowChangeListener: jest.fn((_) => {})
        }));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("shows initial loader when no data present", () => {
        const wrapper = shallow(renderEmpty());
        const loader = wrapper.find("div.infinite__loader_initial");
        expect(loader.exists()).toBeTruthy();
    });

    it("matches snapshot when no data present", () => {
        const wrap = mount(renderEmpty());
        expect(wrap).toMatchSnapshot();
    });

    it("matches snapshot when one page passed", async () => {
        jest.spyOn(React, "useEffect").mockImplementation(f => f());
        // jest.spyOn(React, "useCallback").mockImplementation(f => f());
        const dataMock = jest.fn().mockResolvedValue({
            items: [
                { text: "1" },
                { text: "2" }
            ],
            totalPages: 1
        } as IInfinitePage<ITestData>);
        const wrap = await mount(renderInfinite(dataMock));
        wrap.update();
        expect(wrap).toMatchSnapshot();
        expect(dataMock).toBeCalledTimes(1);
    });
});