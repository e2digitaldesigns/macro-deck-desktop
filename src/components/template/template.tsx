import * as React from "react";
import Header from "./header/header";
import MainContent from "./mainContent/mainContent";
import SideBar from "./sideBar/sideBar";

export interface ITemplateWrapperProps {}

const PrimaryTemplate: React.FC<ITemplateWrapperProps> = () => {
  return (
    <>
      <section data-testid="template-wrapper-section">
        <Header />
        <div className="application-template-wrapper">
          <div></div>
          <div className="template-side-bar-left">
            <SideBar />
          </div>
          <div></div>
          <MainContent />
          <div></div>
        </div>
      </section>
    </>
  );
};

export default PrimaryTemplate;
