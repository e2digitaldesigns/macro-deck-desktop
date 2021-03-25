import * as React from "react";
import { GlobalContext } from "../../../context/globalContext";

export interface ITemplateSideBarProps {}

const TemplateSideBar: React.FC<ITemplateSideBarProps> = () => {
  const gInfo = React.useContext(GlobalContext);

  return (
    <>
      <div data-testid="template-sidebar-component">
        <h1>SideBar</h1>
        <h1>{gInfo?.userInformation?.name}</h1>
      </div>
    </>
  );
};

export default TemplateSideBar;
