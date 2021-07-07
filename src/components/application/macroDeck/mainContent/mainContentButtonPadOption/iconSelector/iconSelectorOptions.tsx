import * as React from "react";
import Icon from "@material-ui/core/Icon";
import _cloneDeep from "lodash/cloneDeep";
import { intIconProps } from "../../../../../../types";
import { useAppData } from "../../../../../../hooks";

export interface IntIconSelectorOptions {
  handleButtonSubmit: () => void;
  handleClearIcon: () => void;
  handleSearchFilter: (e: any) => void;
  selectedIcon: intIconProps | null;
}

const IconSelectorOptions: React.FC<IntIconSelectorOptions> = ({
  handleButtonSubmit,
  handleClearIcon,
  handleSearchFilter,
  selectedIcon
}) => {
  const { appState, setAppState } = useAppData();

  const handleClose = () => {
    const state = _cloneDeep(appState);
    state.iconSelector.isVisible = false;
    setAppState({ ...state });
  };

  return (
    <div className="icon-selector-options">
      <div className="icon-selector-options-inner">
        <div className="icon-selector-options-search">
          <input
            onChange={e => handleSearchFilter(e)}
            placeholder="search..."
            type="search"
          />
        </div>

        {selectedIcon?.name && (
          <>
            <div className="icon-selector-options-icon">
              <Icon fontSize="inherit">{selectedIcon.name}</Icon>
            </div>
            <div className="icon-selector-options-text">
              {selectedIcon.display}
            </div>
          </>
        )}

        <button disabled={!selectedIcon} onClick={handleButtonSubmit}>
          add to button
        </button>
        <button onClick={handleClose}>xxx close xxx</button>
        <button disabled={!selectedIcon} onClick={handleClearIcon}>
          xxx clear xxx
        </button>
      </div>
    </div>
  );
};

export default IconSelectorOptions;
