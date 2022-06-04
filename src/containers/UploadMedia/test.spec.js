/* eslint-disable import/first */

const mockResponse = { apiKey: ["test", "1234"] };

jest.mock("../../api/donneve", () => ({
  filesManager: {},
  getApiKey: () => new Promise.resolve({ data: mockResponse }),
  setTags: () => true,
}));

import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import UploadMedia from "./view";

describe("<UploadMedia /> without token", () => {
  test("<UploadMedia /> Should be render snapshot", () => {
    const wrapper = mount(
      <MemoryRouter>
        <UploadMedia />
      </MemoryRouter>
    );
    const validateCodeIsDisabled = wrapper
      .find("button.button.is-fullwidth.mt-1.is-warning")
      .prop("disabled");
    expect(validateCodeIsDisabled).toBeTruthy();
  });
});

describe("<UploadMedia /> with token", () => {
  test("<UploadMedia /> Should be render snapshot", async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["", { search: "?token=123456" }]} >
        <UploadMedia />
      </MemoryRouter>
    );

    const validateCodeIsDisabled = wrapper
      .find("button.button.is-fullwidth.mt-1.is-warning")
      .prop("disabled");
    expect(validateCodeIsDisabled).toBeFalsy();
  });
});
