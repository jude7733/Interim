import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Settings {
  value: {
    accent: "yellow" | "orange" | "green" | "blue" | "purple" | "red";
    autoFetch: "on" | "off";
    power: "off" | "shutdown" | "reboot";
  };
}

const initialState: Settings = {
    value: { accent: "yellow", autoFetch: "on", power: "off" },
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        changeSettings: (state, action: PayloadAction<Settings['value']>) => {
            state.value = action.payload;
        },
    },
});

export const { changeSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
