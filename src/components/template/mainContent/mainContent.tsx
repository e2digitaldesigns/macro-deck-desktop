import * as React from "react";
import { GlobalContext } from "../../../context/globalContext";

export interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = () => {
  const gInfo = React.useContext(GlobalContext);

  return (
    <>
      <div
        className="template-main-content"
        data-testid="template-main-content-component"
      >
        <h1>MainContent Header Bar XSX</h1>
      </div>
    </>
  );
};

export default MainContent;
