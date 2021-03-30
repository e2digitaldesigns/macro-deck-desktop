import * as React from "react";
import Header from "./header/header";
import MainContent from "./mainContent/mainContent";
import SideBar from "./sideBar/sideBar";

export interface ITemplateWrapperProps {}

const PrimaryTemplate: React.FC<ITemplateWrapperProps> = () => {
  const closeApplication = () => {};
  const fullScreenToggleApplication = () => {};
  const minimizeApplication = () => {};

  return (
    <>
      <div data-testid="template-wrapper-component">
        <Header
          closeApplication={closeApplication}
          fullScreenToggleApplication={fullScreenToggleApplication}
          minimizeApplication={minimizeApplication}
        />
        <div className="template-wrapper">
          <div className="template-side-bar-left">
            <SideBar />
          </div>

          <MainContent />
        </div>
      </div>
    </>
  );
};

export default PrimaryTemplate;
