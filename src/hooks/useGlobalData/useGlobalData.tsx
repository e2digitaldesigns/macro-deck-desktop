import React from "react";
import { GlobalContext, iGlobalContextStateInterface } from "./globalContext";

const useGlobalData = () => {
  const globalData: iGlobalContextStateInterface | null = React.useContext(
    GlobalContext
  );

  return globalData;
};

export default useGlobalData;
