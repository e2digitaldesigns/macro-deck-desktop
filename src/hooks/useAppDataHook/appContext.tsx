import { createContext } from "react";

export const appDefaultState: any = {
  iconSelector: {
    isVisible: false,
    icon: ""
  },
  active: {
    profileId: "",
    pageId: "",
    buttonPadId: "",
    actionId: ""
  }
};

export const AppContext = createContext<any>({
  state: appDefaultState,
  setState: (): void => {}
});
