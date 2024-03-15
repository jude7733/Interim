import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QueueState {
  value: string[];
}

const initialState: QueueState = {
  value: [],
};

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    addQueue: (state, action: PayloadAction<string[]>) => {
      state.value.push(...action.payload);
    },
    popQueue: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((item) => item !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQueue, popQueue } = queueSlice.actions;

export default queueSlice.reducer;
