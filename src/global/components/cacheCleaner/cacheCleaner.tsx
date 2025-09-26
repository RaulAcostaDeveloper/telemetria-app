"use client";
import { useEffect } from "react";
import { cleanExpiredCache, ONE_HOUR } from "@/global/cache/cache";

// Componente que ejecuta la función para limpiar caché expirado
// Se ejecuta al iniciar la aplicación
export const CacheCleaner = () => {
  useEffect(() => {
    // Revisa cada hora
    const intervalId = setInterval(() => {
      cleanExpiredCache();
    }, ONE_HOUR);

    return () => {
      clearTimeout(intervalId);
    };
  }, []);

  return null;
};
