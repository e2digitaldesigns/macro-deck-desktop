import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TemplateMainContent from "./mainContent";

describe("<Template Header Component/>", () => {
  it("Should render without errors", () => {
    const { getByTestId } = render(<TemplateMainContent />);
    const component = getByTestId("template-main-content-component");
    expect(component).toBeTruthy();
  });

  it("Should render without errors", () => {
    const { getByTestId } = render(<TemplateMainContent />);
    const component = getByTestId("template-main-content-component");
    expect(component).toMatchSnapshot();
  });
});
