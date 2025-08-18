import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  fetchLogin,
  loginAction,
  logoutAction,
} from "@/globalConfig/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoginForm, setIsLoginForm] = useState(false);

  // Estados del slice
  const { isAuthenticated, loginServerData, loginStatus } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isLoginForm) {
      if (
        loginStatus === "succeeded" &&
        loginServerData?.code === 200 &&
        loginServerData.value.userId.length > 3
      ) {
        loginState();
      } else {
        logoutState();
      }
    }
  }, [isLoginForm, loginServerData, loginStatus]);

  const tryLoginHook = (encrypted: string) => {
    // Llama al servicio
    dispatch(fetchLogin({ encrypted }));
    setIsLoginForm(true);
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
  };
};
