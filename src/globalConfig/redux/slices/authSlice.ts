import { postLogin } from "@/modules/auth/services/postLogin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  encrypted: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginData: any;
  loginStatus: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  encrypted: null,
  loginData: null,
  loginStatus: "idle",
};

export const fetchLogin = createAsyncThunk(
  "login/fetch",
  async ({ encrypted }: { encrypted: string }) => {
    return postLogin(encrypted);
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginAction: (state) => {
      state.isAuthenticated = true;
    },
    logoutAction: (state) => {
      state.encrypted = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.loginData = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loginStatus = "failed";
      });
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
