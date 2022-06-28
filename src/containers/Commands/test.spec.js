/* eslint-disable import/first */

jest.mock("../../hooks", () => ({
  useGetCommands: () => ({
    commands: ["test"],
  }),
  useGetCommand: () => ({ value: false, loading: false }),
  useEditCommand: () => ({
    nextValue: true,
    refetch: () => false,
    loading: false,
  }),
}));

import React from "react";
import { mount } from "enzyme";
import Commands from "./view";

describe("<Commands />", () => {
  const user = { idTg: "1a2b3c4d" };

  test("Should be render", () => {
    const wrapper = mount(<Commands user={user} />);
    wrapper.update();
    expect(wrapper.html()).toBeTruthy();
  });
});
