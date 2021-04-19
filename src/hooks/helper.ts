import _findIndex from "lodash/findIndex";
import { useGlobalData } from "./../hooks";

export interface IntUseHelperHook {
  getProfileIndex: () => number;
  getPageIndex: (_id: string) => number;
  getButtonPadIndex: (_id: string) => number;
  getActionIndex: (_id: string) => number;
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

  return {
    getProfileIndex,
    getPageIndex,
    getButtonPadIndex,
    getActionIndex
  };
};

export default useHelperHook;
