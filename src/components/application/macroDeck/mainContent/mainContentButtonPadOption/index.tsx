import React from "react";
import { useGlobalData } from "../../../../../hooks";
import ButtonPadForm from "./buttonPadForm";

export interface MainContentButtonPadOptionsProps {}

const MainContentButtonPadOptions: React.FC<MainContentButtonPadOptionsProps> =
  () => {
    const globalData = useGlobalData();

    if (!globalData?.state?.active?.profileId) {
      return <div></div>;
    }

    return (
      <>
        <div>
          <ButtonPadForm />
        </div>
      </>
    );
  };

export default MainContentButtonPadOptions;
