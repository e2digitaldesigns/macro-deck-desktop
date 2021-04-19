import React from "react";
import _map from "lodash/map";
import _range from "lodash/range";

import { buttonMapper } from "./buttonMapper";

import { useProfile } from "../../../../hooks";
import ButtonPadParser from "./functions/buttonPadParser";

export interface MainContentButtonPadsProps {}

const MainContentButtonPads: React.FC<MainContentButtonPadsProps> = () => {
  const buttonPadArray: number[] = _range(1, 33);
  const { readProfile } = useProfile();
  const profile = readProfile();

  const buttonPadParserNumbering = (padNumber: number): number => {
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
        {_map(
          buttonPadArray,
          (m: number): React.ReactElement => (
            <div key={m} className="button-pad">
              <ButtonPadParser padNumber={buttonPadParserNumbering(m)} />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default MainContentButtonPads;
