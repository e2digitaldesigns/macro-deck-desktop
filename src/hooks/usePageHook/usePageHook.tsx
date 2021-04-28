import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _sortBy from "lodash/sortBy";

import { useGlobalData } from "../";
import { useObj } from "../../hooks";

import {
  IntGlobalData,
  IntPages,
  IntGlobalContextInterface,
  IntButtonPads,
  IntActions
} from "../../types";

export interface IntUsePageHook {
  activatePage: (_id: string) => void;
  createPage: () => void;
  deletePage: () => void;
  readPages: () => IntPages[];
}

const usePageHook = (): IntUsePageHook => {
  const globalData: IntGlobalData = useGlobalData();
  const { pageObj } = useObj();

  const activatePage: IntUsePageHook["activatePage"] = _id => {
    const state: IntGlobalContextInterface = _cloneDeep(globalData.state);
    state.active.pageId = _id;
    globalData.setState(state);
  };

  const readPages: IntUsePageHook["readPages"] = () => {
    const state: IntGlobalContextInterface = _cloneDeep(globalData.state);

    const pages = _sortBy(
      _filter(
        state?.pages,
        (f: IntPages) => f.profileId === state.active.profileId
      ),
      "order"
    );

    return pages;
  };

  const createPage = () => {
    const state: IntGlobalContextInterface = _cloneDeep(globalData.state);
    const page: IntPages = pageObj();
    page.profileId = state.active.profileId;
    state.pages.push(page);
    globalData.setState(state);
  };

  const deletePage: IntUsePageHook["deletePage"] = () => {
    const state: IntGlobalContextInterface = _cloneDeep(globalData.state);

    state.pages = _filter(
      state.pages,
      (f: IntPages) =>
        f.profileId === state.active.profileId && f._id !== state.active.pageId
    );

    if (state.pages.length === 0) return;

    state.buttonPads = _filter(
      state.buttonPads,
      (f: IntButtonPads) => f.pageId !== state.active.pageId
    );

    state.actions = _filter(
      state.actions,
      (f: IntActions) => f.pageId !== state.active.pageId
    );

    const nextPage = _find(
      state.pages,
      (f: any) => f.profileId === state.active.profileId
    );

    state.active.pageId = nextPage ? nextPage._id : "";
    state.active.buttonPadId = "";
    state.active.actionId = "";

    globalData.setState(state);
  };

  return {
    activatePage,
    createPage,
    deletePage,
    readPages
  };
};

export default usePageHook;
