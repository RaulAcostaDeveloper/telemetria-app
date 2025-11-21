import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const url = "/analytics/zone/profile";

export interface PostProfile {
  nick: string;
  zoneProviderId: string;
  chargeState: number;
  dischargeState: number;
  idleState: number;
  color: string;
  description: string;
  accountId: string;
  zoneId: string;
  zoneCategoryId: string;
  logoutState: () => void;
}

// Función fetch con enlace a caché
export async function getZonesSummary({
  nick,
  zoneProviderId,
  chargeState,
  dischargeState,
  idleState,
  color,
  description,
  accountId,
  zoneId,
  zoneCategoryId,
  logoutState,
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
      nick,
      zoneProviderId,
      chargeState,
      dischargeState,
      idleState,
      color,
      description,
      accountId,
      zoneId,
      zoneCategoryId,
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
