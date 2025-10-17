import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { postLogin } from "@/modules/auth/services/postLogin";

interface UserData {
  userId: string;
  idCliente: string;
  username: string;
  accountName: string;
  expre_at: string;
}

interface LoginData {
  statusCode: number;
  message: string;
  value: UserData | null;
}

interface AuthState {
  isAuthenticated: boolean;
  loginServerData: LoginData | null;
  loginStatus: SERVICE_STATUS;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loginServerData: null,
  loginStatus: SERVICE_STATUS.idle,
};

// Middleware. Se está moviendo a /modules/auth/services/postLogin

export const fetchLogin = createAsyncThunk(
  "login/fetch",
  async ({ encrypted }: { encrypted: string }) => {
    return postLogin({ encrypted });
  }
);

// Slice
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginAction: (state) => {
      state.isAuthenticated = true;
    },
    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.loginServerData = null;
      state.loginStatus = SERVICE_STATUS.idle;
    },
  },
  extraReducers: (builder) => {
    // Tiene que ver con el middleware
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loginStatus = SERVICE_STATUS.loading;
        state.loginServerData = null;
        state.isAuthenticated = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loginStatus = SERVICE_STATUS.succeeded;
        state.loginServerData = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loginStatus = SERVICE_STATUS.failed;
        state.loginServerData = null;
        state.isAuthenticated = false;
      });
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
