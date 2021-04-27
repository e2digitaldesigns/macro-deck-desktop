import React from "react";
import { IntProfilePageButtonPadActions } from "../../../../../types/globalContextType";

export const textField = (
  name: string,
  state: IntProfilePageButtonPadActions,
  onChange: any
): React.ReactElement => {
  return (
    <input
      type="text"
      name={name}
      value={state?.[name as keyof IntProfilePageButtonPadActions]}
      onChange={e => onChange(e)}
    />
  );
};
