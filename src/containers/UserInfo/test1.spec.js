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
  useGetAuth: () => ({
    username: "test",
    isAdmin: true,
    isMember: true,
    isCreator: true,
    loading: false
  }),
}));

jest.mock("../../hooks", () => ({
  useGetAuth: () => ({
    username: "test",
    isAdmin: false,
    isMember: false,
    isCreator: false,
    loading: true
  }),
}));

import React from "react";
import { shallow } from "enzyme";
import UserInfo from "./view";

describe("<UserInfo />", () => {
  const auth = { id: "1a2b3c4d", avatar:"photo.png" };

  test("Should be render", () => {
    const view = shallow(<UserInfo auth={auth} />);

    expect(view.html()).not.toMatch("You&#x27;re admin");
    expect(view.html()).not.toMatch("You&#x27;re creator");
    expect(view.html()).not.toMatch("You&#x27;re ebola");
  });
});
