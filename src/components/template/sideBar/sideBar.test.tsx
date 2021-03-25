import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TemplateSideBar from "./sideBar";

describe("<Template Header Component/>", () => {
  it("Should render without errors", () => {
    const { getByTestId } = render(<TemplateSideBar />);
    const component = getByTestId("template-sidebar-component");
    expect(component).toBeTruthy();
  });
});
