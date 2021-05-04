import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";

import { useGlobalData } from "../";
import { useObj } from "../../hooks";

import { IntActions, IntButtonPads, IntGlobalData } from "../../types";

export interface IntUseButtonHook {
  activateButtonPad: (_id: string) => void;
  createButtonPad: (padNumber: number) => void;
  readButtonPad: (padNumber: number) => IntButtonPads | undefined;
  updateButtonPad: (data: IntButtonPads) => void;
  deleteButtonPad: (_id: string) => void;
  getActiveButton: () => IntButtonPads | undefined;
}

const useButtonHook = (): IntUseButtonHook => {
  const globalData: IntGlobalData = useGlobalData();
  const { actionObj, buttonPadObj } = useObj();

  const activateButtonPad: IntUseButtonHook["activateButtonPad"] = (
    _id: string
  ): void => {
    const state = _cloneDeep(globalData.state);
    if (_id === state.active.buttonPadId) return;

    const action = _find(
      state.actions,
      (f: IntActions) => f.buttonPadId === _id
    );

    state.active.buttonPadId = _id;
    state.active.actionId = action ? action._id : "";
    globalData.setState(state);
  };

  const createButtonPad: IntUseButtonHook["createButtonPad"] = padNumber => {
    const state = _cloneDeep(globalData.state);
    const buttonPad = buttonPadObj();
    buttonPad.profileId = globalData.state.active.profileId;
    buttonPad.pageId = globalData.state.active.pageId;
    buttonPad.buttonPadNum = padNumber;

    state.active.buttonPadId = buttonPad._id;
    state.active.actionId = "";

    state.buttonPads.push(buttonPad);

    const action = actionObj();
    action.profileId = state.active.profileId;
    action.pageId = state.active.pageId;
    action.buttonPadId = state.active.buttonPadId;
    state.actions.push(action);
    state.active.actionId = action._id;

    globalData.setState(state);
  };

  const readButtonPad: IntUseButtonHook["readButtonPad"] = (
    padNumber: number
  ) => {
    const state = _cloneDeep(globalData.state);

    const buttonPad = _find(
      state.buttonPads,
      (f: IntButtonPads) =>
        f.buttonPadNum === padNumber && f.pageId === state.active.pageId
    );

    return buttonPad;
  };

  const getActiveButton: IntUseButtonHook["getActiveButton"] = () => {
    const state = _cloneDeep(globalData.state);

    const buttonPad = _find(
      state.buttonPads,
      (f: IntButtonPads) => f._id === state.active.buttonPadId
    );

    return buttonPad;
  };

  const updateButtonPad: IntUseButtonHook["updateButtonPad"] = (data): void => {
    const state = _cloneDeep(globalData.state);
    const index = _findIndex(
      state.buttonPads,
      (f: IntButtonPads) => f._id === data._id
    );

    if (index === -1) return;
    state.buttonPads[index] = { ...data };
    globalData?.setState(state);
  };

  const deleteButtonPad: IntUseButtonHook["deleteButtonPad"] = _id => {
    const state = _cloneDeep(globalData.state);

    const buttonPads = _filter(
      state.buttonPads,
      (f: IntButtonPads) => f._id !== _id
    );

    const actions = _filter(
      state.actions,
      (f: IntActions) => f.buttonPadId !== _id
    );

    state.buttonPads = buttonPads;
    state.actions = actions;
    state.active.buttonPadId = "";
    state.active.actionId = "";

    globalData.setState(state);
  };

  return {
    activateButtonPad,
    createButtonPad,
    readButtonPad,
    getActiveButton,
    updateButtonPad,
    deleteButtonPad
  };
};

export default useButtonHook;
