"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";

import CheckLogin from "@/modules/login/checkLogin/checkLogin";
import styles from "./mainWrapper.module.css";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "../../localStorage/utils/storageService";
import { ENGLISH } from "../../language/constants/english";
import { Header } from "../header/header";
import { LANGUAGE_OPTIONS } from "../../language/utils/languageSelector.model";
import { LanguageContext } from "../../language/components/languageProvider/languageProvider";
import { LanguageInterface } from "../../language/constants/language.model";
import { Menu } from "../menu/menu";
import { PageContainer } from "../pageContainer/pageContainer";
import { SPANISH } from "../../language/constants/spanish";
import { STORAGE_KEYS } from "../../localStorage/constants/storageKeys";
import { fetchDevices } from "@/globalConfig/redux/slices/devicesSlice";
import { fetchDrivers } from "@/globalConfig/redux/slices/driversSlice";
import { fetchFuelSummary } from "@/globalConfig/redux/slices/fuelSummarySlice";
import { fetchGroups } from "@/globalConfig/redux/slices/groupsSlice";
import { fetchObdRollup } from "@/globalConfig/redux/slices/obdRollupSlice";
import { fetchTopFuelReport } from "@/globalConfig/redux/slices/topFuelReportSlice";
import { fetchVehicles } from "@/globalConfig/redux/slices/vehiclesSlice";
import { useAuth } from "../../../auth/utils";

interface Props {
  children: React.ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const [LANGUAGE, setLanguageObject] = useState<LanguageInterface>(SPANISH);

  const dispatch = useDispatch<AppDispatch>();

  const languageSelected = useSelector(
    (state: RootState) => state.languageOption.languageSelected
  );

  const { isAuthenticated, logoutState, tryFirstServerSession } = useAuth();

  // Usado para probar la sesion activa
  const { brandsStatus } = useSelector((state: RootState) => state.brands);

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  useEffect(() => {
    tryFirstServerSession();
  }, []);

  // Aquí trae de redux y modifica el LANGUAGE
  // Actualizar en caso de agregar un nuevo idioma
  useEffect(() => {
    switch (languageSelected) {
      case LANGUAGE_OPTIONS.SPANISH:
        setLanguageObject(SPANISH);
        break;
      case LANGUAGE_OPTIONS.ENGLISH:
        setLanguageObject(ENGLISH);
        break;
      default:
        setLanguageObject(SPANISH);
        break;
    }
  }, [languageSelected]);

  // Ejemplo de como cambiar el idioma
  // setTimeout(() => {
  //   dispatch(setLanguageReducer(LANGUAGE_OPTIONS.ENGLISH));
  // }, 5000);

  useEffect(() => {
    const defaultValue: boolean = false;
    const storedValue: boolean | null = localStorageGetItem(
      STORAGE_KEYS.MENU_OPEN
    );

    if (storedValue) {
      setIsMenuOpen(storedValue);
    } else {
      setIsMenuOpen(defaultValue);
      localStorageSetItem(STORAGE_KEYS.MENU_OPEN, defaultValue);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen !== null) {
      localStorageSetItem(STORAGE_KEYS.MENU_OPEN, isMenuOpen);
    }
  }, [isMenuOpen]);

  // Cerrar el menú en resolución movile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            setIsMenuOpen(false);
          }, 10);
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Servicios al inicio de la sesión del usuario
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(
        fetchVehicles({
          accountId: "90926",
        })
      );
      dispatch(
        fetchDevices({
          accountId: "90926",
        })
      );
      dispatch(
        fetchDrivers({
          accountId: "90926",
        })
      );
      dispatch(
        fetchGroups({
          accountId: "90926",
        })
      );
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && startDate && endDate) {
      dispatch(
        fetchFuelSummary({
          accountId: "90926", //"4992"
          startDate: "2024-08-17T00:00:00", // formatToLocalIso8601(startDate),
          endDate: "2024-08-21T00:00:00",
          performanceType: "1",
        })
      );
      dispatch(
        fetchTopFuelReport({
          accountId: "90926",
          startDate: "2024-09-01T00:00:00", // formatToLocalIso8601(startDate),
          endDate: "2024-09-30T00:00:00",
          numberOfVehicles: 10,
        })
      );
      dispatch(
        fetchObdRollup({
          accountId: "90926",
          startDate: "2025-07-17T00:00:00", // formatToLocalIso8601(startDate),
          endDate: "2025-10-21T00:00:00",
        })
      );
    }
  }, [isAuthenticated, startDate, endDate]);

  // Se usa brandsStatus para economizar tener un endpoint especifico que verifique sesión
  return brandsStatus === "loading" ? (
    <div>
      <CheckLogin />
    </div>
  ) : (
    <div className={`${styles.mainWrapper}`}>
      {isAuthenticated && (
        <Menu
          LANGUAGE={LANGUAGE}
          isMenuOpen={isMenuOpen}
          logoutState={logoutState}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      <div className={`${styles.rightContent}`}>
        {isAuthenticated && (
          <Header LANGUAGE={LANGUAGE} isMenuOpen={isMenuOpen} />
        )}

        {/* Contenido de la página */}
        <LanguageContext.Provider value={LANGUAGE}>
          <PageContainer>{children}</PageContainer>
        </LanguageContext.Provider>
      </div>
    </div>
  );
};
