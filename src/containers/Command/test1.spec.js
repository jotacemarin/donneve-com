/* eslint-disable import/first */

jest.mock("../../hooks", () => ({
  useGetCommand: () => ({ value: true, loading: true }),
  useEditCommand: () => ({
    nextValue: null,
    refetch: () => true,
    loading: true,
  }),
}));

import React from "react";
import { mount } from "enzyme";
import Command from "./view";

describe("<Command />", () => {
  test("Should be render", () => {
    const wrapper = mount(<Command command="test" userId={12345} />);
    wrapper.update();
    const input = wrapper.find("input");
    expect(input.prop("checked")).toBeTruthy();
  });
});
