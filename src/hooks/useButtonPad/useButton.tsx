import _cloneDeep from "lodash/cloneDeep";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import shortid from "shortid";

import { useGlobalData } from "./../../hooks";

import useHelper from "../helper";

import { iProfilePageButtonPad } from "../useGlobalData/globalContext";

export interface UseButtonProps {
  activateButtonPad: (_id: string, padNumber: number) => void;
  readButtonPad: (padNumber: number) => iProfilePageButtonPad;
  updateButtonPad: (_id: string) => void;
  deleteButtonPad: (_id: string) => void;
}

const useButton = (): UseButtonProps => {
  const globalData: any = useGlobalData();
  const { getPageIndex, getProfileIndex } = useHelper();

  const activateButtonPad = (_id: string, padNumber: number) => {
    const newState = _cloneDeep(globalData?.state);
    const newId = shortid.generate();
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");

    if (!_id) {
      const newButton = {
        buttonPadNum: padNumber,
        _id: newId,
        text: `Button ${padNumber}`,
        icon: "",
        image: "",
        bgColor: "",
        actions: []
      };

      newState.profiles[profileIndex].pages[pageIndex].buttonPads.push(
        newButton
      );
    }

    newState.activeProfile.buttonPad._id = _id ? _id : newId;
    const buttonIndex = _findIndex(
      newState.profiles[profileIndex].pages[pageIndex].buttonPads,
      (f: any) => {
        return f._id === newState.activeProfile.buttonPad._id;
      }
    );

    newState.activeProfile.buttonPad.index = buttonIndex;
    globalData?.setState(newState);
  };

  const readButtonPad = (padNumber: number) => {
    const profileIndex = getProfileIndex();

    const newState = _cloneDeep(globalData?.state);
    const buttonPage = _find(
      newState?.profiles?.[profileIndex]?.pages,
      f => f._id === newState?.activeProfile?.page?._id
    );

    const buttonPad = _find(
      buttonPage?.buttonPads,
      f => f.buttonPadNum === padNumber
    );

    return buttonPad;
  };

  const updateButtonPad = (_id: string) => {};
  const deleteButtonPad = (_id: string) => {};

  return {
    activateButtonPad,
    readButtonPad,
    updateButtonPad,
    deleteButtonPad
  };
};

export default useButton;
