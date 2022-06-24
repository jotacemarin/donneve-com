import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import WithAuth from "./view";

describe("<WithAuth />", () => {
  test("WithAuth is standar", () => {
    // eslint-disable-next-line no-unused-vars
    const withAuth = WithAuth(<p>test</p>);

    const view = shallow(
      <MemoryRouter>
        <withAuth />
      </MemoryRouter>
    );

    expect(view.html()).toBeTruthy();
  });
});
