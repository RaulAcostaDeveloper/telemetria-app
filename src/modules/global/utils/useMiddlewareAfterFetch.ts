import { getCached } from "@/globalConfig/cache/cache";

interface Props {
  cacheKey: string;
  fullUrl: string;
  options: RequestInit;
  logoutState: () => void;
  forceRefresh?: boolean;
}

const fetchResponse = async (fullUrl: string, options: RequestInit) => {
  try {
    const response = await fetch(fullUrl, options);
    const result =
      response.status === 200
        ? await response.json()
        : {
            code: response.status,
            message: response.statusText,
            value: null,
          };
    return result;
  } catch {
    throw new Error("Error al obtener servicio.");
  }
};

export async function UseMiddlewareAfterFetch({
  cacheKey,
  fullUrl,
  options,
  logoutState,
  forceRefresh = false,
}: Props) {
  const result = await fetchResponse(fullUrl, options);
  if (result) {
    //verifica qué generó de código y en caso de 401, saca al usuario
    if (401 === result.code) {
      logoutState();
    }
  }

  return getCached(
    cacheKey,
    await fetchResponse(fullUrl, options),
    forceRefresh
  );
}
