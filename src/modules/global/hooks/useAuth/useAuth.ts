import { useDispatch, useSelector } from "react-redux";

import {
  UserData,
  loginAction,
  logoutAction,
} from "@/globalConfig/redux/slices/authSlice";
import { RootState } from "@/globalConfig/redux/store";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userData, sessionToken } = useSelector(
    (state: RootState) => state.auth
  );

  const loginHook = (sessionToken: string, userData: UserData) => {
    // Pendiente de validar los datos con la api de autenticación
    // Pendiente controlar el token con localStorage
    dispatch(loginAction({ sessionToken, userData }));
  };

  const logoutHook = () => {
    // Y borrar el token de localStorage
    dispatch(logoutAction());
  };

  return {
    isAuthenticated,
    userData,
    sessionToken,
    loginHook,
    logoutHook,
  };
};
