import * as React from "react";
import _cloneDeep from "lodash/cloneDeep";
import { AddCircleOutline, FileCopy } from "@material-ui/icons";
import shortid from "shortid";

import { GlobalContext, iUserProfile } from "../../../context/globalContext";
import SideBarItems from "./sideBarItems";

export interface ITemplateSideBarProps {}

const TemplateSideBar: React.FC<ITemplateSideBarProps> = () => {
  const globalData = React.useContext(GlobalContext);

  const handleCreateNewProfile = () => {
    const newState = _cloneDeep(globalData?.state);
    const newProfile: iUserProfile = {
      _id: shortid.generate(),
      profileName: "New Profile",
      buttonPads: 12,
    };

    newState?.profiles && newState?.profiles.push(newProfile);
    globalData?.setState(newState);
  };

  return (
    <>
      <div data-testid="template-sidebar-component">
        <div className="menu-item">
          <div className="menu-item-button menu-item-header">
            <div className="icon prefix-icon">
              <FileCopy fontSize="small" />
            </div>
            <div>Profiles</div>
            <div className="icon suffix-icon" onClick={handleCreateNewProfile}>
              <AddCircleOutline fontSize="small" />
            </div>
          </div>
        </div>
        <SideBarItems />
      </div>
    </>
  );
};

export default TemplateSideBar;
