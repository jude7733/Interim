import { configureStore } from "@reduxjs/toolkit";
import logReducer from "../features/logSlice";
import lockReducer from "../features/lockSlice";
import updateReducer from "../features/updateSlice";
import queueReducer from "../features/queueSlice";
import pipQueueReducer from "../features/pipQueueSlice";
import userReducer from "../features/userSlice";
import settingsReducer from "../features/settingsSlice";

export const store = configureStore({
  reducer: {
    log: logReducer,
    lock: lockReducer,
    update: updateReducer,
    queue: queueReducer,
    pip: pipQueueReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
