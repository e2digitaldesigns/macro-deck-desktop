import * as React from "react";

import MainContentButtonPads from "./mainContentButtonPads";
import MainContentButtonPadOptions from "./mainContentButtonPadOption";
import OptionHeader from "./mainContentButtonPadOption/optionHeader/optionHeader";
import IconSelector from "./mainContentButtonPadOption/iconSelector/iconSelector";

export interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = () => {
  const [showIconSelector, setShowIconSelector] = React.useState<boolean>(true);

  const handleShowIconSelector = (state: boolean): void => {
    if (state !== showIconSelector) setShowIconSelector(state);
  };

  return (
    <>
      <div
        className="template-main-content"
        data-testid="template-main-content-component"
      >
        {showIconSelector ? (
          <IconSelector close={() => handleShowIconSelector(false)} />
        ) : (
          <MainContentButtonPads />
        )}

        <OptionHeader />
        <MainContentButtonPadOptions />
      </div>
    </>
  );
};

export default MainContent;
