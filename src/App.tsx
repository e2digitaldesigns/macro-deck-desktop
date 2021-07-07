import React, { useEffect, useMemo, useRef, useState } from "react";
import _isEqual from "lodash/isEqual";
import {
  defaultState,
  GlobalContext
} from "./hooks/useGlobalDataHook/globalContext";

import { appDefaultState, AppContext } from "./hooks/useAppDataHook/appContext";

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

  const [appState, setAppState] = useState<any>({
    ...appDefaultState
  });

  const globalValue = useMemo(() => ({ state, setState }), [state, setState]);

  const tempValue = useMemo(
    () => ({ appState, setAppState }),
    [appState, setAppState]
  );

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

  useEffect(() => {
    const resizeListener = () => {
      const thisApp: any = document.querySelector(".App");
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      let fontSize = width * 0.01145;
      // let fontSize = width * 0.0125;

      fontSize =
        fontSize <= SETTINGS.FONT_SIZE_MIN
          ? SETTINGS.FONT_SIZE_MIN
          : fontSize >= SETTINGS.FONT_SIZE_MAX
          ? SETTINGS.FONT_SIZE_MAX
          : fontSize;

      thisApp.style.fontSize = `${fontSize.toFixed(2)}px`;
    };

    resizeListener();
    // set resize listener
    window.addEventListener("resize", resizeListener);

    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <>
      <GlobalContext.Provider value={globalValue}>
        <AppContext.Provider value={tempValue}>
          <div className="App">
            <TemplateWrapper />
          </div>
        </AppContext.Provider>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
