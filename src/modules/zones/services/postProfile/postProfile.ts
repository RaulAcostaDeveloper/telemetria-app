import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const url = "/analytics/zone/profiles";

export interface PostProfile {
  accountId: string;
  chargeState: number;
  color: string;
  description: string;
  dischargeState: number;
  idleState: number;
  logoutState: () => void;
  nick: string;
  zoneCategoryId: string;
  zoneId: string;
  zoneProviderId: string;
}

// Función fetch con enlace a caché
export async function postZoneProfile({
  accountId,
  chargeState,
  color,
  description,
  dischargeState,
  idleState,
  logoutState,
  nick,
  zoneCategoryId,
  zoneId,
  zoneProviderId,
}: PostProfile) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      accountId,
      chargeState,
      color,
      description,
      dischargeState,
      idleState,
      nick,
      zoneCategoryId,
      zoneId,
      zoneProviderId,
    }),
  };
  // Construcción del key único para caché
  const cacheKey = `postProfile`;

  // Retorna DATA del servidor o DATA de caché
  return fetchMiddleware({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
