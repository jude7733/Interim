import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
