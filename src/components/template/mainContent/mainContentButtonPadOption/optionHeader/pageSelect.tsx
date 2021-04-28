import React from "react";
import _map from "lodash/map";
import { useGlobalData, usePage } from "../../../../../hooks";
import { IntPages } from "../../../../../types";
export interface IntPageSelect {}

const PageSelect: React.FC<IntPageSelect> = () => {
  const globalData = useGlobalData();
  const { activatePage, readPages } = usePage();
  const pages = readPages();

  const handleChangePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    activatePage(e.target.value);
  };

  return (
    <>
      <select
        value={globalData.state.active.pageId}
        onChange={e => handleChangePage(e)}
      >
        {_map(
          pages,
          (m: IntPages, i): React.ReactElement => (
            <option key={m._id} value={m._id}>
              {i + 1} - {m._id}
            </option>
          )
        )}
      </select>
    </>
  );
};

export default PageSelect;
