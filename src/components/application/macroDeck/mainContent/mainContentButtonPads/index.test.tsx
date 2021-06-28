import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MainContentButtonPads from "./index";
import * as hooks from "../../../../../hooks";

import initState from "./__mocks__/mockState.json";

const mockState = { ...initState, setState: jest.fn() };

const mockHooks = {
  readProfile: jest.fn(),
  activateButtonPad: jest.fn(),
  createButtonPad: jest.fn(),
  deleteButtonPad: jest.fn(),
  readButtonPad: jest.fn(),
  useGlobalData: jest.fn()
};

jest.mock("../../../../../hooks", () => ({
  useButton: () => ({
    activateButtonPad: mockHooks.activateButtonPad,
    createButtonPad: mockHooks.createButtonPad,
    deleteButtonPad: mockHooks.deleteButtonPad,
    readButtonPad: mockHooks.readButtonPad
  }),

  useProfile: () => ({
    readProfile: mockHooks.readProfile
  }),

  useGlobalData: () => mockState
}));

const prefix = "main-content-button-pads__";

const testSetup = () => {
  return render(<MainContentButtonPads />);
};

let wrapper: any = null;
beforeEach(() => {
  mockState.state.active.profileId = "";
  // wrapper = testSetup();
});

afterEach(() => {
  wrapper = null;
  jest.clearAllMocks();
});

describe("<Template Header Component/>", () => {
  it("Should have a blank rendering", () => {
    mockHooks.readProfile.mockImplementation(() => mockState.state.profiles[0]);
    wrapper = testSetup();
    const component = wrapper.queryByTestId(`${prefix}null`);
    expect(component).toBeTruthy();
    expect(mockHooks.readProfile).toHaveBeenCalled();
  });

  it("Should match snapshot", () => {
    mockHooks.readProfile.mockImplementation(() => mockState.state.profiles[0]);
    mockState.state.active.profileId = mockState.state.profiles[0]._id;
    wrapper = testSetup();
    const component = wrapper.queryByTestId(`${prefix}button-pad-wrapper`);
    expect(component).toMatchSnapshot();
  });

  it("Should render without errors", () => {
    mockHooks.readProfile.mockImplementation(() => mockState.state.profiles[0]);
    mockState.state.active.profileId = mockState.state.profiles[0]._id;
    wrapper = testSetup();
    const component = wrapper.queryByTestId(`${prefix}button-pad-wrapper`);
    expect(component).toBeTruthy();
  });

  it("Should render 32 pads", () => {
    mockHooks.readProfile.mockImplementation(() => mockState.state.profiles[1]);
    mockState.state.active.profileId = mockState.state.profiles[1]._id;
    wrapper = testSetup();
    const component = wrapper.queryByTestId(`${prefix}button-pad-wrapper`);
    expect(component).toBeTruthy();
  });

  it("Should match 32 pads snapshot", () => {
    mockState.state.active.profileId = mockState.state.profiles[1]._id;
    mockHooks.readProfile.mockImplementation(() => mockState.state.profiles[1]);
    wrapper = testSetup();
    const component = wrapper.queryByTestId(`${prefix}button-pad-wrapper`);
    expect(component).toMatchSnapshot();
  });

  it("Should render 0 pads", () => {
    mockState.state.active.profileId = mockState.state.profiles[2]._id;
    mockHooks.readProfile.mockImplementation(() => mockState.state.profiles[2]);
    wrapper = testSetup();
    const component = wrapper.queryByTestId(`${prefix}button-pad-wrapper`);
    expect(component).toBeTruthy();
  });

  it("Should match 0 pads snapshot", () => {
    mockState.state.active.profileId = mockState.state.profiles[2]._id;
    mockHooks.readProfile.mockImplementation(() => mockState.state.profiles[2]);
    wrapper = testSetup();
    const component = wrapper.queryByTestId(`${prefix}button-pad-wrapper`);
    expect(component).toMatchSnapshot();
  });
});
