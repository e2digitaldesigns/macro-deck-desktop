import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import TemplateHeader from "./header";

describe("<Template Header Component/>", () => {
  it("Should render without errors", () => {
    const { getByTestId } = render(<TemplateHeader />);
    const component = getByTestId("template-header-component");
    expect(component).toBeTruthy();

    const fullScreenButton = getByTestId("template-header-full-screen");
    expect(fullScreenButton).toBeVisible();
  });

  it("Should match snapshot", () => {
    const { getByTestId } = render(<TemplateHeader />);
    const component = getByTestId("template-header-component");
    expect(component).toMatchSnapshot();
  });

  it("fullScreenExitButton should be visible", () => {
    const { getByTestId } = render(<TemplateHeader />);
    const fullScreenButton = getByTestId("template-header-full-screen");
    fireEvent.click(fullScreenButton);
    const fullScreenExitButton = getByTestId(
      "template-header-full-screen-exit"
    );
    expect(fullScreenExitButton).toBeVisible();
  });
});
