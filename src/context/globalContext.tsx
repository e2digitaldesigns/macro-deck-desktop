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

export interface iUserProfile {
  _id: string;
  profileName?: string;
  buttonPads: number;
  pages?: iProfilePages[];
}

export interface iGlobalContextInterface {
  userInformation?: iUserInformation;
  templateInformation?: iTemplateInformation;
  settings?: any;
  profiles?: iUserProfile[];
  activeProfile?: string;
  method?: () => void;
}

export interface iGlobalContextInterfaceState {
  state: iGlobalContextInterface;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export const GlobalContext = createContext<iGlobalContextInterfaceState | null>(
  null
);
