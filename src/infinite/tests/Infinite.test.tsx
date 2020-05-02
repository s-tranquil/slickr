import React from "react";

import { shallow } from "enzyme";
import { IInfinitePage } from "infinite/contracts/IInfinitePage";
import ReactDOM from "react-dom";

import { Infinite } from "../components/Infinite";

describe("Infinite", () => {
    it('shows initial loader when no data present', () => {
        const wrapper = shallow(
            <Infinite
                fetchData={() => Promise.resolve([] as any as IInfinitePage<{}>)}
                renderItem={() => (<></>)}
            />
        );
        const loader = wrapper.find('div.infinite__loader_initial');
        expect(loader.exists()).toBeTruthy();
    });
});