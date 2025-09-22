import { getCached } from "@/globalConfig/cache/cache";

interface Props {
  cacheKey: string;
  fullUrl: string;
  options: RequestInit;
  logoutState: () => void;
  forceRefresh?: boolean;
}

const fetchResponse = async (
  fullUrl: string,
  options: RequestInit,
  logoutState: () => void
) => {
  try {
    const response = await fetch(fullUrl, options);
    let result;
    if (200 === response.status) {
      result = await response.json();
    } else if (401 === response.status) {
      logoutState();
    } else {
      result = {
        code: response.status,
        message: response.statusText,
        value: null,
      };
    }
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
  return getCached(
    cacheKey,
    await fetchResponse(fullUrl, options, logoutState),
    forceRefresh
  );
}
