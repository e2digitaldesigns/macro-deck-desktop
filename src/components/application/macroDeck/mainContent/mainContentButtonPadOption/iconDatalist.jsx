import { useMemo, useCallback } from "react";
import DataListInput from "react-datalist-input";
import ICONS from "../../../../../settings/icons.json";

const IconDataList = ({ onChange, value }) => {
  const onSelect = useCallback(selectedItem => {
    console.log(selectedItem.key);
  }, []);

  const items = useMemo(
    () =>
      ICONS.map(oneItem => ({
        label: oneItem.text,
        key: oneItem.value,
        someAdditionalValue: oneItem.value
      })),
    []
  );

  return (
    <DataListInput
      items={items}
      value={value}
      onSelect={onSelect}
      inputClassName="button-form-data-list"
      itemClassName="xxx"
    />
  );
};

export default IconDataList;
