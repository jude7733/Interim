import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface updateState {
  value: string[];
}

const initialState: updateState = {
  value: [],
};

export const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    addUpdate: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {addUpdate} = updateSlice.actions;

export default updateSlice.reducer;
