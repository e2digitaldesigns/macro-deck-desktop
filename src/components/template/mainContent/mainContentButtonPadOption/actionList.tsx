import React, { useEffect } from "react";
import _map from "lodash/map";
import { useActions } from "../../../../hooks";
import { IntActions } from "./../../../../types/globalContextType";

export interface IntActionList {}

const ActionList: React.FC<IntActionList> = () => {
  const {
    activateAction,
    createAction,
    getActions,
    deleteAction
  } = useActions();
  const actions: IntActions[] = getActions();

  useEffect(() => {}, []);

  const handleSelectActionSet = (_id: string): void => {
    activateAction(_id);
  };

  const handleCreateAction = () => {
    createAction();
  };

  const handleDeleteAction = (_id: string) => {
    deleteAction(_id);
  };

  return (
    <div>
      <button onClick={handleCreateAction}>new action</button>
      <ul>
        {actions &&
          _map(
            actions,
            (m: IntActions): React.ReactElement => (
              <li key={m._id}>
                <button onClick={() => handleDeleteAction(m._id)}>
                  delete
                </button>{" "}
                <span onClick={() => handleSelectActionSet(m._id)}>
                  {m._id}
                </span>
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default ActionList;
