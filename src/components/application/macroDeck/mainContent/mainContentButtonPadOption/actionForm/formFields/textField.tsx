import React from "react";
import _upperFirst from "lodash/upperFirst";
import { IntActions } from "../../../../../../../types/globalContextType";

const formField = (
  name: string,
  state: IntActions,
  onChange: any
): React.ReactElement => {
  return (
    <>
      <div>
        <label htmlFor={name}>{_upperFirst(name)}:</label>
        <input
          name={name}
          onChange={e => onChange(e)}
          type="text"
          value={state?.[name as keyof IntActions]}
        />
      </div>
    </>
  );
};

export default formField;
