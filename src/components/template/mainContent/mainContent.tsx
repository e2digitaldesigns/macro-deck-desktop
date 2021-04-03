import * as React from "react";
import { GlobalContext, iUserProfile } from "../../../context/globalContext";

export interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = () => {
  const globalData = React.useContext(GlobalContext);
  return (
    <>
      <div
        className="template-main-content"
        data-testid="template-main-content-component"
      >
        <h1>MainContent Header Bar XSX</h1>

        {globalData?.state?.profiles?.map((m: iUserProfile) => (
          <div key={m?._id}>
            {m?.profileName} | {m?.buttonPads}
          </div>
        ))}
      </div>
    </>
  );
};

export default MainContent;
