import React from "react";
import { mount } from "enzyme";
import Notification from "./view";

describe("<Notification /> basic tests", () => {
  let wrapper = {};

  afterEach(() => {
    if (wrapper.unmount) {
      wrapper.unmount();
    }

    wrapper = {};
  });

  test("Should be rendered", () => {
    wrapper = mount(<Notification />);
    expect(wrapper.html()).toBeTruthy();
  });

  test("Should be rendered with text", () => {
    const text = "Test";
    wrapper = mount(<Notification text={text} />);
    expect(wrapper.html()).toMatch(text);
  });

  test("Should be rendered with children", () => {
    wrapper = mount(<Notification children={<span>Test</span>} />);
    expect(wrapper.find("span").exists()).toBeTruthy();
  });
});

describe("<Notification /> style tests", () => {
  let wrapper = {};

  afterEach(() => {
    if (wrapper.unmount) {
      wrapper.unmount();
    }

    wrapper = {};
  });

  test("Should be isInfo notification", () => {
    wrapper = mount(<Notification text="Test" isInfo />);
    expect(wrapper.html()).toMatch("is-info");
  });

  test("Should be isError notification", () => {
    wrapper = mount(<Notification text="Test" isError />);
    expect(wrapper.html()).toMatch("is-danger");
  });

  test("Should be isSuccess notification", () => {
    wrapper = mount(<Notification text="Test" isSuccess />);
    expect(wrapper.html()).toMatch("is-success");
  });

  test("Should be visible notification", () => {
    wrapper = mount(<Notification text="Test" visible />);
    expect(wrapper.html()).not.toMatch("is-hidden");
  });
});

describe("<Notification /> prop functions", () => {
  let wrapper = {};

  afterEach(() => {
    if (wrapper.unmount) {
      wrapper.unmount();
    }

    wrapper = {};
  });

  test("Has onTimeout and visible props", async () => {
    jest.useFakeTimers();

    const onTimeout = jest.fn();
    const duration = 100;
    wrapper = mount(
      <Notification
        text="Test"
        visible
        onTimeout={onTimeout}
        duration={duration}
      />
    );

    setTimeout(() => {
      expect(onTimeout).toHaveBeenCalled();
    }, duration + 1);

    jest.runAllTimers();
  });

  test("Has close props", async () => {
    const close = jest.fn();
    wrapper = mount(<Notification text="Test" close={close} />);
    wrapper.find("button.delete").simulate("click");
    expect(close).toHaveBeenCalled();
  });
});
