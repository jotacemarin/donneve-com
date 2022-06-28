import React from "react";
import { mount } from "enzyme";
import PanelBlock from "./view";

describe("<PanelBlock />", () => {
  test("Should be render with children", () => {
    const wrapper = mount(
      <PanelBlock>
        <span>test</span>
      </PanelBlock>
    );
    expect(wrapper.html()).toMatch("<span>test</span>");
  });

  test("Should be render with others props", () => {
    const onChange = jest.fn;
    const wrapper = mount(
      <PanelBlock
        icon="fas fa-search"
        label="test"
        checkbox={false}
        onChange={onChange}
      />
    );
    expect(wrapper.html()).toMatch("fas fa-search");
    expect(wrapper.html()).toMatch("test");
  });
});
