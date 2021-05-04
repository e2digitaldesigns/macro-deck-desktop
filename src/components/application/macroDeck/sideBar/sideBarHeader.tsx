import * as React from "react";
import { AddCircleOutline, FileCopy } from "@material-ui/icons";
import { useGlobalData, useProfile } from "../../../../hooks";

export interface IntTemplateSideBarHeader {}

const TemplateSideBarHeader: React.FC<IntTemplateSideBarHeader> = () => {
  const globalData = useGlobalData();
  const { createProfile } = useProfile();
  return (
    <>
      <div
        className="profile-header-wrapper"
        data-testid="template-sidebar-header"
      >
        <div className="profile-header">
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

        <div className="profile-search-wrapper"></div>
      </div>
    </>
  );
};

export default TemplateSideBarHeader;
