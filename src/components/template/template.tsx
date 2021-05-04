import * as React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../application/home/home";
import MacroDeck from "../application/macroDeck/macroDeck";
import Settings from "../application/settings/settings";

import Header from "./header/header";

export interface ITemplateWrapperProps {}

const PrimaryTemplate: React.FC<ITemplateWrapperProps> = () => {
  return (
    <>
      <section data-testid="template-wrapper-section">
        <ToastContainer autoClose={4000} pauseOnFocusLoss={false} />

        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/macroDeck" component={MacroDeck} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/settings" component={Settings} />
            <Redirect to="/macroDeck" />
          </Switch>
        </BrowserRouter>
      </section>
    </>
  );
};

export default PrimaryTemplate;
