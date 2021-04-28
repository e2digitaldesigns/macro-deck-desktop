import shortid from "shortid";
import timestamp from "time-stamp";

import {
  IntActions,
  IntButtonPads,
  IntPages,
  IntProfile
} from "./../../types/globalContextType";

export interface IntUseObjHooks {
  actionObj: () => IntActions;
  buttonPadObj: () => IntButtonPads;
  profileObj: () => IntProfile;
  pageObj: () => IntPages;
}

const useObjHooks = (): IntUseObjHooks => {
  const actionObj: IntUseObjHooks["actionObj"] = () => {
    return {
      profileId: "",
      pageId: "",
      buttonPadId: "",
      _id: shortid.generate(),
      order: 0,
      action: "",
      subAction: "",
      seconds: 0,
      url: "",
      text: "",
      scene: "",
      layer: "",
      path: ""
    };
  };

  const buttonPadObj: IntUseObjHooks["buttonPadObj"] = (): IntButtonPads => {
    return {
      profileId: "",
      pageId: "string",
      _id: shortid.generate(),
      buttonPadNum: 0,
      text: "newby",
      textColor: "",
      icon: "",
      iconColor: "",
      image: "",
      bgColor: ""
    };
  };

  const pageObj: IntUseObjHooks["pageObj"] = () => {
    return {
      profileId: "",
      _id: shortid.generate(),
      order: Number(timestamp("YYYYMMDDmmssms"))
    };
  };

  const profileObj: IntUseObjHooks["profileObj"] = () => {
    return {
      _id: shortid.generate(),
      profileName: "New Profile",
      buttonPads: 12
    };
  };

  return { actionObj, buttonPadObj, profileObj, pageObj };
};

export default useObjHooks;
