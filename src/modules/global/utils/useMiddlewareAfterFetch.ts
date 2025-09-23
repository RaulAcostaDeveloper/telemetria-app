import { getCached } from "@/globalConfig/cache/cache";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  cacheKey: string;
  fullUrl: string;
  options: RequestInit;
  forceRefresh?: boolean;
}

const LogoutOn401 = () => {
  const { logoutState } = useAuth();
  logoutState();
  return null;
};

const fetchResponse = async (fullUrl: string, options: RequestInit) => {
  try {
    const response = await fetch(fullUrl, options);
    let result;
    if (200 === response.status) {
      result = await response.json();
    } else if (401 === response.status) {
      LogoutOn401();
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
  forceRefresh = false,
}: Props) {
  return getCached(
    cacheKey,
    await fetchResponse(fullUrl, options),
    forceRefresh
  );
}
