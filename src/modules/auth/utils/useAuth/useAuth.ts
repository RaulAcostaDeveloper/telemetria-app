import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  fetchLogin,
  loginAction,
  logoutAction,
} from "@/globalConfig/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { fetchTestSession } from "@/globalConfig/redux/slices/testSessionSlice";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoginForm, setIsLoginForm] = useState(false);
  const [isFromFirstSession, setIsFromFirstSession] = useState(false);

  // Estados del slice
  const { isAuthenticated, loginServerData, loginStatus } = useSelector(
    (state: RootState) => state.auth
  );

  const { testSessionData, testSessionStatus } = useSelector(
    (state: RootState) => state.testSession
  );

  useEffect(() => {
    if (isLoginForm) {
      if (
        loginStatus === "succeeded" &&
        loginServerData?.code === 200 &&
        loginServerData.value.userId.length > 3
      ) {
        loginState();
      } else if (loginStatus === "failed") {
        logoutState();
      }
    }
  }, [isLoginForm, loginServerData, loginStatus]);

  useEffect(() => {
    if (isFromFirstSession) {
      if (testSessionData && testSessionStatus === "succeeded") {
        loginState();
      } else if (testSessionStatus === "failed") {
        logoutState();
      }
    }
  }, [isFromFirstSession, testSessionData, testSessionStatus]);

  const tryLoginHook = (encrypted: string) => {
    // Llama al servicio
    dispatch(fetchLogin({ encrypted }));
    setIsLoginForm(true);
  };

  // Prueba si trae la cookie, desde el primer render
  const tryFirstServerSession = () => {
    dispatch(fetchTestSession());
    setIsFromFirstSession(true);
  };

  const loginState = () => {
    // Actualizar el estado de redux
    dispatch(loginAction());
    router.push("/home");
  };

  const logoutState = () => {
    // Actualizar el estado de redux
    dispatch(logoutAction());
    router.push("/login");
  };

  return {
    isAuthenticated,
    logoutState,
    tryLoginHook,
    tryFirstServerSession,
  };
};
