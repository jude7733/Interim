import { configureStore } from "@reduxjs/toolkit";
import logReducer from "../features/logSlice";

export const store = configureStore({
  reducer: {
    log: logReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
