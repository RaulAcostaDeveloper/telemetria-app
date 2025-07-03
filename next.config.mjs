/** @type {import('next').NextConfig} */
const disableLint = process.env.DISABLE_ESLINT === "true";
const nextConfig = {

    eslint: {
    ignoreDuringBuilds: disableLint,
  },
  // opcional: para ignorar errores de TypeScript también
  typescript: {
    ignoreBuildErrors: disableLint,
  },
};

export default nextConfig;