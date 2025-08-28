import { getCached } from "@/globalConfig/cache/cache";
const url = "https://stage.transtelemetrix.com/api/management/";

// Función fetch con enlace a caché
export async function getGroups(
  accountId: string,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}${accountId}/vehicles/groups`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const key = `managementGroups-${accountId}`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
    async () => {
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
        throw new Error("Error al obtener grupos");
      }
    },
    forceRefresh // poner un forceRefresh en caso de necesitarlo
  );
}
