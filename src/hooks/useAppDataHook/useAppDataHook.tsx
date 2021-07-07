import React from "react";
import { AppContext } from "./appContext";

const useAppData = () => {
  const appData: any = React.useContext(AppContext);

  return appData;
};

export default useAppData;
