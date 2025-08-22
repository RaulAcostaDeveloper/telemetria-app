import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  loginAction,
  logoutAction,
} from "@/globalConfig/redux/slices/authSlice";
import { fetchLogin } from "../../services/postLogin";
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
      if (testSessionData && testSessionStatus === "succeeded") {
        loginState();
      } else if (
        testSessionStatus !== "idle" &&
        testSessionStatus !== "loading"
      ) {
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

  const logoutState = (isPushedLogin = true) => {
    // Actualizar el estado de redux
    dispatch(logoutAction());
    if (isPushedLogin) {
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
