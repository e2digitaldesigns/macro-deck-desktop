import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";

import { useGlobalData } from "./../hooks";

export interface UseHelperProps {
  getPageIndex: (_id: string) => number;
  getProfileIndex: () => number;
}

const useHelper = (): UseHelperProps => {
  const globalData: any = useGlobalData();

  const getProfileIndex = (): number => {
    const index = _findIndex(globalData?.state?.profiles, (f: any) => {
      return f._id === globalData?.state?.activeProfile?._id;
    });

    return index;
  };

  const getPageIndex = (_id: string): number => {
    const newState = _cloneDeep(globalData?.state);
    const profileIndex = getProfileIndex();
    const id = _id === "null" ? newState?.activeProfile?.page?._id : _id;

    const pageIndex = _findIndex(
      newState?.profiles?.[profileIndex].pages,
      (f: any) => {
        return f._id === id;
      }
    );

    return pageIndex;
  };

  return {
    getPageIndex,
    getProfileIndex
  };
};

export default useHelper;
