import React from "react";

import { shallow } from "enzyme";

import { App } from "../components/App";

describe('App component', () => {
	it('starts with a count of 0', () => {
		const wrapper = shallow(<App />);
		const div = wrapper.find('div.body');
		expect(div).toHaveLength(1);
	});
});
