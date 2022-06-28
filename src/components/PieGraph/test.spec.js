import React from "react";
import { shallow } from "enzyme";
import PieGraph from "./view";

describe("<PieGraph />", () => {
  test("Should be render with values", () => {
    const dataset = [
      { label: "Red", data: 12 },
      { label: "Blue", data: 19 },
    ];
    const wrapper = shallow(
      <PieGraph height={400} title="Test" label="Test" dataset={dataset} />
    );
    expect(wrapper.html()).toBeTruthy();
  });
});
