import { configureStore } from "@reduxjs/toolkit";
import logReducer from "../features/logSlice";
import lockReducer from "../features/lockSlice";
import updateReducer from "../features/updateSlice";
import queueReducer from "../features/queueSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    log: logReducer,
    lock: lockReducer,
    update: updateReducer,
    queue: queueReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
