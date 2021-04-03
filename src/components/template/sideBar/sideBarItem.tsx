import React, { useState } from "react";
import _map from "lodash/map";
import { Delete, Edit } from "@material-ui/icons";
import {
  GlobalContext,
  iButtonsProfile,
  iGlobalContextStateInterface
} from "../../../hooks/useGlobalData/globalContext";
import useProfile, {
  intEditState
} from "../../../hooks/useProfile/useButtonProfile";

export interface iSideBarItem {
  profile: iButtonsProfile;
}

const SideBarItems: React.FC<iSideBarItem> = ({ profile }) => {
  const globalData: iGlobalContextStateInterface | null = React.useContext(
    GlobalContext
  );
  const { activateProfile, updateProfile, deleteProfile } = useProfile();

  const [editState, setEditState] = useState<intEditState>({
    editing: false,
    profileName: profile?.profileName,
    buttonPads: profile?.buttonPads
  });

  const buttonPadSelect: number[] = [6, 8, 12, 15, 24, 32];

  const handleProfileActivate = (
    event: React.FormEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation();
    if (globalData?.state?.activeProfile?._id === profile?._id) {
      return;
    }

    profile?._id && activateProfile(profile?._id);
    setEditState({ ...editState, editing: false });
  };

  const handleProfileEditToggle = (
    event: React.FormEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation();
    setEditState({ ...editState, editing: !editState.editing });
  };

  const handleProfileDelete = (
    event: React.FormEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation();
    deleteProfile(profile?._id);

    if (globalData?.state?.activeProfile?._id === profile?._id) {
      setEditState({ ...editState, editing: false });
    }
  };

  const handleProfileFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let { name, value } = event.target;
    const regex = /^[a-z\d\-_\s ]+$/i;
    if (regex.test(value)) setEditState({ ...editState, [name]: value });
  };

  const handleProfileFormSubmit = (): void => {
    updateProfile(profile._id, editState);
  };

  return (
    <div
      className={`menu-item ${
        globalData?.state?.activeProfile?._id === profile?._id
          ? "menu-item-active"
          : "menu-item-inactive"
      }`}
    >
      <div className="menu-item-button" onClick={handleProfileActivate}>
        <div className="menu-item-button-text">
          {profile?.profileName} ({profile?.buttonPads})
        </div>

        <div
          className="menu-item-button-edit"
          onClick={handleProfileEditToggle}
        >
          <Edit fontSize="inherit" />
        </div>

        <div className="menu-item-button-remove" onClick={handleProfileDelete}>
          <Delete fontSize="inherit" />
        </div>
      </div>

      <div
        className={`menu-item-information ${
          globalData?.state?.activeProfile?._id === profile?._id &&
          editState.editing &&
          "menu-item-information-active"
        }`}
      >
        <div className="menu-item-infomation-inner">
          Name:{" "}
          <input
            type="text"
            name="profileName"
            value={editState?.profileName}
            onChange={handleProfileFormChange}
          ></input>
          <br />
          ButtonPads:
          <select
            name="buttonPads"
            value={editState?.buttonPads}
            onChange={handleProfileFormChange}
          >
            {_map(buttonPadSelect, m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <br />
          <button
            className="menu-item-information-submit"
            onClick={handleProfileFormSubmit}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBarItems;
