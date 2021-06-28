import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import TemplateSideBarHeader from "./sideBarHeader";

import initState from "./__mocks__/mockState.json";

const mockState = { ...initState, setState: jest.fn() };

const mockHooks = {
  createProfile: jest.fn(),
  useGlobalData: mockState
};

jest.mock("../../../../hooks", () => ({
  useProfile: () => ({
    createProfile: mockHooks.createProfile
  }),
  useGlobalData: () => mockHooks.useGlobalData
}));

const testSetup = () => {
  return render(<TemplateSideBarHeader />);
};

let wrapper: any = null;
beforeEach(() => {
  wrapper = testSetup();
});

afterEach(() => {
  wrapper = null;
  jest.clearAllMocks();
});

describe("<Template Header Component/>", () => {
  it("Should render without errors", () => {
    const component = wrapper.getByTestId("template-sidebar-header");
    expect(component).toBeTruthy();
  });

  it("Should have profile count", () => {
    const component = wrapper.getByTestId(
      `template-sidebar-header__profile-count`
    );

    expect(component.innerHTML).toBe(
      mockState.state.profiles.length.toString()
    );
  });

  it("Should call createProfile Hook", () => {
    const button = wrapper.getByTestId(
      `template-sidebar-header__new-profile-button`
    );

    fireEvent.click(button);
    expect(mockHooks.createProfile).toHaveBeenCalledTimes(1);
  });
});
