import React, { useEffect, useMemo, useRef, useState } from "react";
import _isEqual from "lodash/isEqual";
import {
  defaultState,
  GlobalContext
} from "./hooks/useGlobalDataHook/globalContext";
import { IntGlobalContextInterface } from "./types";
import TemplateWrapper from "./components/template/template";
import "./scss/styles.scss";
import db from "./json/db2.json";
import SETTINGS from "./settings/system.json";

function App() {
  const [state, setState] = useState<IntGlobalContextInterface>({
    ...defaultState
  });
  const value = useMemo(() => ({ state, setState }), [state, setState]);
  const checkers: any = useRef({
    profiles: state.profiles,
    pages: state.pages,
    buttonPads: state.buttonPads,
    actions: state.actions
  });

  useEffect(() => {
    setState(state => db);
    console.log(28, "load data");
  }, []);

  useEffect(() => {
    console.clear();

    const keys = SETTINGS.SAVE_ON_CHANGE;
    const stateCheck: any = {};
    const refCheck: any = {};
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      refCheck[key] = checkers.current[key];
      stateCheck[key] = state[key as keyof IntGlobalContextInterface];
    }

    if (!_isEqual(stateCheck, refCheck)) {
      console.log(44, "diff save to file");
      for (let i = 0; i < keys.length; i++) {
        checkers.current[keys[i]] =
          state[keys[i] as keyof IntGlobalContextInterface];
      }
    }
  }, [state]);

  return (
    <GlobalContext.Provider value={value}>
      <div className="App">
        <TemplateWrapper />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
