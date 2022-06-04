import React from "react";
import { mount } from "enzyme";
import TagInput from "./view";

describe("<TagInput />", () => {
  const onChange = jest.fn();
  let wrapper = {};

  beforeEach(() => {
    wrapper = mount(<TagInput onChange={onChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = {};
  });

  test("Should be render without tags", () => {
    const tagElements = ["input", "button"];
    const hasAllElements = tagElements.every((tagElement) =>
      wrapper.find(tagElement).exists()
    );

    expect(hasAllElements).toBeTruthy();
  });

  test("Prop onChange should be called", () => {
    wrapper.find("input").simulate("change", { target: { value: "test" } });
    wrapper.find("button.button.is-info").simulate("click");
    expect(onChange).toHaveBeenCalled();
  });

  test("Should be added a single tag", () => {
    wrapper.find("input").simulate("change", { target: { value: "test" } });
    wrapper.find("button.button.is-info").simulate("click");
    const { length: countTags } = wrapper.find("span.tag.is-info");
    expect(countTags).toEqual(1);
  });

  test("Should be added tags using char space", () => {
    wrapper
      .find("input")
      .simulate("change", { target: { value: "test chololom olongolongo" } });
    wrapper.find("button.button.is-info").simulate("click");
    const { length: countTags } = wrapper.find("span.tag.is-info");
    expect(countTags).toBeGreaterThan(1);
  });

  test("Should be added and remove a single tag", () => {
    wrapper.find("input").simulate("change", { target: { value: "test" } });
    wrapper.find("button.button.is-info").simulate("click");
    const { length: lastCountTags } = wrapper.find("span.tag.is-info");
    wrapper.find("button.delete.is-small").simulate("click");
    const { length: currentCountTags } = wrapper.find("span.tag.is-info");
    expect(lastCountTags).not.toEqual(currentCountTags);
  });

  test("Should be added tag when Enter was pressed", () => {
    wrapper.find("input").simulate("keydown", { key: "A" });
    wrapper.find("input").simulate("keydown", { key: "Enter", keyCode: 13 });
    const { length: countTags } = wrapper.find("span.tag.is-info");
    expect(countTags).toBeGreaterThan(0);
  });

  test("Should be added tag when Space was pressed", () => {
    wrapper.find("input").simulate("keydown", { key: "A" });
    wrapper.find("input").simulate("keydown", { key: " ", keyCode: 32 });
    const { length: countTags } = wrapper.find("span.tag.is-info");
    expect(countTags).toBeGreaterThan(0);
  });
});
