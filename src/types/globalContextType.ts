export interface IntUserInformation {
  _id: string;
  name: string;
}

export interface IntTemplateInformation {
  sideBarState: string;
}

export interface IntProfilePageButtonPadActions {
  _id: string;
  order: number;
  action?: string;
  subAction?: string;
  seconds: number;
  url: string;
  text: string;
  scene: string;
  layer: string;
  path: string;
}
export interface IntProfilePageButtonPad {
  buttonPadNum: number;
  _id: string;
  text: string;
  textColor: string;
  icon: string;
  iconColor: string;
  image: string;
  bgColor: string;
  actions: IntProfilePageButtonPadActions[] | any[];
}

export interface IntProfilePages {
  _id: string;
  buttonPads: IntProfilePageButtonPad[];
}

export interface IntButtonsProfile {
  _id: string;
  profileName: string;
  buttonPads: number;
  // pages: any;
  pages: IntProfilePages[];
}

export interface IntIdIndex {
  _id?: string | undefined;
  index?: number | undefined;
}
export interface IntActiveProfile {
  _id: string;
  index: number | undefined;
  page: IntIdIndex;
  buttonPad: IntIdIndex;
  action: IntIdIndex;
}

export interface IntGlobalContextInterface {
  userInformation?: IntUserInformation;
  templateInformation?: IntTemplateInformation;
  settings?: any;
  profiles: IntButtonsProfile[];
  activeProfile?: IntActiveProfile | undefined;
  method?: () => void;
}

export interface IntGlobalContextStateInterface {
  state: IntGlobalContextInterface;
  setState: React.Dispatch<React.SetStateAction<any>>;
}
