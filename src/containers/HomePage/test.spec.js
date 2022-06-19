import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Home from "./view";

describe("<Home /> render", () => {
  test("<Home /> Should be render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  test("<Home /> Should be render with querystring", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["", { search: "?token=123456" }]}>
        <Home />
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBeTruthy();
  });
});
