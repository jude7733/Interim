import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type UserState = {
  value: User | { readonly email: string };
};
const initialState: UserState = {
  value: { email: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = { email: "" };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
