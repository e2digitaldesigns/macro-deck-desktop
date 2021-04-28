import * as React from "react";

import MainContentButtonPads from "./mainContentButtonPads";
import MainContentButtonPadOptions from "./mainContentButtonPadOption";
import OptionHeader from "./mainContentButtonPadOption/optionHeader/optionHeader";

export interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = () => {
  return (
    <>
      <div
        className="template-main-content"
        data-testid="template-main-content-component"
      >
        <MainContentButtonPads />
        <OptionHeader />
        <MainContentButtonPadOptions />
      </div>
    </>
  );
};

export default MainContent;
