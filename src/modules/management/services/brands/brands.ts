import { middlewareAfterFetch } from "@/global/utils/middlewareAfterFetch";

const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/management";

// Función fetch con enlace a caché
export async function getBrands() {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/brands`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const cacheKey = process.env.NEXT_PUBLIC_API_VERSION + `managementBrands`;

  // Retorna DATA del servidor o DATA de caché
  return middlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    forceRefresh: true,
    logoutState: () => {},
  });
}
