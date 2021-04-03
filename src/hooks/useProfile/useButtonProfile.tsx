import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import shortid from "shortid";

import { useGlobalData } from "./../../hooks";
import { iButtonsProfile } from "../useGlobalData/globalContext";

import useHelper from "../helper";

export interface intEditState {
  editing: boolean;
  profileName: string | undefined;
  buttonPads: number | undefined;
}

export interface UseButtonProfileProps {
  activateProfile: (_id: string) => void;
  createProfile: () => void;
  readProfile: () => iButtonsProfile | undefined;
  updateProfile: (_id: string, state: intEditState) => void;
  deleteProfile: (_id: string) => void;
}

const useProfile = (): UseButtonProfileProps => {
  const globalData: any = useGlobalData();
  const { getProfileIndex } = useHelper();

  const activateProfile = (_id: string): void => {
    const newState = _cloneDeep(globalData?.state);
    const profile = _find(newState.profiles, { _id });

    newState.activeProfile = {
      _id,
      index: 0,
      page: { _id: profile?.pages?.[0]?._id, index: 0 },
      buttonPad: {}
    };

    globalData?.setState(newState);
  };

  const createProfile = () => {
    const newState = _cloneDeep(globalData?.state);
    const newProfile: iButtonsProfile = {
      _id: shortid.generate(),
      profileName: "New Profile",
      buttonPads: 12,
      pages: []
    };

    newState?.profiles && newState?.profiles.push(newProfile);
    globalData?.setState(newState);
  };

  const readProfile = () => {
    const index = getProfileIndex();

    if (index > -1) {
      return globalData?.state?.profiles?.[index];
    }

    return undefined;
  };

  const updateProfile = (_id: string, state: intEditState): void => {
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
        index: undefined,
        page: { _id: undefined, index: undefined },
        buttonPad: {}
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

export default useProfile;
