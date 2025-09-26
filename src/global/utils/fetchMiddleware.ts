import { getCached, putCache } from "@/global/cache/cache";

interface fetchProps {
  fullUrl: string;
  options?: RequestInit;
  logoutState: () => void;
}

const fetchResponse = async ({ fullUrl, options, logoutState }: fetchProps) => {
  try {
    const response = await fetch(fullUrl, options);

    if (401 === response.status) {
      logoutState();
      return {
        statusCode: response.status,
        message: "Unauthorized",
        value: null,
      };
    }

    if (response.ok) {
      const result = await response.json();

      if (response.status === 200) {
        return {
          statusCode: response.status,
          message: "OK",
          value: result.value,
        };
      } else {
        return {
          statusCode: response.status,
          message: response.statusText,
          value: null,
        };
      }
    } else {
      throw new Error("Error al obtener servicio.");
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
  forceRefresh,
  logoutState,
}: MiddlewareProps) {
  const cacheData = await getCached(cacheKey, forceRefresh);
  if (cacheData) {
    // Si hay en caché, retorna lo de caché
    return cacheData;
  } else {
    // Si no, hace el fetch (con su propia lógica)
    const fetchData = await fetchResponse({ fullUrl, options, logoutState });
    putCache(cacheKey, fetchData, forceRefresh);
    return fetchData;
  }
}
