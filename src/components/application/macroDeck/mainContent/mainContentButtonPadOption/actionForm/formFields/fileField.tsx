import React from "react";
import _upperFirst from "lodash/upperFirst";
import SETTINGS from "../../../../../../../settings/system.json";

const formField = (
  name: string,
  fileFieldRef: any,
  onChange: any
): React.ReactElement => {
  return (
    <>
      <div>
        <label htmlFor={name}>{_upperFirst(name)}:</label>
        <input
          ref={fileFieldRef}
          id="mdFileField"
          type="file"
          onChange={onChange}
          accept={SETTINGS.FILE_TYPES}
        />
      </div>
    </>
  );
};

export default formField;
