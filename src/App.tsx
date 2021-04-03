import React, { useState, useMemo } from "react";
import {
  GlobalContext,
  iGlobalContextInterface
} from "./hooks/useGlobalData/globalContext";
import TemplateWrapper from "./components/template/template";
import "./scss/styles.scss";
import db from "./json/db.json";

function App() {
  const [state, setState] = useState<iGlobalContextInterface>({ ...db });
  const value = useMemo(() => ({ state, setState }), [state, setState]);

  return (
    <GlobalContext.Provider value={value}>
      <div className="App">
        <TemplateWrapper />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
