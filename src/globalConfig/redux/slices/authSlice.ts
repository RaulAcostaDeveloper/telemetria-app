import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  // Pendiente de definir
  email: string;
  id: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  sessionToken: string | null;
  userData: UserData | null;
}

const initialState: AuthState = {
  isAuthenticated: false, // cambiar esto a false cuando se tenga un sistema de autenticación más robusto
  sessionToken: null,
  userData: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginAction: (
      state,
      action: PayloadAction<{ sessionToken: string; userData: UserData }>
    ) => {
      state.sessionToken = action.payload.sessionToken;
      state.userData = action.payload.userData;
      state.isAuthenticated = true;
    },
    logoutAction: (state) => {
      state.sessionToken = null;
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
