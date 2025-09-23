import { getCached } from "@/globalConfig/cache/cache";

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
      return {
        statusCode: response.status,
        message: response.statusText,
        value: null,
      };
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

export async function middlewareAfterFetch({
  cacheKey,
  fullUrl,
  options,
  forceRefresh,
  logoutState,
}: MiddlewareProps) {
  if (options) {
    const data = await fetchResponse({ fullUrl, options, logoutState });

    return getCached(cacheKey, data, forceRefresh);
  } else {
    const data = await fetchResponse({ fullUrl, logoutState });
    return getCached(cacheKey, data, forceRefresh);
  }
}
