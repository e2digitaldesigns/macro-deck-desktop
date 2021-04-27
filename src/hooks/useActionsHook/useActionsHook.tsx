import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";

import { useGlobalData } from "../";

import { useHelper, useObj } from "../../hooks";

import {
  IntGlobalContextStateInterface,
  IntProfilePageButtonPadActions
} from "../../types/globalContextType";

export interface IntUseActionHooks {
  activateAction: (_id: string) => void;
  getAction: (_id: string) => IntProfilePageButtonPadActions;
  createAction: () => void;
  deleteAction: (_id: string) => void;
  updateAction: (action: any) => void;
}

const useActionHooks = (): IntUseActionHooks => {
  const globalData: IntGlobalContextStateInterface | null = useGlobalData();
  const { actionObj } = useObj();
  const {
    getProfileIndex,
    getPageIndex,
    getButtonPadIndex,
    getActionIndex
  } = useHelper();

  const activateAction: IntUseActionHooks["activateAction"] = (_id): void => {
    const newState: any = _cloneDeep(globalData?.state);
    const index = getActionIndex(_id);

    newState.activeProfile.action._id = _id;
    newState.activeProfile.action.index = index;
    globalData?.setState(newState);
  };

  const getAction: IntUseActionHooks["getAction"] = (
    _id: string
  ): IntProfilePageButtonPadActions => {
    const newState = _cloneDeep(globalData?.state);
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");
    const buttonPadIndex = getButtonPadIndex("null");
    const actionIndex = getActionIndex(_id);

    return newState?.profiles?.[profileIndex].pages?.[pageIndex]?.buttonPads?.[
      buttonPadIndex
    ]?.actions?.[actionIndex];
  };

  const createAction: IntUseActionHooks["createAction"] = (): void => {
    const newAction = actionObj();
    const newState = _cloneDeep(globalData?.state);
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");
    const buttonPadIndex = getButtonPadIndex("null");

    newState?.profiles?.[profileIndex].pages?.[pageIndex]?.buttonPads?.[
      buttonPadIndex
    ]?.actions.push(newAction);

    globalData?.setState(newState);
  };

  const deleteAction: IntUseActionHooks["deleteAction"] = (
    _id: string
  ): void => {
    const newState = _cloneDeep(globalData?.state);
    if (!newState) return;

    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");
    const buttonPadIndex = getButtonPadIndex("null");

    const actions =
      newState?.profiles?.[profileIndex]?.pages?.[pageIndex].buttonPads?.[
        buttonPadIndex
      ]?.actions;

    const newActions = _filter(actions, f => f._id !== _id);

    newState.profiles[profileIndex].pages[pageIndex].buttonPads[
      buttonPadIndex
    ].actions = newActions;

    if (newState.activeProfile?.action?._id === _id) {
      newState.activeProfile.action._id = "";
      newState.activeProfile.action.index = -1;
    }

    globalData?.setState(newState);
  };

  const updateAction: IntUseActionHooks["updateAction"] = (
    action: IntProfilePageButtonPadActions
  ): void => {
    const newState = _cloneDeep(globalData?.state);
    if (!newState) return;
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");
    const buttonPadIndex = getButtonPadIndex("null");
    const actionIndex = getActionIndex(action._id);

    newState.profiles[profileIndex].pages[pageIndex].buttonPads[
      buttonPadIndex
    ].actions[actionIndex] = { ...action };

    globalData?.setState(newState);
  };

  return {
    activateAction,
    getAction,
    createAction,
    deleteAction,
    updateAction
  };
};

export default useActionHooks;
