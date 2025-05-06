"use client";
import { useEffect } from "react";
import { cleanExpiredCache } from "../../utils/utils";

// Componente que ejecuta la función para limpiar caché de más de 7 días de vida
// Se ejecuta al iniciar la aplicación
export const CacheCleaner = () => {
  useEffect(() => {
    cleanExpiredCache();
  }, []);
  return null;
};
