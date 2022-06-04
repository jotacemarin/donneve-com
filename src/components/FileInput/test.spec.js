import React from "react";
import { mount } from "enzyme";
import FileInput from "./view";

const onChange = jest.fn();
const str = JSON.stringify([{ name: 'chololom' }]);
const blob = new Blob([str]);

describe("<FileInput /> standalone", () => {
  let wrapper = {};

  beforeEach(() => {
    wrapper = mount(<FileInput />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = {};
  });

  test("Should be render empty and idle", () => {
    const html = wrapper.html();
    expect(html).toMatch("Choose a");
  });
});

describe("<FileInput /> with img", () => {
  global.URL.createObjectURL = jest.fn();

  let createObjectURL = {};
  const file = new File([blob], 'olongolong.png', { type: 'image/png' });
  const synteticEvent = { target: { files: [file] } };
  let wrapper = {};

  beforeAll(() => {
    createObjectURL = global.URL.createObjectURL;
    global.URL.createObjectURL = jest.fn();
  });

  beforeEach(() => {
    wrapper = mount(<FileInput onChange={onChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = {};
  });

  afterAll(() => {
    global.URL.createObjectURL = createObjectURL;
  });
  
  test("Should be render and click", () => {
    wrapper.find("input").simulate("change", synteticEvent);
    const html = wrapper.html();
    expect(html).toMatch("Change");
    expect(html).toMatch("olongolong.png");
    expect(wrapper.find("img").exists()).toBeTruthy();
    expect(wrapper.find("video").exists()).toBeFalsy();
    expect(onChange).toHaveBeenCalled();
  });
});

describe("<FileInput /> without change", () => {
  global.URL.createObjectURL = jest.fn();

  let createObjectURL = {};
  const file = new File([blob], 'olongolong.png', { type: 'image/png' });
  const synteticEvent = { target: { files: [file] } };
  let wrapper = {};

  beforeAll(() => {
    createObjectURL = global.URL.createObjectURL;
    global.URL.createObjectURL = jest.fn();
  });

  beforeEach(() => {
    wrapper = mount(<FileInput file="test" />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = {};
  });

  afterAll(() => {
    global.URL.createObjectURL = createObjectURL;
  });
  
  test("Should be render and click", () => {
    wrapper.find("input").simulate("change", synteticEvent);
    const html = wrapper.html();
    expect(html).toMatch("Change");
    expect(html).toMatch("olongolong.png");
    expect(wrapper.find("img").exists()).toBeTruthy();
    expect(wrapper.find("video").exists()).toBeFalsy();
  });
});

describe("<FileInput /> with video", () => {
  global.URL.createObjectURL = jest.fn();

  let createObjectURL = {};
  const file = new File([blob], 'olongolongo.mp4', { type: 'video/mp4' });
  const synteticEvent = { target: { files: [file] } };
  let wrapper = {};

  beforeAll(() => {
    createObjectURL = global.URL.createObjectURL;
    global.URL.createObjectURL = jest.fn();
  });

  beforeEach(() => {
    wrapper = mount(<FileInput onChange={onChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = {};
  });

  afterAll(() => {
    global.URL.createObjectURL = createObjectURL;
  });
  
  test("Should be render and click", () => {
    wrapper.find("input").simulate("change", synteticEvent);
    const html = wrapper.html();
    expect(html).toMatch("Change");
    expect(html).toMatch("olongolongo.mp4");
    expect(wrapper.find("img").exists()).toBeFalsy();
    expect(wrapper.find("video").exists()).toBeTruthy();
    expect(onChange).toHaveBeenCalled();
  });
});

describe("<FileInput /> other mimetype", () => {
  global.URL.createObjectURL = jest.fn();

  let createObjectURL = {};
  const file = new File([blob], 'olongolongo.xls', { type: 'application/vnd.ms-excel' });
  const synteticEvent = { target: { files: [file] } };
  let wrapper = {};

  beforeAll(() => {
    createObjectURL = global.URL.createObjectURL;
    global.URL.createObjectURL = jest.fn();
  });

  beforeEach(() => {
    wrapper = mount(<FileInput onChange={onChange} />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = {};
  });

  afterAll(() => {
    global.URL.createObjectURL = createObjectURL;
  });
  
  test("Should be render and click", () => {
    wrapper.find("input").simulate("change", synteticEvent);
    const html = wrapper.html();
    expect(html).toMatch("Change");
    expect(html).toMatch("olongolongo.xls");
    expect(wrapper.find("img").exists()).toBeFalsy();
    expect(wrapper.find("video").exists()).toBeFalsy();
    expect(onChange).toHaveBeenCalled();
  });
});
