import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import { IntProfilePageButtonPadActions } from "./../../../../types/globalContextType";
import { objectProps } from "./../../../../types";
import { useActions, useGlobalData } from "../../../../hooks";

export interface ActionFormsProps {
  theActionId: string;
}

interface actionMapProps {
  [key: string]: any;
}

interface subActionMapProps {
  [key: string]: any[];
}

const ActionForms: React.FC<ActionFormsProps> = ({ theActionId }) => {
  const globalData = useGlobalData();
  const { getAction } = useActions();
  const [state, setState] = useState<
    IntProfilePageButtonPadActions | undefined
  >(undefined);

  useEffect((): void => {
    const action = getAction(theActionId);
    setState({ ...action });
  }, [theActionId]);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    state && setState({ ...state, [e.target.name]: e.target.value });
  };

  const actionParser = (action: string) => {
    const actionMap: actionMapProps = {
      api: textField("url"),
      delay: textField("delay"),
      exe: textField("path"),
      obs: selectField("obs"),
      spotify: selectField("spotify")
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
          value={state?.[subAction as keyof IntProfilePageButtonPadActions]}
          onChange={e => handleFormChange(e)}
        >
          {!state?.[subAction as keyof IntProfilePageButtonPadActions] && (
            <option value="">Choose {subAction}</option>
          )}
          <option>{subAction}s</option>
        </select>
      );
    }
  };

  const textField = (name: any): any => {
    return (
      <input
        type="text"
        name={name}
        value={state?.[name as keyof IntProfilePageButtonPadActions]}
        onChange={e => handleFormChange(e)}
      />
    );
  };

  const selectField = (name: string): any => {
    return (
      <select
        name="subAction"
        value={state?.subAction}
        onChange={e => handleFormChange(e)}
      >
        {!state?.subAction && <option value="">Choose</option>}
        {_map(subAction?.[name], m => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    );
  };

  const subAction: subActionMapProps = {
    obs: [
      "obsLayerHide",
      "obsLayerShow",
      "obsLayerToggle",
      "obsRecordStart",
      "obsRecordStop",
      "obsRecordToggle",
      "obsSceneChange",
      "obsStreamStart",
      "obsStreamStop",
      "obsStreamToggle"
    ],
    spotify: [
      "spotifyNext",
      "spotifyPause",
      "spotifyPrevious",
      "spotifyStart",
      "spotifyStop"
    ]
  };

  const submit = () => {
    console.clear();
    console.log(state);
  };

  return (
    <>
      <div>
        <select
          name="action"
          value={state?.action}
          onChange={e => handleFormChange(e)}
        >
          {!state?.action && <option value="">Choose</option>}
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
