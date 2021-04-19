import React from "react";
import { useGlobalData } from "../../../../hooks";
import ButtonPadForm from "./buttonPadForm";

export interface MainContentButtonPadOptionsProps {}

const MainContentButtonPadOptions: React.FC<MainContentButtonPadOptionsProps> = () => {
  const globalData = useGlobalData();

  if (!globalData?.state?.activeProfile?.buttonPad?._id) {
    return <div></div>;
  }

  return <ButtonPadForm />;
};

export default MainContentButtonPadOptions;
