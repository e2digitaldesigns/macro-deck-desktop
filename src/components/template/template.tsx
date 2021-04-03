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
      <section data-testid="template-wrapper-section">
        <Header
          closeApplication={closeApplication}
          fullScreenToggleApplication={fullScreenToggleApplication}
          minimizeApplication={minimizeApplication}
        />
        <div className="application-template-wrapper">
          <div className="template-side-bar-left">
            <SideBar />
          </div>

          <MainContent />
        </div>
      </section>
    </>
  );
};

export default PrimaryTemplate;
