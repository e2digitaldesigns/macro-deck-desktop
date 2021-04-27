import _findIndex from "lodash/findIndex";
import { useGlobalData } from "../";

export interface IntUseHelperHook {
  getProfileIndex: () => number;
  getPageIndex: (_id: string) => number;
  getButtonPadIndex: (_id: string) => number;
  getActionIndex: (_id: string) => number;

  getIndexes: () => any;
  valueFinder: (dataSet: any, searchTerm: string, result: any) => any;
}

const useHelperHook = (): IntUseHelperHook => {
  const globalData: any = useGlobalData();

  const getProfileIndex = (): number => {
    const index = _findIndex(globalData?.state?.profiles, (f: any) => {
      return f._id === globalData?.state?.activeProfile?._id;
    });

    return index;
  };

  const getPageIndex = (_id: string): number => {
    const profileIndex = getProfileIndex();
    const id =
      _id === "null" ? globalData?.state?.activeProfile?.page?._id : _id;

    const pageIndex = _findIndex(
      globalData?.state?.profiles?.[profileIndex].pages,
      (f: any) => {
        return f._id === id;
      }
    );

    return pageIndex;
  };

  const getButtonPadIndex = (_id: string): number => {
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");

    const id =
      _id === "null" ? globalData?.state?.activeProfile?.buttonPad?._id : _id;

    const buttonPadIndex = _findIndex(
      globalData?.state.profiles?.[profileIndex]?.pages[pageIndex].buttonPads,
      (f: any) => {
        return f._id === id;
      }
    );

    return buttonPadIndex;
  };

  const getIndexes = (): any => {
    const prefix = globalData?.state?.activeProfile;

    const indexes = {
      profile: prefix?.index,
      page: prefix?.page?.index,
      button: prefix?.buttonPad?.index,
      action: prefix?.action?.index
    };

    return indexes;
  };

  const getActionIndex = (_id: string): number => {
    const profileIndex = getProfileIndex();
    const pageIndex = getPageIndex("null");
    const buttonPadIndex = getButtonPadIndex("null");

    const id =
      _id === "null" ? globalData?.state?.activeProfile?.action?._id : _id;

    const actionIndex = _findIndex(
      globalData?.state.profiles?.[profileIndex]?.pages[pageIndex]?.buttonPads[
        buttonPadIndex
      ]?.actions,
      (f: any) => {
        return f._id === id;
      }
    );

    return actionIndex;
  };

  const valueFinder = (
    dataSet: any,
    searchTerm: string,
    result: any = []
  ): any => {
    const param = "_id";
    Object.keys(dataSet).forEach(key => {
      if (typeof dataSet[key] === "object") {
        valueFinder(dataSet[key], searchTerm, result);
      }

      if (
        typeof dataSet[key] === "string" &&
        dataSet[key] === searchTerm &&
        key === param
      ) {
        result.push(dataSet);
      }
    });

    return result;
  };

  return {
    getProfileIndex,
    getPageIndex,
    getButtonPadIndex,
    getActionIndex,

    getIndexes,
    valueFinder
  };
};

export default useHelperHook;
