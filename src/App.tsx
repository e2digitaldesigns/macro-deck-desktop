import { GlobalContext } from "./context/globalContext";
import TemplateWrapper from "./components/template/template";
import "./scss/styles.scss";

function App() {
  return (
    <GlobalContext.Provider
      value={{
        userInformation: { _id: "xxx", name: "Mark Bell" }
      }}
    >
      <div className="App">
        <TemplateWrapper />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
