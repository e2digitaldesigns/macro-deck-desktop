import _cloneDeep from "lodash/cloneDeep";

import { useGlobalData } from "..";
import { IntGlobalContextStateInterface } from "../../types";

import useHelper from "../helper";
import { IntProfilePageButtonPadActions } from "../../types/globalContextType";

export interface IntUseActionHooks {
  activateAction: (_id: string) => void;
  getAction: (_id: string) => any;
}

const useActionHooks = (): IntUseActionHooks => {
  const globalData: IntGlobalContextStateInterface | null = useGlobalData();
  const {
    getProfileIndex,
    getPageIndex,
    getButtonPadIndex,
    getActionIndex
  } = useHelper();

  const activateAction = (_id: string): void => {};

  const getAction = (_id: string): IntProfilePageButtonPadActions => {
    const newState = _cloneDeep(globalData?.state);
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");
    const buttonPadIndex = getButtonPadIndex("null");
    const actionIndex = getActionIndex(_id);

    return newState?.profiles?.[profileIndex].pages?.[pageIndex]?.buttonPads?.[
      buttonPadIndex
    ]?.actions?.[actionIndex];
  };

  return {
    activateAction,
    getAction
  };
};

export default useActionHooks;
