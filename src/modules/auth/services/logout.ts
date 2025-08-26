import { getCached } from "@/globalConfig/cache/cache";

interface UserData {
  userId: string;
  idCliente: string;
  username: string;
  accountName: string;
  expre_at: string;
}

interface LoginData {
  code: number;
  message: string;
  value: UserData | null;
}

const url =
  "https://stage.transtelemetrix.com/api/management/authentication/logout";

export async function logoutSession(
  forceRefresh = true //hace que no busque en caché
) {
  const key = `logout`;

  return getCached(
    key,
    async () => {
      const options: RequestInit = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      try {
        const response = await fetch(url, options);
        const result: LoginData =
          response.status == 200
            ? await response.json()
            : ({
                code: response.status,
                message: response.statusText,
                value: null,
              } as LoginData);
        return result;
      } catch {
        throw new Error("Error al cerrar sesión");
      }
    },
    forceRefresh
  );
}
