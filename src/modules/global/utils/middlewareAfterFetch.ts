import { getCached } from "@/globalConfig/cache/cache";

interface fetchProps {
  fullUrl: string;
  options?: RequestInit;
  logoutState: () => void;
}

const fetchResponse = async ({ fullUrl, options, logoutState }: fetchProps) => {
  try {
    const response = await fetch(fullUrl, options);

    //Hacer tratamiento a response, para cuando venga una estructura de code en vez de statusCode

    if (401 === response.status) {
      logoutState();
      console.log("(0) response status: ", response.status);
      return {
        statusCode: response.status,
        message: "Unauthorized",
        value: null,
      };
    }

    if (response.ok) {
      const result = await response.json();

      if (response.status === 200) {
        console.log("(1) response status: ", response.status);
        return {
          statusCode: response.status,
          message: "OK",
          value: result.value,
        };
      } else {
        console.log("(2) response status: ", response.status);
        return {
          statusCode: response.status,
          message: response.statusText,
          value: null,
        };
      }
    } else {
      console.log("(3) response status: ", response.status);
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
    console.log("--check data: ", data);
    return getCached(cacheKey, data, forceRefresh);
  } else {
    const data = await fetchResponse({ fullUrl, logoutState });
    console.log("++check data: ", data);
    return getCached(cacheKey, data, forceRefresh);
  }
}
