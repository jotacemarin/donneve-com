import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import DashboardPage from "./view";

describe("<DashboardPage />", () => {
  test("User is admin", () => {
    const view = mount(
      <MemoryRouter>
        <DashboardPage isAdmin={false} />
      </MemoryRouter>
    );

    expect(view.html()).toMatch("Loading...");
  });

  test("User is standar", () => {
    const view = mount(
      <MemoryRouter>
        <DashboardPage isAdmin={true} />
      </MemoryRouter>
    );

    expect(view.html()).toMatch("Loading...");
  });
});
