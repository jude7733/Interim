import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PipQueueState {
  value: string[];
}

const initialState: PipQueueState = {
  value: [],
};

export const pipQueueSlice = createSlice({
  name: "pip",
  initialState,
  reducers: {
    addPipQueue: (state, action: PayloadAction<string[]>) => {
      state.value.push(...action.payload);
    },
    popPipQueue: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((item) => item !== action.payload);
    },
    clearPipQueue: (state) => {
      state.value = [];
    },
  },
});

export const { addPipQueue, popPipQueue, clearPipQueue } = pipQueueSlice.actions;

export default pipQueueSlice.reducer;
