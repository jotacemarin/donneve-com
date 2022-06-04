import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Navbar from "./view";
import { LEFT_BUTTONS } from "./constants";

describe("<Navbar />", () => {
  let wrapper = {};

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = {};
  });

  test("Mount Navbar component", () => {
    expect(wrapper).toBeTruthy();
  });

  test("Contains a steam link", () => {
    const rawHtml = wrapper.html();
    const [{ href }] = LEFT_BUTTONS.filter((button) => button.enabled);

    expect(rawHtml).toMatch(href);
  });

  test("Dont show internal link", () => {
    const rawHtml = wrapper.html();
    const [{ to }] = LEFT_BUTTONS.filter((button) => !button.enabled);

    expect(rawHtml).not.toMatch(to);
  });

  test("Open menu", () => {
    wrapper.find("span.navbar-burger").simulate("click");
    const rawHtml = wrapper.html();

    expect(rawHtml).toMatch("is-active");
  });
});
