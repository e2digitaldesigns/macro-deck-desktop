import shortid from "shortid";

import {
  IntProfilePageButtonPadActions,
  IntButtonsProfile
} from "../../types/globalContextType";

export interface IntUseObjHooks {
  actionObj: () => IntProfilePageButtonPadActions;
  profileObj: () => IntButtonsProfile;
}

const useObjHooks = (): IntUseObjHooks => {
  const actionObj: IntUseObjHooks["actionObj"] = () => {
    return {
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

  const profileObj: IntUseObjHooks["profileObj"] = () => {
    return {
      _id: shortid.generate(),
      profileName: "New Profile",
      buttonPads: 12,
      pages: [{ _id: shortid.generate(), buttonPads: [] }]
    };
  };

  return { actionObj, profileObj };
};

export default useObjHooks;
