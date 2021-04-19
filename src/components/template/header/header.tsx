import * as React from "react";
import { Close, Fullscreen, FullscreenExit, Remove } from "@material-ui/icons";

import { Header, Ul, UlRight } from "./headerStyles";
import { useElectron } from "./../../../hooks";

export interface ITemplateHeader {}

const TemplateHeader: React.FC<ITemplateHeader> = () => {
  const [fullScreenState, setFullScreenState] = React.useState<boolean>(false);
  const { ipcRender } = useElectron();

  const handleCloseApplication = (): void => {
    ipcRender("header", "close");
  };

  const handleFullScreenToggle = (action: boolean): void => {
    ipcRender("header", "fsToggle");
    setFullScreenState(action);
  };

  const handleMinimizeApplication = (): void => {
    ipcRender("header", "minimize");
  };

  return (
    <>
      <Header data-testid="template-header-component">
        <Ul data-testid="template-header-menu">
          <li>File</li>
          <li>Edit</li>
          <li>Selection</li>
          <li>View</li>
          <li>Go</li>
        </Ul>

        <UlRight data-testid="template-header-options">
          <li
            data-testid="template-header-minimize-button"
            onClick={handleMinimizeApplication}
          >
            <Remove />
          </li>

          {fullScreenState ? (
            <li
              data-testid="template-header-full-screen-exit-button"
              onClick={() => handleFullScreenToggle(false)}
            >
              <FullscreenExit />{" "}
            </li>
          ) : (
            <li
              data-testid="template-header-full-screen-button"
              onClick={() => handleFullScreenToggle(true)}
            >
              <Fullscreen />
            </li>
          )}
          <li
            data-testid="template-header-full-close-button"
            onClick={handleCloseApplication}
          >
            <Close />
          </li>
        </UlRight>
      </Header>
    </>
  );
};

export default TemplateHeader;
