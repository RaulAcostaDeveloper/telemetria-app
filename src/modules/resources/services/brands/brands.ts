import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const url = "/management";

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
  const cacheKey = `managementBrands`;

  // Retorna DATA del servidor o DATA de caché
  return fetchMiddleware({
    cacheKey,
    fullUrl,
    options,
    forceRefresh: true,
    logoutState: () => {},
  });
}
