import React from "react";
import _upperFirst from "lodash/upperFirst";
import _map from "lodash/map";
import _range from "lodash/range";

import { IntActions } from "../../../../../../../types/globalContextType";
import SETTINGS from "../../../../../../../settings/system.json";

const numberField = (
  name: string,
  state: IntActions,
  onChange: any
): React.ReactElement => {
  const range = _range(0, SETTINGS.MAX_DELAY_SECONDS, 0.5);
  return (
    <>
      <div>
        <label htmlFor={name}>{_upperFirst(name)}:</label>
        <select
          name={name}
          onChange={onChange}
          value={state?.[name as keyof IntActions]}
        >
          {_map(range, (m: any) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default numberField;
