import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import { IntActions } from "../../../../../types/globalContextType";
import { objectProps } from "../../../../../types";
import { useActions, useGlobalData } from "../../../../../hooks";
import { textField } from "./textField";
import { selectField } from "./selectField";
import useObsHook from "../../../../../hooks/useObsHook/useObsHook";
import SETTINGS from "../../../../../settings/system.json";

export interface ActionFormsProps {}

interface actionMapProps {
  [key: string]: any;
}

const ActionForms: React.FC<ActionFormsProps> = () => {
  const { getAction, updateAction } = useActions();
  const globalData = useGlobalData();
  const [state, setState] = useState<IntActions>(
    SETTINGS.DEFAULT_STATE.ACTIONS
  );
  const [obsState, setObsState] = useState({ scenes: "", sources: "" });
  const { getScenes, getSources } = useObsHook();

  useEffect(() => {
    const fetchObs = async () => {
      const scenes = await getScenes();
      const sources = await getSources();
      setObsState(obsState => ({ ...obsState, scenes, sources }));
    };

    fetchObs();
    // eslint-disable-next-line
  }, []);

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
    state && setState({ ...state, [e.target.name]: e.target.value });
  };

  const actionParser = (action: string) => {
    const actionMap: actionMapProps = {
      api: textField("url", state, handleFormChange),
      delay: textField("seconds", state, handleFormChange),
      exe: textField("path", state, handleFormChange),
      obs: selectField("obs", state, handleFormChange),
      spotify: selectField("spotify", state, handleFormChange),
      twitter: textField("text", state, handleFormChange)
    };

    return actionMap[action];
  };

  const obsActionParser = () => {
    if (state?.action !== "obs") return;
    const subActionSubStr = state?.subAction && state.subAction.substring(0, 8);

    const subActionMap: objectProps = {
      obsLayer: "layer",
      obsScene: "scene"
    };

    const subAction = subActionSubStr && subActionMap?.[subActionSubStr];

    if (subAction) {
      return (
        <select
          name={subAction}
          value={state?.[subAction as keyof IntActions]}
          onChange={e => handleFormChange(e)}
        >
          {!state?.[subAction as keyof IntActions] && (
            <option value="">Choose {subAction}</option>
          )}
          <option>{subAction}s</option>

          {_map(
            obsState.sources,
            (m: any): React.ReactElement => (
              <option key={m._id} value={m.name}>
                {m.name}
              </option>
            )
          )}
        </select>
      );
    }
  };

  const submit = () => {
    updateAction(state);
  };

  return (
    <>
      <div>
        <select
          name="action"
          value={state?.action}
          onChange={e => handleFormChange(e)}
        >
          {!state?.action && <option value="">Choose Action</option>}
          <option value="api">API</option>
          <option value="delay">Delay</option>
          <option value="exe">Exe</option>
          <option value="obs">OBS</option>
          <option value="spotify">Spotify</option>
          <option value="twitter">Twitter</option>
        </select>
      </div>

      {state?.action && actionParser(state.action)}

      {obsActionParser()}

      <button onClick={submit}>Submit</button>
    </>
  );
};

export default ActionForms;
