import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "../types/serviceTypes";
import { logoutSession } from "@/modules/auth/services/logout";

interface LoginData {
  code: number;
  message: string;
  value: null;
}

interface LogoutState {
  logoutData: string | LoginData | null;
  logoutStatus: SERVICE_STATUS;
}

const initialState: LogoutState = {
  logoutData: null,
  logoutStatus: SERVICE_STATUS.idle,
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
        state.logoutStatus = SERVICE_STATUS.loading;
      })
      .addCase(callLogout.fulfilled, (state) => {
        state.logoutStatus = SERVICE_STATUS.succeeded;
      })
      .addCase(callLogout.rejected, (state) => {
        state.logoutStatus = SERVICE_STATUS.failed;
      });
  },
});

export default logoutSlice.reducer;
