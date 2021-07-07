import * as React from "react";
import _map from "lodash/map";
import _range from "lodash/range";
import Icon from "@material-ui/core/Icon";
import { intIconProps } from "../../../../../../types";

export interface IntIconSelectorMain {
  icons: intIconProps[];
  handleIconSelect: (_id: string) => void;
  selectedIcon: intIconProps | null;
}

const IconSelectorMain: React.FC<IntIconSelectorMain> = ({
  handleIconSelect,
  icons,
  selectedIcon
}) => {
  const gridCount = 24;
  const rowCount = 6;
  const iconCount = icons.length;

  const emptyPadCount =
    iconCount === 24
      ? 0
      : iconCount < gridCount
      ? iconCount - gridCount
      : rowCount - (iconCount % rowCount);

  const emptyPads = _range(emptyPadCount);

  return (
    <div className="icon-selector-main">
      <div className="icon-selector-main-inner">
        {_map(icons, m => (
          <div
            className={`icon-selector-main-pad ${
              selectedIcon?._id === m._id && " active "
            }`}
            key={m._id}
            onClick={() => handleIconSelect(m._id)}
          >
            <div className="icon-selector-main-icon">
              <Icon fontSize="inherit">{m.name}</Icon>
            </div>
            <div className="icon-selector-main-text">{m.display}</div>
          </div>
        ))}

        {_map(emptyPads, index => (
          <div className="icon-selector-main-pad" key={index}>
            <div className="icon-selector-main-icon"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSelectorMain;
