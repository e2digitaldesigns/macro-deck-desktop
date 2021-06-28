import React, { useRef, useState } from "react";
import _map from "lodash/map";
import "react-toastify/dist/ReactToastify.css";
import { Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import { IntProfile } from "../../../../types";
import { useProfile, useGlobalData } from "../../../../hooks";
import { IntEditState } from "../../../../hooks/useProfileHook/useProfileHook";
import SETTINGS from "../../../../settings/system.json";
import sideBarFormSchema from "./sideBarFormSchema";

export interface iSideBarItem {
  profile: IntProfile;
}

const SideBarItems: React.FC<iSideBarItem> = ({ profile }) => {
  const globalData = useGlobalData();

  const { activateProfile, updateProfile, deleteProfile } = useProfile();
  const profileNameRef: any = useRef();

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
    if (editState.editing) return;
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

    if (globalData?.state?.active?.profileId === profile?._id) {
      setEditState({ ...editState, editing: false });
    }

    deleteProfile(profile?._id);
  };

  const handleProfileFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    const regex = /^[a-z\d\-_\s]+$/i;
    if (regex.test(value) || value.length === 0)
      setEditState({ ...editState, [name]: value });
  };

  const handleProfileFormSubmit = async () => {
    try {
      await sideBarFormSchema.validate({
        ...editState
      });

      updateProfile(profile._id, editState);
    } catch (err) {
      toast.warning(err.errors[0]);
      profileNameRef.current.focus();
    }
  };

  return (
    <>
      <div
        data-testid="template-sidebar-item__component"
        className={`menu-item ${
          globalData?.state?.active?.profileId === profile?._id
            ? "menu-item-active"
            : "menu-item-inactive"
        }`}
      >
        <div
          className="menu-item-button"
          data-testid="template-sidebar-item__component-menu-item-button"
          onClick={handleProfileActivate}
        >
          <div
            className="menu-item-button-text"
            data-testid="template-sidebar-item__button-text"
          >
            {profile?.profileName} ({profile?.buttonPads})
          </div>

          <div
            className="menu-item-button-edit"
            data-testid="template-sidebar-item__button-edit"
            onClick={handleProfileEditToggle}
          >
            <Edit fontSize="inherit" />
          </div>

          <div
            className="menu-item-button-remove"
            data-testid="template-sidebar-item__button-remove"
            onClick={handleProfileDelete}
          >
            <Delete fontSize="inherit" />
          </div>
        </div>

        <div
          className={`menu-item-information ${
            globalData?.state?.active?.profileId === profile?._id &&
            editState.editing &&
            "menu-item-information-active"
          }`}
          data-testid="template-sidebar-item__menu-item-information-wrapper"
        >
          <div className="menu-item-infomation-inner">
            Name:{" "}
            <input
              ref={profileNameRef}
              type="text"
              name="profileName"
              value={editState?.profileName}
              onChange={handleProfileFormChange}
              data-testid="template-sidebar-item__input_profile-name"
            ></input>
            <br />
            ButtonPads:
            <select
              name="buttonPads"
              value={editState?.buttonPads}
              onChange={handleProfileFormChange}
              data-testid="template-sidebar-item__select-button-pads"
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
              data-testid="template-sidebar-item__button-submit"
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarItems;
