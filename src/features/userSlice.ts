import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
