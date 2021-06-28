import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TemplateWrapper from "./template";

describe("<Template Header Component/>", () => {
  it("Should match snapshot", () => {
    const { getByTestId } = render(<TemplateWrapper />);
    const headerComponent = getByTestId("template-wrapper-section");
    expect(headerComponent).toMatchSnapshot();
  });

  it("Should render without errors", () => {
    const { getByTestId } = render(<TemplateWrapper />);
    const headerComponent = getByTestId("template-wrapper-section");
    expect(headerComponent).toBeTruthy();
  });
});
