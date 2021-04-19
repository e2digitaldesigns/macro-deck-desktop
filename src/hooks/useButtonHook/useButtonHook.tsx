import _cloneDeep from "lodash/cloneDeep";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import shortid from "shortid";

import { useGlobalData } from "..";

import useHelper from "../helper";

import { IntProfilePageButtonPad } from "../../types";

export interface IntUseButtonHook {
  activateButtonPad: (_id: string, padNumber: number) => void;
  readButtonPad: (padNumber: number) => IntProfilePageButtonPad;
  updateButtonPad: (_id: string, data: IntProfilePageButtonPad) => void;
  deleteButtonPad: (_id: string) => void;
  getActiveButton: () => IntProfilePageButtonPad;
}

const useButtonHook = (): IntUseButtonHook => {
  const globalData: any = useGlobalData();
  const { getPageIndex, getProfileIndex } = useHelper();

  const activateButtonPad = (_id: string, padNumber: number) => {
    const newState = _cloneDeep(globalData?.state);
    const newId = shortid.generate();
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");

    if (!_id) {
      const newButton: IntProfilePageButtonPad = {
        buttonPadNum: padNumber,
        _id: newId,
        text: `Button ${padNumber}`,
        textColor: "",
        icon: "",
        iconColor: "",
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

  const getActiveButton = () => {
    const newState = _cloneDeep(globalData?.state);
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");
    const buttonIndex = globalData?.state?.activeProfile?.buttonPad?.index;

    return newState.profiles[profileIndex].pages[pageIndex].buttonPads[
      buttonIndex
    ];
  };

  const updateButtonPad = (_id: string, data: IntProfilePageButtonPad) => {
    const newState = _cloneDeep(globalData?.state);
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");
    const buttonIndex = globalData?.state?.activeProfile?.buttonPad?.index;

    newState.profiles[profileIndex].pages[pageIndex].buttonPads[buttonIndex] = {
      ...data
    };
    globalData?.setState(newState);
  };

  const deleteButtonPad = (_id: string) => {
    const newState = _cloneDeep(globalData?.state);
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");

    const buttonPadIndex = _findIndex(
      newState?.profiles?.[profileIndex]?.pages[pageIndex].buttonPads,
      (f: any) => {
        return f._id === _id;
      }
    );

    if (buttonPadIndex <= -1) return;

    newState.profiles[profileIndex].pages[pageIndex].buttonPads[
      buttonPadIndex
    ] = [];

    globalData?.setState(newState);
  };

  return {
    activateButtonPad,
    readButtonPad,
    getActiveButton,
    updateButtonPad,
    deleteButtonPad
  };
};

export default useButtonHook;
