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
        {/* <div style={{ backgroundColor: "green" }}>123</div> */}
        {/* <div style={{ backgroundColor: "blue" }}>123</div> */}
        {/* <div style={{ backgroundColor: "red" }}>123</div> */}
      </div>
    </>
  );
};

export default MainContent;
