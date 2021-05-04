import React from "react";
import _map from "lodash/map";
import _upperFirst from "lodash/upperFirst";
import { IntActions } from "../../../../../../../types/globalContextType";

interface subActionMapProps {
  [key: string]: any[];
}

const subAction: subActionMapProps = {
  md: [
    "mdHome",
    "mdPage",
    "mdProfile",
    "mdProfileSelector",
    "mdReset",
    "mdSettings"
  ],
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

const formField = (
  name: string,
  state: IntActions,
  onChange: any
): React.ReactElement => {
  return (
    <>
      <div>
        <label htmlFor={name}>{_upperFirst(name)}:</label>

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
      </div>
    </>
  );
};

export default formField;
