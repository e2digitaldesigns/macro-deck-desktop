import { createContext } from "react";

export interface iUserInformation {
  _id: string;
  name: string;
}

export interface iTemplateInformation {
  sideBarState: string;
}

export interface globalContextInterface {
  userInformation?: iUserInformation;
  templateInformation?: iTemplateInformation;
}

export const GlobalContext = createContext<globalContextInterface | null>(null);
