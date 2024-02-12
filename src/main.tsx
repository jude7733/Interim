import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { logReducer } from "./redux/state/logSlice";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
const store = configureStore({
  reducer: {
    log: logReducer,
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
