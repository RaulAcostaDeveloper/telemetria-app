import { middlewareAfterFetch } from "@/global/utils/middlewareAfterFetch";

const fullUrl =
  process.env.NEXT_PUBLIC_URL_SERVICE + "/management/authentication/logout";

export async function logoutSession() {
  const cacheKey = process.env.NEXT_PUBLIC_API_VERSION + `logout`;

  return middlewareAfterFetch({
    cacheKey,
    fullUrl,
    forceRefresh: true,
    logoutState: () => {},
  });
}
