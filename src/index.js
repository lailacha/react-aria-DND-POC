import { darkTheme, Provider } from "@adobe/react-spectrum";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider theme={darkTheme} height="100%">
    <App />
  </Provider>,
  rootElement
);
