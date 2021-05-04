import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _sortBy from "lodash/sortBy";

import { useGlobalData } from "..";
import {
  IntProfile,
  IntButtonPads,
  IntActions,
  IntGlobalData,
  IntPages,
  IntGlobalContextInterface
} from "../../types";

import { useObj } from "../../hooks";

export interface IntEditState {
  editing: boolean;
  profileName: string;
  buttonPads: number;
}

export interface IntUseProfileHook {
  activateProfile: (_id: string) => void;
  createProfile: () => void;
  readProfiles: () => IntProfile[];
  readProfile: () => IntProfile;
  updateProfile: (_id: string, profileState: IntEditState) => void;
  deleteProfile: (_id: string) => void;
}

const useProfileHook = (): IntUseProfileHook => {
  const globalData: IntGlobalData = useGlobalData();
  const { pageObj, profileObj } = useObj();

  const activateProfile: IntUseProfileHook["activateProfile"] = (_id): void => {
    const state: IntGlobalContextInterface = _cloneDeep(globalData.state);
    const pages = _sortBy(
      _filter(state?.pages, (f: IntPages) => f.profileId === _id),
      "order"
    );

    state.active.profileId = _id;
    state.active.pageId = pages?.[0]?._id;
    state.active.buttonPadId = "";
    state.active.actionId = "";
    globalData.setState(state);
  };

  const createProfile = () => {
    const state = _cloneDeep(globalData.state);
    const profile = profileObj();
    const page = pageObj();
    page.profileId = profile._id;
    state.profiles.push(profile);
    state.pages.push(page);
    state.active.profileId = profile._id;
    state.active.pageId = page._id;
    globalData.setState(state);
  };

  const readProfiles = (): IntProfile[] | any => {
    const state = _cloneDeep(globalData.state);
    const profiles = state.profiles;
    return profiles;
  };

  const readProfile = (): IntProfile | any => {
    const state = _cloneDeep(globalData.state);

    const profile = _find(
      state.profiles,
      (f: IntProfile) => f._id === state.active.profileId
    );

    return profile;
  };

  const updateProfile = (_id: string, profileState: IntEditState): void => {
    const state = _cloneDeep(globalData.state);
    const profileIndex = _findIndex(
      state.profiles,
      (f: IntProfile) => f._id === _id
    );

    state.profiles[profileIndex].profileName = profileState.profileName;
    state.profiles[profileIndex].buttonPads = Number(profileState.buttonPads);
    globalData.setState(state);
  };

  const deleteProfile: IntUseProfileHook["deleteProfile"] = (
    _id: string
  ): void => {
    const state: IntGlobalContextInterface = _cloneDeep(globalData.state);
    state.profiles = _filter(state.profiles, (f: IntProfile) => f._id !== _id);
    if (state.profiles.length === 0) return;

    state.pages = _filter(state.pages, (f: IntPages) => f.profileId !== _id);

    state.buttonPads = _filter(
      state.buttonPads,
      (f: IntButtonPads) => f.profileId !== _id
    );

    state.actions = _filter(
      state.actions,
      (f: IntActions) => f.profileId !== _id
    );

    if (state.active.profileId === _id) {
      state.active.profileId = "";
      state.active.pageId = "";
      state.active.buttonPadId = "";
      state.active.actionId = "";
    }

    globalData.setState(state);
  };

  return {
    activateProfile,
    createProfile,
    readProfiles,
    readProfile,
    updateProfile,
    deleteProfile
  };
};

export default useProfileHook;
