import React, { useEffect } from "react";
import _map from "lodash/map";
import { Delete } from "@material-ui/icons";
import { useActions, useGlobalData } from "../../../../../hooks";
import { IntActions } from "../../../../../types/globalContextType";

export interface IntActionList {}

const ActionList: React.FC<IntActionList> = () => {
  const globalData = useGlobalData();
  const actionId = globalData?.state.active?.actionId;

  const { activateAction, createAction, getActions, deleteAction } =
    useActions();
  const actions: IntActions[] = getActions();

  useEffect(() => {}, []);

  const handleSelectActionSet = (_id: string): void => {
    activateAction(_id);
  };

  const handleCreateAction = () => {
    createAction();
  };

  const handleDeleteAction = (e: any, _id: string) => {
    e.stopPropagation();
    deleteAction(_id);
  };

  return (
    <>
      <div className="action-list-wrapper">
        <div className="action-list-wrapper-scroll">
          <ul className="action-list-ul">
            {actions &&
              _map(
                actions,
                (m: IntActions): React.ReactElement => (
                  <li
                    key={m._id}
                    className={m._id === actionId ? "active" : ""}
                    onClick={() => handleSelectActionSet(m._id)}
                  >
                    <span>
                      {m.action} | {m._id}
                    </span>

                    <button onClick={e => handleDeleteAction(e, m._id)}>
                      <Delete fontSize="inherit" />
                    </button>
                  </li>
                )
              )}
          </ul>
        </div>
      </div>

      <button
        className="action-list-button"
        onClick={handleCreateAction}
        disabled={!globalData?.state?.active?.buttonPadId}
      >
        New Action
      </button>
    </>
  );
};

export default ActionList;
