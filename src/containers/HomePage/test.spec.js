import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Home from "./view";

describe("<Home /> render", () => {
  test("<Home /> Should be render", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  test("<Home /> Should be render with querystring token", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["", { search: "?token=123456" }]}>
        <Home />
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  test("<Home /> Should be render with querystring page", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["", { search: "?page=commands" }]}>
        <Home />
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  test("<Home /> Should be render with querystring page and token", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={["", { search: "?page=commands&token=123456" }]}
      >
        <Home />
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBeTruthy();
  });
});
