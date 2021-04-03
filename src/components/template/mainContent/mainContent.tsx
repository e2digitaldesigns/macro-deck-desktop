import * as React from "react";

import MainContentButtonPads from "./mainContentButtonPads";
import MainContentButtonPadOptions from "./mainContentButtonPadOption";

export interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = () => {
  return (
    <>
      <div
        className="template-main-content"
        data-testid="template-main-content-component"
      >
        <MainContentButtonPads />
        <MainContentButtonPadOptions />
      </div>
    </>
  );
};

export default MainContent;
