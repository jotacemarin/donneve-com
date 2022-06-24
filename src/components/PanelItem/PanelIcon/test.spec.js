import React from "react";
import { mount } from "enzyme";
import PanelIcon from "./view";

describe("<PanelIcon />", () => {
  test("Should be render with custom icon", () => {
    const wrapper = mount(<PanelIcon icon="fas fa-search" />);
    expect(wrapper.html()).toMatch("fas fa-search");
  });

  test("Should be render with default icon", () => {
    const wrapper = mount(<PanelIcon />);
    expect(wrapper.html()).toMatch("fas fa-code-branch");
  });
});
