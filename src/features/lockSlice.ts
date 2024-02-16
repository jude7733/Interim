import { createSlice } from "@reduxjs/toolkit";

interface LockState {
  value: boolean;
}

const initialState: LockState = {
  value: false,
};

export const lockSlice = createSlice({
  name: "lock",
  initialState,
  reducers: {
    setLock: (state) => {
      !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLock } = lockSlice.actions;

export default lockSlice.reducer;
