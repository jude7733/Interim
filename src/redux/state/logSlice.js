import { createSlice } from '@reduxjs/toolkit'

export const logSlice = createSlice({
  name: 'log',
  initialState: {
    value: ["Welcome to Interim"],
  },
  reducers: {
    addLog: (state) => {
      state.value = state.value.push(state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addLog } = logSlice.actions;

export default logSlice.reducer


