import React from "react";
import { IntActions } from "../../../../../types/globalContextType";

export const textField = (
  name: string,
  state: IntActions,
  onChange: any
): React.ReactElement => {
  return (
    <input
      type="text"
      name={name}
      value={state?.[name as keyof IntActions]}
      onChange={e => onChange(e)}
    />
  );
};
