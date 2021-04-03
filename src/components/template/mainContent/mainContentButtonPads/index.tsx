import React from "react";
import _map from "lodash/map";
import _range from "lodash/range";

import { buttonMapper } from "./buttonMapper";

import useProfile from "../../../../hooks/useProfile/useButtonProfile";
import ButtonPadParser from "./functions/buttonPadParser";

export interface MainContentButtonPadsProps {}

const MainContentButtonPads: React.FC<MainContentButtonPadsProps> = () => {
  const buttonPadArray: number[] = _range(1, 33);
  const { readProfile } = useProfile();
  const profile = readProfile();

  const buttonPadParserNumbering = (padNumber: number): any => {
    const padCount: number | undefined = profile?.buttonPads;

    const data =
      padCount && buttonMapper?.[padCount]?.[padNumber]
        ? Number(buttonMapper[padCount][padNumber])
        : padCount && padCount === 32
        ? padNumber
        : 0;

    return data;
  };

  return (
    <>
      <div className="button-pad-wrapper">
        {_map(buttonPadArray, m => (
          <div key={m} className="button-pad">
            {m}
            <ButtonPadParser padNumber={buttonPadParserNumbering(m)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MainContentButtonPads;
