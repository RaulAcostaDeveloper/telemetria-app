import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const fullUrl = "/management/authentication/logout";

export async function logoutSession() {
  const cacheKey = `logout`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  return fetchMiddleware({
    cacheKey,
    options,
    fullUrl,
    forceRefresh: true,
    logoutState: () => {},
  });
}
