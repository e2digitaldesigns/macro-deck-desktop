import * as React from "react";
import { Close, Fullscreen, FullscreenExit, Remove } from "@material-ui/icons";

import { Header, Ul, UlRight } from "./headerStyles";

export interface ITemplateHeader {
  closeApplication: () => void;
  fullScreenToggleApplication: (action: boolean) => void;
  minimizeApplication: () => void;
}

const TemplateHeader: React.FC<ITemplateHeader> = ({
  closeApplication,
  fullScreenToggleApplication,
  minimizeApplication
}) => {
  const [fullScreenState, setFullScreenState] = React.useState<boolean>(false);

  const handleCloseApplication = (): void => {
    closeApplication();
  };

  const handleFullScreenToggle = (action: boolean): void => {
    setFullScreenState(action);
    fullScreenToggleApplication(action);
  };

  const handleMinimizeApplication = (): void => {
    minimizeApplication();
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
