import React, { useEffect, useMemo, useRef, useState } from "react";
import _isEqual from "lodash/isEqual";
import {
  defaultState,
  GlobalContext
} from "./hooks/useGlobalDataHook/globalContext";
import { IntGlobalContextInterface } from "./types";
import TemplateWrapper from "./components/template/template";
import "./scss/styles.scss";
import SETTINGS from "./settings/system.json";

import { useElectron } from "./hooks";

declare const window: any;
let ipcRenderer = window.electron ? window.electron.ipcRenderer : null;

function App() {
  const [state, setState] = useState<IntGlobalContextInterface>({
    ...defaultState
  });
  const value = useMemo(() => ({ state, setState }), [state, setState]);
  const { loadAppData, saveAppData } = useElectron();
  const checkers: any = useRef({
    profiles: state.profiles,
    pages: state.pages,
    buttonPads: state.buttonPads,
    actions: state.actions
  });

  useEffect(() => {
    loadAppData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ipcRenderer &&
      ipcRenderer.on("database:return", (e: any, data: any) => {
        typeof data === "object" && setState(data);
      });
  }, []);

  useEffect(() => {
    const keys = SETTINGS.SAVE_ON_CHANGE_PARAMS;
    const stateCheck: any = {};
    const refCheck: any = {};
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      refCheck[key] = checkers.current[key];
      stateCheck[key] = state[key as keyof IntGlobalContextInterface];
    }

    if (!_isEqual(stateCheck, refCheck)) {
      for (let i = 0; i < keys.length; i++) {
        checkers.current[keys[i]] =
          state[keys[i] as keyof IntGlobalContextInterface];
      }

      saveAppData(state);
    }
  }, [state, saveAppData]);

  return (
    <>
      <GlobalContext.Provider value={value}>
        <div className="App">
          <TemplateWrapper />
        </div>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
