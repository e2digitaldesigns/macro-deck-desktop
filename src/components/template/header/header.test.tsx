import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TemplateHeader, { ITemplateHeader } from "./header";

const mockFunction = {
  closeApplication: jest.fn(),
  fullScreenToggleApplication: jest.fn(),
  minimizeApplication: jest.fn()
};

const testSetup = (props: ITemplateHeader = mockFunction) => {
  return render(<TemplateHeader {...props} />);
};

let container: any = null;
beforeEach(() => {
  container = testSetup();
});

afterEach(() => {
  container = null;
});

describe("<Template Header Component/>", () => {
  it("Should render without errors", () => {
    const header = container.getByTestId("template-header-component");
    expect(header).toBeTruthy();

    const fullScreenButton = container.getByTestId(
      "template-header-full-screen-button"
    );
    expect(fullScreenButton).toBeVisible();

    const minimizeButton = container.getByTestId(
      "template-header-minimize-button"
    );
    expect(minimizeButton).toBeVisible();
  });

  it("Should match snapshot", () => {
    const header = container.getByTestId("template-header-component");
    expect(header).toMatchSnapshot();
  });

  it("Should call fullScreenToggle", () => {
    const fullScreenButton = container.getByTestId(
      "template-header-full-screen-button"
    );
    fireEvent.click(fullScreenButton);

    const fullScreenExitButton = container.getByTestId(
      "template-header-full-screen-exit-button"
    );

    waitFor(() => {
      expect(fullScreenExitButton).toBeVisible();
    });

    fireEvent.click(fullScreenExitButton);
    expect(fullScreenButton).toBeVisible();
  });

  it("Should call minimizeApplication", () => {
    const button = container.getByTestId("template-header-minimize-button");
    expect(button).toBeVisible();
    fireEvent.click(button);
  });

  it("Should call closeApplication", () => {
    const button = container.getByTestId("template-header-full-close-button");
    expect(button).toBeVisible();
    fireEvent.click(button);
  });
});
