import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, Switch } from "react-router-dom";
import TemplateHeader, { ITemplateHeader } from "./header";
import { useElectron } from "./../../../hooks";

const mockHooks = {
  ipcRender: jest.fn()
};

jest.mock("./../../../hooks", () => ({
  useElectron: () => ({
    ipcRender: mockHooks.ipcRender
  })
}));

const testSetup = () => {
  return render(
    <BrowserRouter>
      <Switch>
        <TemplateHeader />{" "}
      </Switch>
    </BrowserRouter>
  );
};

let container: any = null;
beforeEach(() => {
  container = testSetup();
});

afterEach(() => {
  container = null;
  jest.clearAllMocks();
});

describe("<Template Header Component/>", () => {
  it("Should match snapshot", () => {
    const header = container.getByTestId("template-header-component");
    expect(header).toMatchSnapshot();
  });

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

  it("Should show fullScreen button", () => {
    const fullScreenButton = container.getByTestId(
      "template-header-full-screen-button"
    );
    expect(fullScreenButton).toBeVisible();
  });

  it("Should show minimize button", () => {
    const minimizeButton = container.getByTestId(
      "template-header-minimize-button"
    );
    expect(minimizeButton).toBeVisible();
  });

  it("Should show close button", () => {
    const button = container.getByTestId("template-header-full-close-button");
    expect(button).toBeVisible();
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

  it("Should call fullScreen IPC Render Hook", () => {
    const fullScreenButton = container.getByTestId(
      "template-header-full-screen-button"
    );
    fireEvent.click(fullScreenButton);

    expect(mockHooks.ipcRender).toHaveBeenCalled();
  });

  it("Should call minimize IPC Render Hook", () => {
    const button = container.getByTestId("template-header-minimize-button");
    fireEvent.click(button);
    expect(mockHooks.ipcRender).toHaveBeenCalled();
  });

  it("Should call close IPC Render Hook", () => {
    const button = container.getByTestId("template-header-full-close-button");
    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(mockHooks.ipcRender).toHaveBeenCalled();
  });
});
