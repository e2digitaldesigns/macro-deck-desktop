import * as React from "react";
import { useGlobalData } from "../../../../hooks";
import { IntProfile } from "../../../../types";
import TemplateSideBarHeader from "./sideBarHeader";

import SideBarItem from "./sideBarItem";

export interface ITemplateSideBarProps {}

const TemplateSideBar: React.FC<ITemplateSideBarProps> = () => {
  const globalData = useGlobalData();

  return (
    <>
      <section
        className="sidebar-section"
        data-testid="template-sidebar-component"
      >
        <TemplateSideBarHeader />

        {globalData?.state?.profiles?.map(
          (m: IntProfile): React.ReactElement => (
            <SideBarItem key={m._id} profile={m} />
          )
        )}
      </section>
    </>
  );
};

export default TemplateSideBar;
