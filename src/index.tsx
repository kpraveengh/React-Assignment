import * as React from "react";
import { render } from "react-dom";
const { Provider } = require("react-redux");
import { BrowserRouter, Switch } from "react-router-dom";
import { store, persistor } from "./store/index";
import { PersistGate } from 'redux-persist/integration/react';
import "../node_modules/bootstrap/dist/css/bootstrap";
import "../assets/scss/main.scss";
import "../assets/scss/mixins.scss";
import Main from '../src/core/main'



function renderApp():
  | React.Component<any, React.ComponentState>
  | Element
  | void {
  let rootElement = document.getElementById("root");
  render(
    <div>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Main />            
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>,
    rootElement as Element
  );
}
renderApp();