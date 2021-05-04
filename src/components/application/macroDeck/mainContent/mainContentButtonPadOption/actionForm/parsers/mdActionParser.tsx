import * as React from "react";
import _map from "lodash/map";
import { IntActions } from "../../../../../../../types/globalContextType";
import { objectProps } from "../../../../../../../types";
import { usePage, useProfile } from "../../../../../../../hooks";

export interface MdActionParserProps {
  state: IntActions;
  onChange: any;
}

const MdActionParser: React.FC<MdActionParserProps> = ({ state, onChange }) => {
  const { readPages } = usePage();
  const { readProfiles } = useProfile();
  const action = state?.subAction;

  const subActionMap: objectProps = {
    mdPage: "page",
    mdProfile: "profile"
  };

  const subAction = action && subActionMap?.[action];
  const dataSet = subAction === "page" ? readPages() : readProfiles();

  if (subAction) {
    return (
      <select
        name={subAction}
        value={state?.[subAction as keyof IntActions]}
        onChange={e => onChange(e)}
      >
        {!state?.[subAction as keyof IntActions] && (
          <option value="">Choose {subAction}</option>
        )}
        {_map(dataSet, (m: any, i) => (
          <option key={m._id} value={m._id}>
            {subAction === "page" ? "Page " : m.profileName} {i + 1}
          </option>
        ))}
      </select>
    );
  }

  return <div />;
};

export default MdActionParser;
