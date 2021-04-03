import React, { createContext } from "react";

export interface iUserInformation {
  _id: string;
  name: string;
}

export interface iTemplateInformation {
  sideBarState: string;
}

export interface iProfilePageButtonPad {
  buttonPadNum: number;
  _id: string;
  text: string;
  icon: string;
  image: string;
  bgColor: string;
  actions: any;
}

export interface iProfilePages {
  _id: string;
  buttonPads?: iProfilePageButtonPad[];
}

export interface iButtonsProfile {
  _id: string;
  profileName?: string;
  buttonPads: number;
  pages?: iProfilePages[];
}

export interface idIndex {
  _id?: string | undefined;
  index?: number | undefined;
}
export interface iActiveProfile {
  _id?: string;
  index?: number | undefined;
  page?: idIndex;
  buttonPad?: idIndex;
}

export interface iGlobalContextInterface {
  userInformation?: iUserInformation;
  templateInformation?: iTemplateInformation;
  settings?: any;
  profiles?: iButtonsProfile[];
  activeProfile?: iActiveProfile | undefined;
  method?: () => void;
}

export interface iGlobalContextStateInterface {
  state: iGlobalContextInterface;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export const GlobalContext = createContext<iGlobalContextStateInterface | null>(
  null
);
