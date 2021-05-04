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

        <textarea
          name={name}
          value={state?.[name as keyof IntActions]}
          onChange={e => onChange(e)}
        ></textarea>
      </div>
    </>
  );
};

export default formField;
