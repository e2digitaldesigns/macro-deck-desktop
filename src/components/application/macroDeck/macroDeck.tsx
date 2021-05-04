import React from "react";
import MainContent from "../../application/macroDeck/mainContent/mainContent";
import SideBar from "../../application/macroDeck/sideBar/sideBar";

export interface ITemplateWrapperProps {}

const MacroDeck: React.FC<ITemplateWrapperProps> = () => {
  return (
    <>
      <div className="application-template-wrapper">
        <div></div>
        <div className="template-side-bar-left">
          <SideBar />
        </div>
        <div></div>
        <MainContent />
        <div></div>
      </div>
    </>
  );
};

export default MacroDeck;
