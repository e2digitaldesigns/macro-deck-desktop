import * as React from "react";
import { Header, Ul, UlRight } from "./headerStyles";

export interface ITemplateHeader {}

const TemplateHeader: React.FC<ITemplateHeader> = () => {
  return (
    <>
      <Header data-testid="template-header-component">
        <Ul data-testid="template-header-menu">
          <li>File</li>
          <li>Edit</li>
          <li>Selection</li>
          <li>View</li>
          <li>Go</li>
        </Ul>

        <UlRight data-testid="template-header-options">
          <li>min</li>
          <li>max</li>
          <li>close</li>
        </UlRight>
      </Header>
    </>
  );
};

export default TemplateHeader;
