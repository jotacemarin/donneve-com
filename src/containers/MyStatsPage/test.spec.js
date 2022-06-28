import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import MyStatsPage from "./view";

describe("<MyStatsPage />", () => {
  test("MyStatsPage Should be rendered", () => {
    const view = shallow(
      <MemoryRouter>
        <MyStatsPage isAdmin={true} />
      </MemoryRouter>
    );

    expect(view.html()).toBeTruthy();
  });
});
