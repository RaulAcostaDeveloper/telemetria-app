import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const fullUrl = "/management/authentication/login";

export async function postLogin({ encrypted }: { encrypted: string }) {
  const cacheKey = `login`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ credentials: encrypted }),
  };

  return fetchMiddleware({
    cacheKey,
    options,
    fullUrl,
    forceRefresh: true,
    logoutState: () => {},
  });
}
