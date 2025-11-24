import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const url = "/analytics/zone/profiles";

export interface PutProfile {
  chargeState: number;
  color: string;
  description: string;
  dischargeState: number;
  idProfile: string;
  idleState: number;
  logoutState: () => void;
  nick: string;
  zoneCategoryId: string;
  zoneId: string;
  zoneProviderId: string;
}

// Función fetch con enlace a caché
export async function putZoneProfile({
  chargeState,
  color,
  description,
  dischargeState,
  idProfile,
  idleState,
  logoutState,
  nick,
  zoneCategoryId,
  zoneId,
  zoneProviderId,
}: PutProfile) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${idProfile}`;
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
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
  const cacheKey = `putProfile`;

  // Retorna DATA del servidor o DATA de caché
  return fetchMiddleware({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
