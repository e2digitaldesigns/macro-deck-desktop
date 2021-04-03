import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TemplateSideBar from "./sideBar";

const testSetup = () => {
  return render(<TemplateSideBar />);
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
    const component = wrapper.getByTestId("template-sidebar-component");
    expect(component).toBeTruthy();
  });
});
