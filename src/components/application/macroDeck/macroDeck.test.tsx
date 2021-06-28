import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MacroDeck from "./macroDeck";

describe("<MacroDeck Component/>", () => {
  it("Should match snapshot", () => {
    const { getByTestId } = render(<MacroDeck />);
    const component = getByTestId("application-template-wrapper");
    expect(component).toMatchSnapshot();
  });

  it("Should render without errors", () => {
    const { getByTestId } = render(<MacroDeck />);
    const component = getByTestId("application-template-wrapper");
    expect(component).toBeTruthy();
  });
});
