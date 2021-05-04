import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TemplateSideBarHeader from "./sideBarHeader";

const testSetup = () => {
  return render(<TemplateSideBarHeader />);
};

let wrapper: any = null;
beforeEach(() => {
  wrapper = testSetup();
});

afterEach(() => {
  wrapper = null;
});

describe("<Template Header Component/>", () => {
  it("Should render without errors", () => {
    const component = wrapper.getByTestId("template-sidebar-header");
    expect(component).toBeTruthy();
  });
});
