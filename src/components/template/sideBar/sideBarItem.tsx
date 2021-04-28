import React, { useState } from "react";
import _map from "lodash/map";
import { Delete, Edit } from "@material-ui/icons";
import { IntProfile } from "../../../types";
import { useProfile, useGlobalData } from "../../../hooks";
import { IntEditState } from "../../../hooks/useProfileHook/useProfileHook";
import SETTINGS from "../../../settings/system.json";

export interface iSideBarItem {
  profile: IntProfile;
}

const SideBarItems: React.FC<iSideBarItem> = ({ profile }) => {
  const globalData = useGlobalData();
  const { activateProfile, updateProfile, deleteProfile } = useProfile();

  const [editState, setEditState] = useState<IntEditState>({
    editing: false,
    profileName: profile?.profileName,
    buttonPads: profile?.buttonPads
  });

  const buttonPadSelect: number[] = SETTINGS.BUTTON_PAD_AMOUNTS;

  const handleProfileActivate = (
    event: React.FormEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation();
    if (globalData?.state?.active?.profileId === profile?._id) {
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

    if (globalData?.state?.active?.profileId === profile?._id) {
      setEditState({ ...editState, editing: false });
    }
  };

  const handleProfileFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
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
        globalData?.state?.active?.profileId === profile?._id
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
          globalData?.state?.active?.profileId === profile?._id &&
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
                {m} - p
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
