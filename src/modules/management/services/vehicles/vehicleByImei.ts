import { getCached } from "@/globalConfig/cache/cache";
const url = "https://stage.transtelemetrix.com/api/management/device/";

// Función fetch con enlace a caché
export async function getVehicleByImei(
  imei: string,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}${imei}/vehicle`;

  // Construcción del key único para caché
  const key = `managementVehicleByImei-${imei}`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(fullUrl);
      if (!res.ok)
        throw new Error("Error al obtener detalle del vehículo por imei");
      return res.json();
    },
    forceRefresh // poner un forceRefresh en caso de necesitarlo
  );
}
