import { createContext } from "react";
import { IntGlobalData, IntGlobalContextInterface } from "../../types";

export const defaultState: IntGlobalContextInterface = {
  userInformation: { _id: "", name: "" },
  templateInformation: { sideBarState: "" },
  settings: {},
  active: {
    profileId: "",
    pageId: "",
    buttonPadId: "",
    actionId: ""
  },
  profiles: [],
  pages: [],
  buttonPads: [],
  actions: []
};

export const GlobalContext = createContext<IntGlobalData>({
  state: defaultState,
  setState: (): void => {}
});
