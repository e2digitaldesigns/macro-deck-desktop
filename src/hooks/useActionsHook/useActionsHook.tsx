import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _find from "lodash/find";

import { useGlobalData } from "../";

import { useObj } from "../../hooks";

import { IntActions, IntGlobalData } from "../../types/globalContextType";

export interface IntUseActionHooks {
  activateAction: (_id: string) => void;
  getActions: () => IntActions[];
  getAction: (_id: string) => IntActions | undefined;
  createAction: () => void;
  deleteAction: (_id: string) => void;
  updateAction: (action: any) => void;
}

const useActionHooks = (): IntUseActionHooks => {
  const globalData: IntGlobalData = useGlobalData();
  const { actionObj } = useObj();

  const activateAction: IntUseActionHooks["activateAction"] = (_id): void => {
    const state = _cloneDeep(globalData.state);
    state.active.actionId = _id;
    globalData.setState(state);
  };

  const createAction: IntUseActionHooks["createAction"] = (): void => {
    const state = _cloneDeep(globalData.state);
    const action = actionObj();
    if (!state.active.buttonPadId) return;
    action.profileId = state.active.profileId;
    action.pageId = state.active.pageId;
    action.buttonPadId = state.active.buttonPadId;
    state.actions.push(action);
    globalData?.setState(state);
  };

  const getActions: IntUseActionHooks["getActions"] = () => {
    const state = _cloneDeep(globalData.state);
    const actions = _filter(
      state.actions,
      (f: IntActions) => f.buttonPadId === state.active.buttonPadId
    );

    return actions;
  };

  const getAction: IntUseActionHooks["getAction"] = _id => {
    const actions = _cloneDeep(globalData.state.actions);
    const action: IntActions | undefined = _find(
      actions,
      (f: IntActions) => f._id === _id
    );

    return action;
  };

  const deleteAction: IntUseActionHooks["deleteAction"] = (
    _id: string
  ): void => {
    const state = _cloneDeep(globalData.state);
    const actions = _filter(state.actions, (f: IntActions) => f._id !== _id);
    if (state.active.actionId === _id) state.active.actionId = "";
    state.actions = actions;
    globalData?.setState(state);
  };

  const updateAction: IntUseActionHooks["updateAction"] = (
    action: IntActions
  ) => {
    const state = _cloneDeep(globalData.state);
    const index = _findIndex(
      state.actions,
      (f: IntActions) => f._id === action._id
    );

    if (index === -1) return;
    state.actions[index] = { ...action };
    globalData?.setState(state);
  };

  return {
    activateAction,
    getActions,
    getAction,
    createAction,
    deleteAction,
    updateAction
  };
};

export default useActionHooks;
