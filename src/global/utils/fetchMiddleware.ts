import { getCached, putCache } from "@/global/cache/cache";
import { getEnvClient } from "./getEnviromentFromClient";

interface fetchProps {
  fullUrl: string;
  options?: RequestInit;
  logoutState: () => void;
}

const fetchResponse = async ({ fullUrl, options, logoutState }: fetchProps) => {
  const { URL_SERVICE } = await getEnvClient();

  try {
    const response = await fetch(URL_SERVICE + fullUrl, options);

    if (401 === response.status) {
      logoutState();
      return {
        statusCode: response.status,
        message: "Unauthorized",
        value: null,
      };
    }

    if (429 === response.status) {
      return {
        statusCode: response.status,
        message: "Too many request",
        value: null,
      };
    }

    if (response.ok) {
      if (response.status !== 200) {
        return {
          statusCode: response.status,
          message: "No Content",
          value: null,
        };
      }

      const result = await response.json();

      return {
        statusCode: response.status,
        message: result.message,
        value: result.value,
      };
    } else {
      throw new Error("No se está manejando el caso de error en servicio.");
    }
  } catch {
    throw new Error("Error al obtener servicio.");
  }
};

interface MiddlewareProps {
  cacheKey: string;
  fullUrl: string;
  options?: RequestInit;
  forceRefresh?: boolean;
  logoutState: () => void;
}

export async function fetchMiddleware({
  cacheKey,
  fullUrl,
  options,
  // forceRefresh,
  logoutState,
}: MiddlewareProps) {
  const { API_VERSION } = await getEnvClient();

  const cacheData = await getCached(API_VERSION + cacheKey, false);
  if (cacheData) {
    // Si hay en caché, retorna lo de caché
    return cacheData;
  } else {
    // Si no, hace el fetch (con su propia lógica)
    const fetchData = await fetchResponse({ fullUrl, options, logoutState });
    putCache(cacheKey, fetchData, false);
    return fetchData;
  }
}
