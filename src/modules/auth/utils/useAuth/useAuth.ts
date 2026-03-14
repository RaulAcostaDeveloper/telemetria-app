"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import {
  loginAction,
  logoutAction,
} from "@/global/redux/serviceSlices/authSlice";
import { AppDispatch, RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { callLogout } from "@/global/redux/serviceSlices/logoutSlice";
import { fetchBrands } from "@/global/redux/serviceSlices/brandsSlice";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const [isLoginForm] = useState(false);
  const [isFromFirstSession, setIsFromFirstSession] = useState(false);

  // Estados del slice
  const { isAuthenticated, loginServerData, loginStatus } = useSelector(
    (state: RootState) => state.auth,
  );

  //Usado para comprobar sesión activa economizando endpoint.
  const { brandsData, brandsStatus } = useSelector(
    (state: RootState) => state.brands,
  );

  useEffect(() => {
    if (isLoginForm) {
      if (
        loginServerData &&
        loginServerData.value &&
        loginStatus === SERVICE_STATUS.succeeded &&
        loginServerData?.statusCode === 200 &&
        loginServerData.value.userId.length > 3
      ) {
        loginState();
      } else if (
        loginStatus !== SERVICE_STATUS.idle &&
        loginStatus !== SERVICE_STATUS.loading
      ) {
        const isPushedLogin = false;
        logoutState(isPushedLogin);
      }
    }
  }, [isLoginForm, loginServerData, loginStatus]);

  useEffect(() => {
    if (isFromFirstSession) {
      if (
        200 === brandsData?.statusCode &&
        brandsStatus === SERVICE_STATUS.succeeded
      ) {
        loginState();
      } else if (
        brandsStatus !== SERVICE_STATUS.idle &&
        brandsStatus !== SERVICE_STATUS.loading &&
        200 !== brandsData?.statusCode
      ) {
        logoutState();
      }
    }
  }, [isFromFirstSession, brandsData, brandsStatus]);

  const tryLoginHook = () => {
    loginState(); // quitar esto y poner lo de abajo
    router.push("/home");
    // // Llama al servicio
    // dispatch(fetchLogin({ encrypted }));
    // setIsLoginForm(true);
  };

  // Prueba si trae la cookie, desde el primer render
  const tryFirstServerSession = () => {
    dispatch(fetchBrands());
    setIsFromFirstSession(true);
  };

  const loginState = () => {
    // Actualizar el estado de redux
    dispatch(loginAction());

    if (pathname && pathname !== "/" && pathname !== "/login") {
      router.push(pathname);
    } else {
      router.push("/home");
    }
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
    tryFirstServerSession,
    tryLoginHook,
  };
};
