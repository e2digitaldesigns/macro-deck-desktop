import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import useProfile from "./useProfileHook";
import { useGlobalData } from "..";

import initState from "./../__mocks__/mockState.json";
import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";

const mockState: any = {
  ..._cloneDeep(initState),
  setState: jest.fn(state => state)
};

const mockHooks = {
  useGlobalData: mockState,
  pageObj: jest.fn(),
  profileObj: jest.fn(),
  page: { profileId: "", _id: "page-id-002", order: 0 },
  profile: {
    _id: "profile-id-004",
    profileName: "New Profile",
    buttonPads: 12
  },

  mockFn: jest.fn()
};

jest.mock("./../../hooks", () => ({
  useGlobalData: () => mockHooks.useGlobalData,
  useObj: () => ({
    profileObj: () => mockHooks.profile,
    pageObj: () => mockHooks.page
  })
}));

const useContextSpy = jest.spyOn(React, "useContext");

beforeEach(() => {
  mockState.state = _cloneDeep(initState.state);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Use Profile Hook", () => {
  const {
    activateProfile,
    createProfile,
    readProfiles,
    readProfile,
    updateProfile,
    deleteProfile
  } = useProfile();

  it("Should activate a profile", () => {
    activateProfile(mockState.state.profiles[0]._id);
    const newState = { ...mockState.state };
    newState.active.profileId = mockState.state.profiles[0]._id;
    newState.active.pageId = mockState.state.pages[0]._id;
    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledWith(newState);
  });

  it("Should create a profile", () => {
    createProfile();
    expect(mockHooks.useGlobalData.setState).toHaveBeenCalled();
  });

  it("Should read all profiles", () => {
    const profiles = readProfiles();
    expect(profiles.length).toBe(mockState.state.profiles.length);
    expect(profiles).toEqual(mockState.state.profiles);
  });

  it("Should read a profile", () => {
    mockState.state.active.profileId = mockState.state.profiles[0]._id;
    const profile = readProfile();
    expect(typeof profile).toBe("object");
    expect(typeof profile._id).toBe("string");
    expect(profile).toEqual(mockState.state.profiles[0]);
  });

  it("Should update a profile", () => {
    const profile = mockState.state.profiles[0];
    const state = {
      editing: true,
      profileName: "Cool Name Dude",
      buttonPads: 12
    };

    updateProfile(profile._id, state);

    const newState = { ...mockState.state };
    newState.profiles[0].profileName = state.profileName;
    newState.profiles[0].buttonPads = state.buttonPads;
    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledWith(newState);
  });

  it("Should delete a profile", () => {
    const profileId = mockState.state.profiles[2]._id;
    const newState = { ...mockState.state };
    deleteProfile(profileId);
    newState.profiles = newState.profiles.filter(
      (obj: any) => obj._id !== profileId
    );

    const actions = newState.actions.filter(
      (obj: any) => obj.profileId !== profileId
    );

    newState.actions = actions;

    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledWith(newState);
  });

  it("Should not delete a profile", () => {
    mockState.state.profiles = [];
    deleteProfile("xxxxx");
    expect(mockHooks.useGlobalData.setState).not.toHaveBeenCalled();
  });

  it("Should delete a profile and reset active", () => {
    const profileId = mockState.state.profiles[2]._id;
    mockState.state.active.profileId = profileId;

    const newState = { ...mockState.state };
    deleteProfile(profileId);

    newState.profiles = newState.profiles.filter(
      (obj: any) => obj._id !== profileId
    );

    newState.active.profileId = "";

    const actions = newState.actions.filter(
      (obj: any) => obj.profileId !== profileId
    );

    newState.actions = actions;

    expect(mockHooks.useGlobalData.setState).toHaveBeenCalledWith(newState);
  });
});
