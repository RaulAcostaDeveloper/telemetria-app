"use client";

import { EnvDto, getEnvironmentFromServer } from "./getEnviromentFromServer";

let envPromise: Promise<EnvDto> | null = null;

export async function getEnvClient(): Promise<EnvDto> {
  if (!envPromise) {
    envPromise = getEnvironmentFromServer();
  }
  return envPromise;
}
