import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SideBarItems from "./sideBarItem";
import initState from "./__mocks__/mockState.json";

const mockState = { ...initState, setState: jest.fn() };

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

const preFix = "template-sidebar-item__";

const testSetup = () => {
  return render(<SideBarItems profile={mockState.state.profiles[0]} />);
};

let wrapper: any = null;
beforeEach(() => {
  mockState.state.active.profileId = "";
  wrapper = testSetup();
});

afterEach(() => {
  wrapper = null;
  jest.clearAllMocks();
});

describe("<SideBarItem/>", () => {
  it("Should render without errors", () => {
    const component = wrapper.getByTestId(preFix + "component");
    expect(component).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it("Should toggle menu-item-active class", () => {
    const component = wrapper.getByTestId(preFix + "component");
    expect(component).toHaveClass("menu-item-inactive");
  });

  it("Should call ActivateProfile Hook", () => {
    const menuItemButton = wrapper.getByTestId(
      `${preFix}component-menu-item-button`
    );

    fireEvent.click(menuItemButton);
    expect(mockHooks.activateProfile).toHaveBeenCalledTimes(1);
    expect(mockHooks.activateProfile).toHaveBeenCalledWith(
      mockState.state.profiles[0]._id
    );
  });

  it("Should not call ActivateProfile Hook", () => {
    const menuItemButton = wrapper.getByTestId(
      `${preFix}component-menu-item-button`
    );

    fireEvent.click(menuItemButton);
    expect(mockHooks.activateProfile).toHaveBeenCalledTimes(1);
    expect(mockHooks.activateProfile).toHaveBeenCalledWith(
      mockState.state.profiles[0]._id
    );

    const editButton = wrapper.getByTestId(preFix + "button-edit");
    fireEvent.click(editButton);

    fireEvent.click(menuItemButton);
    expect(mockHooks.activateProfile).toHaveBeenCalledTimes(1);
  });

  it("should toggle button edit", async () => {
    const menuItemButton = wrapper.getByTestId(
      `${preFix}component-menu-item-button`
    );

    fireEvent.click(menuItemButton);

    const editButton = wrapper.getByTestId(preFix + "button-edit");
    fireEvent.click(editButton);

    const component = await screen.queryByTestId(
      preFix + "menu-item-information-wrapper"
    );

    expect(component).toHaveClass("menu-item-information-active");
  });

  it("Should delete profile", () => {
    const deleteItemButton = wrapper.getByTestId(preFix + "button-remove");
    expect(deleteItemButton).toBeTruthy();
    fireEvent.click(deleteItemButton);
    expect(mockHooks.deleteProfile).toHaveBeenCalledTimes(1);
  });

  it("Should delete profile and set editing to false", () => {
    const menuItemButton = wrapper.getByTestId(
      `${preFix}component-menu-item-button`
    );

    fireEvent.click(menuItemButton);

    const editButton = wrapper.getByTestId(preFix + "button-edit");
    fireEvent.click(editButton);

    const deleteItemButton = wrapper.getByTestId(preFix + "button-remove");
    expect(deleteItemButton).toBeTruthy();
    fireEvent.click(deleteItemButton);
    expect(mockHooks.deleteProfile).toHaveBeenCalledTimes(1);
  });

  it("Should render submit button", () => {
    const submitButton = wrapper.getByTestId(preFix + "button-submit");
    expect(submitButton).toBeTruthy();
  });

  it("Profile name regex should succeed", () => {
    const profileName = "New Profile Name";

    const input = wrapper.getByTestId(preFix + "input_profile-name");
    fireEvent.change(input, { target: { value: profileName } });
    expect(input.value).toBe(profileName);
  });

  it("Profile name regex should fail", () => {
    const profileName = "@@@@????";

    const input = wrapper.getByTestId(preFix + "input_profile-name");
    fireEvent.change(input, { target: { value: profileName } });
    expect(input.value).toBe(mockState.state.profiles[0].profileName);
  });

  it("Update submit should succeed", async () => {
    const submitButton = wrapper.getByTestId(preFix + "button-submit");
    const profileName = "New Profile Name";
    const input = wrapper.getByTestId(preFix + "input_profile-name");
    fireEvent.change(input, { target: { value: profileName } });
    expect(input.value).toBe(profileName);

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockHooks.updateProfile).toHaveBeenCalledTimes(1);
    });
  });

  it("Update submit should fail", async () => {
    const submitButton = wrapper.getByTestId(preFix + "button-submit");
    const profileName = "Ne";
    const input = wrapper.getByTestId(preFix + "input_profile-name");
    fireEvent.change(input, { target: { value: profileName } });
    expect(input.value).toBe(profileName);

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockHooks.updateProfile).toHaveBeenCalledTimes(0);
    });

    expect(input).toHaveFocus();
  });
});
