import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TemplateSideBar from "./sideBar";
import initState from "./__mocks__/mockState.json";

let mockState = { ...initState, setState: jest.fn() };

const mockHooks = {
  activateProfile: jest.fn(),
  createProfile: jest.fn(),
  readProfiles: jest.fn(),
  readProfile: jest.fn(),
  updateProfile: jest.fn(),
  deleteProfile: jest.fn(),
  useGlobalData: mockState
};

jest.mock("../../../../hooks", () => ({
  useProfile: () => ({
    activateProfile: (_id: string) => {
      mockHooks.activateProfile(_id);
      mockState.state.active.profileId = _id;
    },
    updateProfile: (_id: string, profileState: any) =>
      mockHooks.updateProfile(_id, profileState),
    deleteProfile: mockHooks.deleteProfile
  }),
  useGlobalData: () => mockHooks.useGlobalData
}));

const testSetup = () => {
  return render(<TemplateSideBar />);
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
    const component = wrapper.getByTestId("template-sidebar-component");
    expect(component).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
