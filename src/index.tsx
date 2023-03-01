import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store";

const darkTheme = createTheme({
  type: "dark",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <NextUIProvider theme={darkTheme}>
      <App />
    </NextUIProvider>
  </Provider>
);
