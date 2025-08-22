import { getCached } from "@/globalConfig/cache/cache";

const url = "https://stage.transtelemetrix.com/api/management/TestAuth";

export async function testSession(forceRefresh = true) {
  const key = `testsession`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  return getCached(
    key,
    async () => {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("Error al validar cookie");
      }
      return res.json();
    },
    forceRefresh
  );
}
