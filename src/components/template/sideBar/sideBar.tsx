import * as React from "react";
import { AddCircleOutline, FileCopy } from "@material-ui/icons";
import { useGlobalData, useProfile } from "../../../hooks";
import { IntButtonsProfile } from "../../../types";

import SideBarItem from "./sideBarItem";

export interface ITemplateSideBarProps {}

const TemplateSideBar: React.FC<ITemplateSideBarProps> = () => {
  const globalData = useGlobalData();
  const { createProfile } = useProfile();

  return (
    <>
      <section
        className="sidebar-section"
        data-testid="template-sidebar-component"
      >
        <div className="menu-item">
          <div className="menu-item-button menu-item-header">
            <div className="icon prefix-icon">
              <FileCopy fontSize="inherit" />
            </div>
            <div>Profiles ({globalData?.state?.profiles?.length})</div>
            <div
              className="icon suffix-icon"
              data-testid="template-sidebar-create-new-profile"
              onClick={createProfile}
            >
              <AddCircleOutline fontSize="inherit" />
            </div>
          </div>
        </div>

        {globalData?.state?.profiles?.map(
          (m: IntButtonsProfile): React.ReactElement => (
            <SideBarItem key={m._id} profile={m} />
          )
        )}
      </section>
    </>
  );
};

export default TemplateSideBar;
