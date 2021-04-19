export interface IntElectronHook {
  ipcRender: (name: string, data: string) => void;
}

declare const window: any;

let ipcRenderer = window.electron ? window.electron.ipcRenderer : null;

const useElectronHook = (): IntElectronHook => {
  const ipcRender = (name: string, data: string | object) => {
    ipcRenderer && ipcRenderer.send(name, data);
  };

  return {
    ipcRender
  };
};

export default useElectronHook;
