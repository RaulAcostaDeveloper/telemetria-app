import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const fullUrl =
  process.env.NEXT_PUBLIC_URL_SERVICE + "/management/authentication/logout";

export async function logoutSession() {
  const cacheKey = process.env.NEXT_PUBLIC_API_VERSION + `logout`;

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
