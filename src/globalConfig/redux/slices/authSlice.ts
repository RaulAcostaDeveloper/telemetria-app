import { postLogin } from "@/modules/auth/services/postLogin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserData {
  userId: string;
  idCliente: string;
  username: string;
  accountName: string;
  expre_at: string;
}

interface LoginData {
  code: number;
  message: string;
  value: UserData;
}

interface AuthState {
  isAuthenticated: boolean;
  loginServerData: LoginData | null;
  loginStatus: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loginServerData: null,
  loginStatus: "idle",
};

// Middleware
export const fetchLogin = createAsyncThunk(
  "login/fetch",
  async ({ encrypted }: { encrypted: string }) => {
    return postLogin(encrypted);
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
    },
  },
  extraReducers: (builder) => {
    // Tiene que ver con el middleware
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loginStatus = "loading";
        state.loginServerData = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.loginServerData = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loginStatus = "failed";
        state.loginServerData = null;
      });
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
