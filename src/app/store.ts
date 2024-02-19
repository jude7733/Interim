import { configureStore } from "@reduxjs/toolkit";
import logReducer from "../features/logSlice";
import lockReducer from "../features/lockSlice";

export const store = configureStore({
  reducer: {
    log: logReducer,
    lock: lockReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
