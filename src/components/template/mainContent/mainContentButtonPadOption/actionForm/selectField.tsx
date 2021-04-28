import React from "react";
import _map from "lodash/map";

import { IntActions } from "../../../../../types/globalContextType";

interface subActionMapProps {
  [key: string]: any[];
}

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
    "obsStreamToggle",
  ],
  spotify: [
    "spotifyNext",
    "spotifyPause",
    "spotifyPrevious",
    "spotifyStart",
    "spotifyStop",
  ],
};

export const selectField = (
  name: string,
  state: IntActions,
  onChange: any
): React.ReactElement => {
  return (
    <select
      name="subAction"
      value={state?.subAction}
      onChange={e => onChange(e)}
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
