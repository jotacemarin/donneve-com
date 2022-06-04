import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NotFound from "./view";

test("<NotFound /> Should be render snapshot", () => {
  const wrapper = shallow(<NotFound />);
  const render = toJson(wrapper);
  expect(render).toMatchSnapshot();
});