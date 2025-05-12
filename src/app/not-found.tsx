"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Comportamiento: Si hay historial de navegación, regresar al usuario
    // Si no hay historial, ir a la ruta raíz "/"
    if (pathname !== "/") {
      const hasHistory = document.referrer !== "";

      if (hasHistory) {
        router.back();
      } else {
        router.replace("/");
      }
    }
  }, [pathname, router]);

  return null;
}
