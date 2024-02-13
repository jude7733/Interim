import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogState {
  value: string[];
}

const initialState: LogState = {
  value: ["Welcome to Interim"],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLog } = logSlice.actions;

export default logSlice.reducer;
