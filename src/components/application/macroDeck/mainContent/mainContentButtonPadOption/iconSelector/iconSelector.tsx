import * as React from "react";

export interface IntIconSelector {
  close: () => void;
}

const IconSelector: React.FC<IntIconSelector> = ({ close }) => {
  return <h1>DAMN</h1>;
};

export default IconSelector;
