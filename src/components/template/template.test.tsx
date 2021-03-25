import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TemplateWrapper from "./template";

describe("<Template Header Component/>", () => {
  it("Should render without errors", () => {
    const { getByTestId } = render(<TemplateWrapper />);
    const tHeaderComponent = getByTestId("template-wrapper-component");
    expect(tHeaderComponent).toBeTruthy();
  });
});
