import * as React from "react";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _includes from "lodash/includes";
import _cloneDeep from "lodash/cloneDeep";
import IconSelectorMain from "./iconSelectorMain";
import IconSelectorOptions from "./iconSelectorOptions";
import icons from "../../../../../../settings/icons.json";
import { intIconProps } from "../../../../../../types";
import { useAppData } from "../../../../../../hooks";
export interface IntIconSelectorWrapper {}

const IconSelectorWrapper: React.FC<IntIconSelectorWrapper> = () => {
  const { appState, setAppState } = useAppData();

  const [searchFilter, setSearchFilter] = React.useState<string>("");
  const [selectedIcon, setSelectedIcon] = React.useState<intIconProps | null>(
    null
  );

  const handleSearchFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(e.target.value);
  };

  const handleIconSelect = (_id: string): void => {
    const icon = _find(icons, { _id: _id });
    icon && setSelectedIcon(icon);
  };

  const handleClearIcon = (): void => {
    setSelectedIcon(null);
  };

  const handleButtonSubmit = (): void => {
    const state = _cloneDeep(appState);
    state.iconSelector.icon = selectedIcon?.name;
    setAppState({ ...state });
  };

  const iconFilter: intIconProps[] = searchFilter
    ? _filter(icons, f => _includes(f.name, searchFilter))
    : icons;

  return (
    <div className="icon-selector-wrapper">
      <IconSelectorMain
        handleIconSelect={handleIconSelect}
        icons={iconFilter}
        selectedIcon={selectedIcon}
      />
      <IconSelectorOptions
        handleButtonSubmit={handleButtonSubmit}
        handleClearIcon={handleClearIcon}
        handleSearchFilter={handleSearchFilter}
        selectedIcon={selectedIcon}
      />
    </div>
  );
};

export default IconSelectorWrapper;
