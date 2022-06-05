/* eslint-disable import/first */

jest.mock("../../utils/sessionStorage", () => ({
  getItem: () => ({
    auth_date: "1654470814",
    first_name: "Test",
    hash: "Test1234",
    id: "1234",
    last_name: "Test",
    photo_url: "test.png",
    username: "test",
  }),
}));

import React from "react";
import { mount } from "enzyme";
import UserInfo from "./view";

describe("<UserInfo />", () => {
  test("Should be render", () => {
    const view = mount(<UserInfo />);
    expect(view.html()).toMatch("Please click in telegram button to sign in!");
  });
  
  test("Should be render with user info", () => {
    const view = mount(<UserInfo show />);
    expect(view.html())
      .not
      .toMatch("Please click in telegram button to sign in!");
  });
});
