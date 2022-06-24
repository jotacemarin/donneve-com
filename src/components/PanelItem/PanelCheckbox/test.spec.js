import React from "react";
import { mount } from "enzyme";
import PanelCheckbox from "./view";

describe("<PanelCheckbox />", () => {
  const onChange = jest.fn;

  test("Should be render with default values", () => {
    const wrapper = mount(<PanelCheckbox onChange={onChange} />);
    console.log(wrapper.html());
    expect(wrapper.html()).toMatch('<label><input type="checkbox"></label>');
  });

  test("Should be render with props", () => {
    const wrapper = mount(
      <PanelCheckbox
        onChange={onChange}
        value={false}
        disabled={false}
        label="Test"
      />
    );
    expect(wrapper.html()).toMatch("Test");
  });
});
