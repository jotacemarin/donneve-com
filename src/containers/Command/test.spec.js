/* eslint-disable import/first */

jest.mock("../../hooks", () => ({
  useGetCommand: () => ({ value: false, loading: false }),
  useEditCommand: () => ({
    nextValue: true,
    refetch: () => false,
    loading: false,
  }),
}));

import React from "react";
import { mount } from "enzyme";
import Command from "./view";

describe("<Command />", () => {
  test("Should be render", () => {
    const wrapper = mount(<Command command="test" userId={12345} />);
    const input = wrapper.find("input");
    wrapper.update();
    expect(input.prop("checked")).toBeFalsy();
  });
});
