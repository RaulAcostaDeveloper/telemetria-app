import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  loginAction,
  logoutAction,
} from "@/globalConfig/redux/slices/authSlice";
import { fetchLogin } from "../../services/postLogin";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { fetchBrands } from "@/globalConfig/redux/slices/brandsSlice";
import { callLogout } from "@/globalConfig/redux/slices/logoutSlice";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoginForm, setIsLoginForm] = useState(false);
  const [isFromFirstSession, setIsFromFirstSession] = useState(false);

  // Estados del slice
  const { isAuthenticated, loginServerData, loginStatus } = useSelector(
    (state: RootState) => state.auth
  );

  //Usado para comprobar sesión activa economizando endpoint.
  const { brandsData, brandsStatus } = useSelector(
    (state: RootState) => state.brands
  );

  useEffect(() => {
    if (isLoginForm) {
      if (
        loginServerData &&
        loginServerData.value &&
        loginStatus === "succeeded" &&
        loginServerData?.code === 200 &&
        loginServerData.value.userId.length > 3
      ) {
        loginState();
      } else if (loginStatus !== "idle" && loginStatus !== "loading") {
        const isPushedLogin = false;
        logoutState(isPushedLogin);
      }
    }
  }, [isLoginForm, loginServerData, loginStatus]);

  useEffect(() => {
    if (isFromFirstSession) {
      if (200 === brandsData?.statusCode && brandsStatus === "succeeded") {
        loginState();
      } else if (brandsStatus !== "idle" && brandsStatus !== "loading") {
        logoutState();
      }
    }
  }, [isFromFirstSession, brandsData, brandsStatus]);

  const tryLoginHook = (encrypted: string) => {
    // Llama al servicio
    dispatch(fetchLogin({ encrypted }));
    setIsLoginForm(true);
  };

  // Prueba si trae la cookie, desde el primer render
  const tryFirstServerSession = () => {
    dispatch(fetchBrands());
    setIsFromFirstSession(true);
  };

  const loginState = () => {
    // Actualizar el estado de redux
    dispatch(loginAction());
    router.push("/home");
  };

  const logoutState = (isPushedLogin = true) => {
    // Actualizar el estado de redux
    dispatch(logoutAction());
    if (isPushedLogin) {
      dispatch(callLogout());
      router.push("/login");
    }
  };

  return {
    isAuthenticated,
    logoutState,
    tryLoginHook,
    tryFirstServerSession,
  };
};
