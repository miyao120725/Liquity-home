import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import './utils/i18n';
import './utils/axios_config';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
