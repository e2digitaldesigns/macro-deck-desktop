import React from "react";
import _map from "lodash/map";
import {
  iButtonsProfile,
  iProfilePages
} from "../../../../hooks/useGlobalData/globalContext";

import { useGlobalData, usePage, useProfile } from "./../../../../hooks";
export interface MainContentButtonPadOptionsProps {}

const MainContentButtonPadOptions: React.FC<MainContentButtonPadOptionsProps> = () => {
  const globalData = useGlobalData();
  const { readProfile } = useProfile();
  const { changeProfilePage, createProfilePage, deleteProfilePage } = usePage();

  const profile = readProfile();

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    changeProfilePage(e.target.value);
  };

  const handleCreatePage = (): void => {
    createProfilePage();
  };

  return (
    <>
      <div className="main-content-button-pad-options">
        <div>
          <h3>
            Active Profile: {profile?.profileName} ({profile?.pages?.length})
          </h3>
          <h3>
            Active Page Id: {globalData?.state?.activeProfile?.page?._id} |{" "}
            index: {globalData?.state?.activeProfile?.page?.index}
          </h3>
          <h3>
            ButtonPad Id: {globalData?.state?.activeProfile?.buttonPad?._id} |{" "}
            index: {globalData?.state?.activeProfile?.buttonPad?.index}
          </h3>
          <br />
        </div>
        {globalData?.state?.profiles?.map((m: iButtonsProfile) => (
          <div key={m?._id}>
            {m?.profileName} | {m?.buttonPads}
          </div>
        ))}
        <hr />
        <select
          onChange={handlePageChange}
          value={globalData?.state?.activeProfile?.page?._id}
        >
          {_map(profile?.pages, (m: iProfilePages, i: number) => (
            <option key={m._id} value={m._id}>
              {" "}
              {i + 1}{" "}
            </option>
          ))}
        </select>
        <button onClick={handleCreatePage}>add new page</button>{" "}
        <button onClick={deleteProfilePage}>delete current page</button>
      </div>
    </>
  );
};

export default MainContentButtonPadOptions;
