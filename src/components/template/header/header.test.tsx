import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TemplateHeader from "./header";

describe("<Template Header Component/>", () => {
  it("Should render without errors", () => {
    const { getByTestId } = render(<TemplateHeader />);
    const tHeaderComponent = getByTestId("template-header-component");
    expect(tHeaderComponent).toBeTruthy();
  });
});
