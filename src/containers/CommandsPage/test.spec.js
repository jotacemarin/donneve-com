import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import CommandsPage from "./view";

describe("<CommandsPage />", () => {
  test("CommandsPage happy path", () => {
    const user = { idTg: 1 };

    const view = shallow(
      <MemoryRouter>
        <CommandsPage user={user} isAdmin />
      </MemoryRouter>
    );

    expect(view.html()).toBeTruthy();
  });

  test("CommandsPage not admin", () => {
    const user = { idTg: 1 };

    const view = shallow(
      <MemoryRouter>
        <CommandsPage user={user} />
      </MemoryRouter>
    );

    expect(view.html()).toBeTruthy();
  });

  test("CommandsPage empty user not admin", () => {
    const user = { };

    const view = shallow(
      <MemoryRouter>
        <CommandsPage user={user} />
      </MemoryRouter>
    );

    expect(view.html()).toBeTruthy();
  });
});
