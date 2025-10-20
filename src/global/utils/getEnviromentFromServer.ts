"use server";

export type EnvDto = {
  API_VERSION: string | undefined;
  URL_SERVICE: string | undefined;
  AES_TOKEN: string | undefined;
  GOOGLE_MAPS_API_KEY: string | undefined;
};

export async function getEnvironmentFromServer(): Promise<EnvDto> {
  return {
    API_VERSION: process.env.API_VERSION,
    URL_SERVICE: process.env.URL_SERVICE,
    AES_TOKEN: process.env.AES_TOKEN,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  };
}
