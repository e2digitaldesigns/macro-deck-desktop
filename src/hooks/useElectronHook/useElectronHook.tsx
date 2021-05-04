import { IntGlobalContextInterface } from "./../../types/globalContextType";
export interface IntElectronHook {
  ipcRender: (name: string, data: string) => void;
  loadAppData: () => any;
  saveAppData: (data: IntGlobalContextInterface) => void;
}

declare const window: any;
const ipcRenderer = window.electron ? window.electron.ipcRenderer : null;

const useElectronHook = (): IntElectronHook => {
  const ipcRender = (name: string, data: string | object) => {
    ipcRenderer && ipcRenderer.send(name, data);
  };

  const loadAppData: IntElectronHook["loadAppData"] = () => {
    console.log(18, "load from file");
    if (!ipcRenderer) return;
    ipcRenderer.send("database", { action: "loadAppData" });
  };

  const saveAppData: IntElectronHook["saveAppData"] = data => {
    console.log(17, data);
    if (!ipcRenderer) return;
    ipcRenderer.send("database", { action: "saveAppData", data });
  };

  return {
    ipcRender,
    loadAppData,
    saveAppData
  };
};

export default useElectronHook;
