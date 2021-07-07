import * as React from "react";

import MainContentButtonPads from "./mainContentButtonPads";
import MainContentButtonPadOptions from "./mainContentButtonPadOption";
import OptionHeader from "./mainContentButtonPadOption/optionHeader/optionHeader";
import IconSelectorWrapper from "./mainContentButtonPadOption/iconSelector/iconSelector";

import { useAppData } from "../../../../hooks";

export interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = () => {
  const { appState } = useAppData();
  console.clear();
  console.log(14, appState);

  return (
    <>
      <div
        className="template-main-content"
        data-testid="template-main-content-component"
      >
        {appState?.iconSelector?.isVisible ? (
          <IconSelectorWrapper />
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
