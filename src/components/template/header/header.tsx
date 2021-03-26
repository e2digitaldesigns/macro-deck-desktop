import * as React from "react";
import { Close, Fullscreen, FullscreenExit, Remove } from "@material-ui/icons";

import { Header, Ul, UlRight } from "./headerStyles";

export interface ITemplateHeader {
  closeApplication?: () => void;
  fullScreenToggleApplication?: () => void;
  minimizeApplication?: () => void;
}

const TemplateHeader: React.FC<ITemplateHeader> = ({ ...props }) => {
  const [fullScreenState, setFullScreenState] = React.useState<boolean>(false);
  const handleCloseApplication = (): void => {};
  const handleMinimizeApplication = (): void => {};

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
          <li>
            <Remove onClick={handleMinimizeApplication} />
          </li>
          <li>
            {fullScreenState ? (
              <FullscreenExit
                data-testid="template-header-full-screen-exit"
                onClick={() => setFullScreenState(false)}
              />
            ) : (
              <Fullscreen
                data-testid="template-header-full-screen"
                onClick={() => setFullScreenState(true)}
              />
            )}
          </li>
          <li>
            <Close onClick={handleCloseApplication} />
          </li>
        </UlRight>
      </Header>
    </>
  );
};

export default TemplateHeader;
