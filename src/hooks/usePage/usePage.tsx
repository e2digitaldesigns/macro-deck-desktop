import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import shortid from "shortid";

import { useGlobalData } from "./../../hooks";

import useHelper from "../helper";

import { iProfilePages } from "../useGlobalData/globalContext";

export interface UsePageProps {
  createProfilePage: () => void;
  readProfilePage: () => any;
  changeProfilePage: (pageId: string) => void;
  deleteProfilePage: () => void;
}

const usePage = (): UsePageProps => {
  const globalData: any = useGlobalData();
  const { getPageIndex, getProfileIndex } = useHelper();

  const changeProfilePage = (pageId: string) => {
    const newState = _cloneDeep(globalData?.state);
    newState.activeProfile.page._id = pageId;
    newState.activeProfile.page.index = getPageIndex(pageId);
    globalData?.setState(newState);
  };

  const createProfilePage = () => {
    const index = getProfileIndex();
    if (index === -1) return;
    const newState = _cloneDeep(globalData?.state);
    const pageId = shortid.generate();
    const newPage: iProfilePages = {
      _id: pageId,
      buttonPads: []
    };

    newState?.profiles && newState?.profiles?.[index].pages.push(newPage);
    if (newState?.profiles && newState?.profiles?.[index].pages.length === 1) {
      newState.activeProfile.page._id = pageId;
      newState.activeProfile.page.index = 0;
    }
    globalData?.setState(newState);
  };

  const readProfilePage = () => {};

  const deleteProfilePage = () => {
    const newState = _cloneDeep(globalData?.state);
    const pages = newState?.profiles?.[newState.activeProfile.index]?.pages;

    if (pages.length <= 1) return;

    const newPages = _filter(
      pages,
      f => f._id !== newState.activeProfile.page._id
    );

    newState.profiles[newState.activeProfile.index].pages = newPages;
    newState.activeProfile.page._id =
      newState.profiles[newState.activeProfile.index].pages[0]._id;
    newState.activeProfile.page.index = 0;
    globalData?.setState(newState);
  };

  return {
    changeProfilePage,
    createProfilePage,
    readProfilePage,
    deleteProfilePage
  };
};

export default usePage;
