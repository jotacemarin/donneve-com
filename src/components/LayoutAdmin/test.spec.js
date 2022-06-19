import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Layout from "./view";
import Navbar from "../Navbar";

describe("<Layout />", () => {
  let wrapper = {};

  beforeAll(() => {
    wrapper = mount(
      <MemoryRouter>
        <Layout>test</Layout>
      </MemoryRouter>
    );
  });

  afterAll(() => {
    wrapper.unmount();
    wrapper = {};
  });

  test("Mount Layout component", () => {
    const navbar = wrapper.find(Navbar);
    expect(navbar.exists()).toBeTruthy();
  });

  test("Should contains children", () => {
    const html = wrapper.html();
    expect(html).toMatch("test");
  });
});
