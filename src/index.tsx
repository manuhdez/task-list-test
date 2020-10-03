import React from "react";
import ReactDOM from "react-dom";
import { ReactQueryDevtools } from "react-query-devtools";

import App from "views/App";

import "normalize.css";
import "./index.scss";

const app = (
  <>
    <App />
    <ReactQueryDevtools />
  </>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);
