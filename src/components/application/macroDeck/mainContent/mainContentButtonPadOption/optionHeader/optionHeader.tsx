import * as React from "react";
import PageSelect from "./pageSelect";
import { useGlobalData, usePage } from "../../../../../../hooks";

export interface IntOptionHeaderProps {}

const OptionHeader: React.FC<IntOptionHeaderProps> = () => {
  const globalData = useGlobalData();
  const { createPage, deletePage } = usePage();

  if (!globalData?.state?.active?.profileId) {
    return <div></div>;
  }

  return (
    <>
      <div className="page-header-wrapper">
        <div className="page-header">
          <PageSelect />
          <button className="option-header-button" onClick={createPage}>
            New Page
          </button>
          {globalData?.state.active.pageId && (
            <button
              className="option-header-button"
              onClick={() => deletePage()}
            >
              Remove Page
            </button>
          )}
        </div>
        <div className="page-tabs">
          <div className="page-tab">Settings</div>
        </div>
      </div>
    </>
  );
};

export default OptionHeader;
