import * as React from "react";
import PageSelect from "./pageSelect";
import { useGlobalData, usePage } from "../../../../../hooks";

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
          <PageSelect /> | <button onClick={createPage}>add new page</button> |{" "}
          {globalData?.state.active.pageId && (
            <button onClick={() => deletePage()}>delete page</button>
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
