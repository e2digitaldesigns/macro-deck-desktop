import React, { useState } from "react";
import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _findIndex from "lodash/findIndex";
import { Delete, Edit } from "@material-ui/icons";
import { GlobalContext, iUserProfile } from "../../../context/globalContext";

export interface iSideBarItems {}

const SideBarItems: React.FC<iSideBarItems> = () => {
  const globalData = React.useContext(GlobalContext);

  return (
    <>
      {globalData?.state?.profiles?.map((m: iUserProfile) => (
        <Item key={m._id} globalData={globalData} profile={m} />
      ))}
    </>
  );
};

const Item = ({ globalData, profile }: any) => {
  const [editState, setEditState] = useState({
    editing: false,
    profileName: profile?.profileName,
    buttonPads: profile?.buttonPads,
  });

  const handleProfileActivate = (event: React.FormEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (globalData?.state?.activeProfile === profile?._id) {
      return;
    }

    const newState = _cloneDeep(globalData?.state);
    newState.activeProfile = profile?._id;
    globalData?.setState(newState);
    setEditState({ ...editState, editing: false });
  };

  const handleProfileToggle = (event: React.FormEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setEditState({ ...editState, editing: !editState.editing });
  };

  const handleProfileDelete = (event: React.FormEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const newState = _cloneDeep(globalData?.state);
    newState.profiles = _filter(newState.profiles, f => f._id !== profile?._id);

    if (globalData?.state?.activeProfile === profile?._id) {
      newState.activeProfile = undefined;
      setEditState({ ...editState, editing: false });
    }

    globalData?.setState(newState);
  };

  const handleProfileFormChange = (event: any) => {
    const { name, value } = event.target;
    const regex = /^[a-zA-Z0-9\s-]+$/g;
    if (regex.test(value)) setEditState({ ...editState, [name]: value.trim() });
  };

  const handleProfileFormSubmit = (event: any) => {
    const newState = _cloneDeep(globalData?.state);
    const index = _findIndex(newState.profiles, { _id: profile._id });
    if (index < 0) return;
    newState.profiles[index].buttonPads = editState.buttonPads;
    newState.profiles[index].profileName = editState.profileName;
    globalData?.setState(newState);
  };

  return (
    <div
      className={`menu-item ${
        globalData?.state?.activeProfile === profile?._id
          ? "menu-item-active"
          : "menu-item-inactive"
      }`}
    >
      <div className="menu-item-button" onClick={e => handleProfileActivate(e)}>
        <div className="menu-item-button-text">
          {profile?.profileName} ({profile?.buttonPads})
        </div>

        <div
          className="menu-item-button-remove"
          onClick={e => handleProfileDelete(e)}
        >
          <Delete fontSize="small" />
        </div>

        <div
          className="menu-item-button-edit"
          onClick={e => handleProfileToggle(e)}
        >
          <Edit fontSize="small" />
        </div>
      </div>

      <div
        className={`menu-item-information ${
          globalData?.state?.activeProfile === profile?._id &&
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
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              handleProfileFormChange(e);
            }}
          ></input>
          <br />
          ButtonPads:
          <select
            name="buttonPads"
            value={editState?.buttonPads}
            onChange={(e: React.FormEvent<HTMLSelectElement>) => {
              handleProfileFormChange(e);
            }}
          >
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="15">15</option>
            <option value="24">24</option>
            <option value="32">32</option>
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
