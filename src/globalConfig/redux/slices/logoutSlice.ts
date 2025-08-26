import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutSession } from "@/modules/auth/services/logout";

interface LogoutState {
  logoutData: string | null;
  logoutStatus: string;
}

const initialState: LogoutState = {
  logoutData: null,
  logoutStatus: "idle",
};

export const callLogout = createAsyncThunk("logout/fetch", async () => {
  return logoutSession();
});

const logoutSlice = createSlice({
  name: "logoutSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(callLogout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(callLogout.fulfilled, (state) => {
        state.logoutStatus = "succeeded";
      })
      .addCase(callLogout.rejected, (state) => {
        state.logoutStatus = "failed";
      });
  },
});

export default logoutSlice.reducer;
