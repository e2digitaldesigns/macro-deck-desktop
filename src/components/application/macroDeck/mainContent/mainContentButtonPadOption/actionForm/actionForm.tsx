import React, { useEffect, useRef, useState } from "react";
import _cloneDeep from "lodash/cloneDeep";
import _map from "lodash/map";
import { IntActions } from "../../../../../../types/globalContextType";
import { useActions, useGlobalData } from "../../../../../../hooks";
import {
  fileField,
  numberField,
  selectField,
  textArea,
  textField
} from "./formFields";
import SETTINGS from "../../../../../../settings/system.json";
import MdActionParser from "./parsers/mdActionParser";
import ObsActionParser from "./parsers/obsActionParser";
import secondaryParser from "./secondaryParser";

export interface ActionFormsProps {}

interface actionMapProps {
  [key: string]: any;
}

const ActionForms: React.FC<ActionFormsProps> = () => {
  const fileFieldRef = useRef();
  const { getAction, updateAction } = useActions();
  const globalData = useGlobalData();
  const [state, setState] = useState<IntActions>(
    SETTINGS.DEFAULT_STATE.ACTIONS
  );
  const actionId = globalData?.state.active?.actionId;

  useEffect((): void => {
    if (!actionId) {
      setState(state => ({ ...SETTINGS.DEFAULT_STATE.ACTIONS }));
    } else {
      const action = getAction(actionId);
      if (action) setState({ ...action });
    }
    // eslint-disable-next-line
  }, [actionId]);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newState = clearButtonAttributes();
    state && setState({ ...newState, [e.target.name]: e.target.value });
  };

  const handleExePathChange = () => {
    const newState = clearButtonAttributes();
    const file: any = document.getElementById("mdFileField");
    const path = file?.files?.[0]?.path;
    state && setState({ ...newState, path: path });
  };

  const clearButtonAttributes = () => {
    const reset = {
      seconds: 0,
      url: "",
      text: "",
      scene: "",
      layer: "",
      path: "",
      page: "",
      profile: ""
    };
    const newState = _cloneDeep(state);

    return { ...newState, ...reset };
  };

  const actionParser = (action: string) => {
    const actionMap: actionMapProps = {
      api: textField("url", state, handleFormChange),
      delay: numberField("seconds", state, handleFormChange),
      exe: fileField("path", fileFieldRef, handleExePathChange),
      md: selectField("md", state, handleFormChange),
      obs: selectField("obs", state, handleFormChange),
      spotify: selectField("spotify", state, handleFormChange),
      twitter: textArea("text", state, handleFormChange)
    };

    return actionMap[action];
  };

  const submit = () => {
    updateAction(state);
  };

  const showMdSubs = state?.action === "md" && secondaryParser("md", state);
  const showObsSubs = state?.action === "obs" && secondaryParser("obs", state);
  const disabled = !globalData?.state?.active?.actionId;

  return (
    <>
      <fieldset>
        <div>
          <label htmlFor="text">Action:</label>
          <select
            name="action"
            value={state?.action}
            onChange={e => handleFormChange(e)}
            disabled={disabled}
          >
            {!state?.action && <option value="">Choose Action</option>}
            {_map(
              SETTINGS.ACTION_TYPES,
              (m: any) =>
                m.active && (
                  <option key={m.name} value={m.name}>
                    {m.display}
                  </option>
                )
            )}
          </select>
        </div>

        {state?.action && actionParser(state.action)}

        {showMdSubs && (
          <div>
            <label htmlFor="text">Md Action:</label>
            <MdActionParser state={state} onChange={handleFormChange} />
          </div>
        )}

        {showObsSubs && (
          <div>
            <label htmlFor="text">OBS Action:</label>
            <ObsActionParser state={state} onChange={handleFormChange} />
          </div>
        )}
      </fieldset>

      <button
        className="action-list-button"
        onClick={submit}
        disabled={disabled}
      >
        Submit
      </button>
    </>
  );
};

export default ActionForms;
