import React from "react";
import { mount } from "enzyme";
import Panel from "./view";

describe("<Panel />", () => {
  const items = [<span key={0}>test 0</span>, <span key={1}>test 1</span>];
  const onChange = jest.fn;

  test("Should be render", () => {
    const wrapper = mount(
      <Panel heading="test" items={items} onChange={onChange} footer />
    );
    expect(wrapper.html()).toBeTruthy();
    expect(wrapper.html()).not.toMatch("empty");
    expect(wrapper.html()).toMatch("Reset all filters");
  });

  test("Should be empty", () => {
    const wrapper = mount(
      <Panel heading="test" items={[]} onChange={onChange} />
    );
    expect(wrapper.html()).toBeTruthy();
    expect(wrapper.html()).toMatch("empty");
    expect(wrapper.html()).not.toMatch("Reset all filters");
  });
});
