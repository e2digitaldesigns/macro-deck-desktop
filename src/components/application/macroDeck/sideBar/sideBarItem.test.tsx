import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SideBarItems from "./sideBarItem";
import * as hooks from "../../../../hooks";
import * as useProfileHook from "../../../../hooks/useProfileHook";

const mockData = {
  _id: "the-id",
  profileName: "the profile name",
  buttonPads: 24
};

const mockState = {
  userInformation: {
    _id: "",
    name: ""
  },
  templateInformation: {
    sideBarState: ""
  },
  settings: {},
  active: {
    profileId: "",
    buttonPadId: "",
    actionId: "",
    pageId: ""
  },
  profiles: [],
  pages: [],
  buttonPads: []
};

const mockUseProfile = {
  deleteProfile: () => jest.fn(),
  activateProfile: () => jest.fn(),
  updateProfile: () => jest.fn()
};

jest.mock("../../../hooks", () => ({
  useProfile: () => ({
    deleteProfile: () => jest.fn(),
    activateProfile: () => jest.fn(),
    updateProfile: () => jest.fn()
  }),
  useGlobalData: () => mockState
}));

const preFix = "template-sidebar-item__";

const testSetup = () => {
  return render(<SideBarItems profile={mockData} />);
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
    const component = wrapper.getByTestId(preFix + "component");
    expect(component).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it("Should toggle menu-item-active class", () => {
    const component = wrapper.getByTestId(preFix + "component");
    expect(component).toHaveClass("menu-item-inactive");

    const menuItemButton = wrapper.getByTestId(
      preFix + "component-menu-item-button"
    );
    expect(menuItemButton).toBeTruthy();

    fireEvent.click(menuItemButton);

    waitFor(() => {
      expect(component).toHaveClass("menu-item-active");
    });
  });

  it("Should delete profile", () => {
    const component = wrapper.getByTestId(preFix + "component");
    const deleteItemButton = wrapper.getByTestId(preFix + "button-remove");
    expect(deleteItemButton).toBeTruthy();

    fireEvent.click(deleteItemButton);
  });

  it("Should render header information", () => {
    const component = wrapper.getByTestId(preFix + "button-text");

    expect(component).toBeTruthy();
    expect(component).toHaveTextContent(
      `${mockData.profileName} (${mockData.buttonPads})`
    );
  });

  it("Should render ProfileName values", () => {
    const component = wrapper.getByTestId(preFix + "input_profile-name");

    expect(component).toBeTruthy();
    expect(component.value).toBe(mockData.profileName);
  });

  it("Should render ButtonPad values", () => {
    const component = wrapper.getByTestId(preFix + "select-button-pads");

    expect(component).toBeTruthy();
    expect(component.value).toBe(mockData.buttonPads.toString());
  });

  it("Should render submit button", () => {
    const submitButton = wrapper.getByTestId(preFix + "button-submit");
    expect(submitButton).toBeTruthy();
  });

  it("Update should succeed", () => {
    const spy = jest.spyOn(hooks, "useProfile");

    const submitButton = wrapper.getByTestId(preFix + "button-submit");
    const newNameGood = "New Profile Name XXXXX XXXXX XXXXX";
    // const newPadCount = 12;

    const input = wrapper.getByTestId(preFix + "input_profile-name");
    fireEvent.change(input, { target: { value: newNameGood } });
    expect(input.value).toBe(newNameGood);

    // const select = wrapper.getByTestId(preFix + "select-button-pads");
    // fireEvent.change(select, { target: { value: newPadCount } });
    // expect(select.value).toBe(newPadCount.toString());

    fireEvent.click(submitButton);
    // expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

it("Update should fail", () => {
  const submitButton = wrapper.getByTestId(preFix + "button-submit");
  const newNameBad = "Ne";

  const input = wrapper.getByTestId(preFix + "input_profile-name");
  fireEvent.change(input, { target: { value: newNameBad } });
  expect(input.value).toBe(newNameBad);

  fireEvent.click(submitButton);

  waitFor(() => {
    expect(input).toHaveFocus();
  });
});
