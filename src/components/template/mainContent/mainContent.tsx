import * as React from "react";
import { GlobalContext } from "../../../context/globalContext";

export interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = () => {
  const gInfo = React.useContext(GlobalContext);

  return (
    <>
      <div data-testid="template-main-content-component">
        <h1>MainContent</h1>
        <h1>{gInfo?.userInformation?.name}</h1>
      </div>
    </>
  );
};

export default MainContent;
