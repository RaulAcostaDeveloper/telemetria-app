import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  UserData,
  loginAction,
  logoutAction,
} from "@/globalConfig/redux/slices/authSlice";
import { RootState } from "@/globalConfig/redux/store";
import { deleteAuthCookie } from "@/modules/auth/utils/deleteAuthCookie/deleteAuthCookie";
import { setAuthCookie } from "@/modules/auth/utils/setAuthCookie/setAuthCookie";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, userData, sessionToken } = useSelector(
    (state: RootState) => state.auth
  );

  const tryLoginHook = async (sessionToken: string, userData: UserData) => {
    // Pendiente: persistir token en localStorage

    if (sessionToken) {
      const isTokenValid = true; // <-- pendiente de implementar API

      if (isTokenValid) {
        await login(sessionToken, userData);
      } else {
        await logoutHook();
      }
      return;
    }

    // Si no hay token, intentar login con userData
    const isUserValid = false; // <-- pendiente de implementar API
    const newToken = "nuevoToken"; // Este vendría de la API tras validar

    if (isUserValid && newToken) {
      await login(newToken, userData);
    } else {
      await logoutHook();
    }
  };

  const logoutHook = async () => {
    // Limpiar la cookie (server side)
    await deleteAuthCookie();

    // Actualizar el estado de redux
    dispatch(logoutAction());

    // Re dirigir
    router.push("/login");

    // Y pendiente borrar el token de localStorage
  };

  const login = async (sessionToken: string, userData: UserData) => {
    // Actualizar la cookie (server side)
    await setAuthCookie(sessionToken);

    // Actualizar el estado de redux
    dispatch(loginAction({ sessionToken, userData }));

    // Re dirigir
    router.push("/fuel"); // temporalmente a /fuel

    // Y pendiente actualizar el token de localStorage
  };

  return {
    isAuthenticated,
    logoutHook,
    sessionToken,
    tryLoginHook,
    userData,
  };
};
