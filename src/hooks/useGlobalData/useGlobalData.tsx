import React from "react";
import { GlobalContext } from "./globalContext";
import { IntGlobalContextStateInterface } from "../../types";

const useGlobalData = () => {
  const globalData: IntGlobalContextStateInterface | null = React.useContext(
    GlobalContext
  );

  return globalData;
};

export default useGlobalData;
