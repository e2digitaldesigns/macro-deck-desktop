import * as React from "react";
import Header from "./header/header";
import MainContent from "./mainContent/mainContent";
import SideBar from "./sideBar/sideBar";

export interface ITemplateWrapperProps {}

const PrimaryTemplate: React.FC<ITemplateWrapperProps> = () => {
  return (
    <>
      <div data-testid="template-wrapper-component">
        <Header />
        <SideBar />
        <MainContent />
      </div>
    </>
  );
};

export default PrimaryTemplate;
