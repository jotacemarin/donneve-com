import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Navbar from "./view";
import { PATH_MY_STATS, PATH_UPLOAD } from "../../utils/routes";

describe("<Navbar buttons={'to'} />", () => {
  let wrapper = {};

  const buttons = [
    {
      enabled: true,
      key: "upload-media",
      to: PATH_UPLOAD,
      className: "button is-white is-outlined",
      icon: "fas fa-cloud-upload-alt",
      label: "Upload media",
    }
  ];

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Navbar fullScreen buttons={buttons} />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = {};
  });

  test("Mount Navbar component", () => {
    expect(wrapper).toBeTruthy();
  });

  test("Contains a steam link", () => {
    const rawHtml = wrapper.html();
    expect(rawHtml).toMatch("/upload-media");
  });
});

describe("<Navbar />", () => {
  let wrapper = {};

  const buttons = [
    {
      enabled: false,
      key: "my-stats",
      className: "button is-white is-outlined",
      to: PATH_MY_STATS,
      icon: "fas fa-chart-line",
      label: "My stats",
    },
    {
      enabled: true,
      key: "upload-media",
      to: PATH_UPLOAD,
      className: "button is-white is-outlined",
      icon: "fas fa-cloud-upload-alt",
      label: "Upload media",
    },
    {
      enabled: true,
      key: "steam-external",
      className: "button is-white is-outlined",
      href: "https://steamcommunity.com/groups/e-bolastrike",
      icon: "fab fa-steam",
      label: "Steam group",
    }
  ];

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Navbar buttons={buttons} />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = {};
  });

  test("Contains a steam link", () => {
    const rawHtml = wrapper.html();
    expect(rawHtml).toMatch("/upload-media");
  });
});
