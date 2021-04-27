import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";

import { useGlobalData } from "..";
import { IntButtonsProfile } from "../../types";

import { useHelper, useObj } from "../../hooks";

export interface IntEditState {
  editing: boolean;
  profileName: string | undefined;
  buttonPads: number | undefined;
}

export interface IntUseProfileHook {
  activateProfile: (_id: string) => void;
  createProfile: () => void;
  readProfile: () => IntButtonsProfile | undefined;
  updateProfile: (_id: string, state: IntEditState) => void;
  deleteProfile: (_id: string) => void;
}

const useProfileHook = (): IntUseProfileHook => {
  const globalData: any = useGlobalData();
  const { profileObj } = useObj();
  const { getProfileIndex } = useHelper();

  const activateProfile: IntUseProfileHook["activateProfile"] = (_id): void => {
    const newState = _cloneDeep(globalData?.state);
    const profile = _find(newState.profiles, { _id });
    const index = _findIndex(newState.profiles, (f: any) => {
      return f._id === _id;
    });

    console.clear();
    console.log(37, { index });

    newState.activeProfile = {
      _id,
      index: index,
      page: { _id: profile?.pages?.[0]?._id, index: 0 },
      buttonPad: { _id: undefined, index: -1 },
      action: { _id: undefined, index: -1 }
    };

    globalData?.setState(newState);
  };

  const createProfile = () => {
    const newState = _cloneDeep(globalData?.state);
    const newProfile: IntButtonsProfile = profileObj();
    newState?.profiles.push(newProfile);
    globalData?.setState(newState);
  };

  const readProfile = () => {
    const index = getProfileIndex();

    if (index > -1) {
      return globalData?.state?.profiles?.[index];
    }

    return undefined;
  };

  const updateProfile = (_id: string, state: IntEditState): void => {
    const newState = _cloneDeep(globalData?.state);
    const index = _findIndex(newState.profiles, (f: any) => {
      return f._id === _id;
    });
    if (index < 0) return;
    newState.profiles[index].buttonPads = Number(state.buttonPads);
    newState.profiles[index].profileName = state?.profileName;
    globalData?.setState(newState);
  };

  const deleteProfile = (_id: string): void => {
    const newState = _cloneDeep(globalData?.state);
    newState.profiles = _filter(newState.profiles, f => f._id !== _id);

    if (globalData?.state?.activeProfile?._id === _id) {
      newState.activeProfile = {
        _id: undefined,
        index: -1,
        page: { _id: undefined, index: -1 },
        buttonPad: { _id: undefined, index: -1 },
        action: { _id: undefined, index: -1 }
      };
    }

    globalData?.setState(newState);
  };

  return {
    activateProfile,
    createProfile,
    readProfile,
    updateProfile,
    deleteProfile
  };
};

export default useProfileHook;
