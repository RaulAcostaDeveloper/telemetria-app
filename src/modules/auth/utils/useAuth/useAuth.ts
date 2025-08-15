import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  fetchLogin,
  loginAction,
  logoutAction,
} from "@/globalConfig/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { useEffect } from "react";

export const useAuth = () => {
  //const dispatch = useDispatch();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, encrypted, loginData, loginStatus } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    console.log("Ld: ", loginData, "Ls: ", loginStatus);
    if (loginStatus === "succeeded") {
      loginState();
    }
  }, [loginData, loginStatus]);

  const tryLoginHook = async (encrypted: string) => {
    console.log("conectando, ejecutando servidor");
    dispatch(fetchLogin({ encrypted }));
  };

  const logoutHook = async () => {
    // Actualizar el estado de redux
    dispatch(logoutAction());

    // Re dirigir
    router.push("/login");

    // Y pendiente borrar el token de localStorage
  };

  const loginState = async () => {
    // Actualizar el estado de redux
    dispatch(loginAction());

    // Re dirigir
    router.push("/home");

    // Y pendiente actualizar el token de localStorage
  };

  return {
    isAuthenticated,
    logoutHook,
    encrypted,
    tryLoginHook,
  };
};
