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

  // Para deshabilitar strict mode de modo desarrollo en pruebas de efectos con refs, mapas, gráficos.
  // Regresar a que quede comentado siempre. Uso manual.
  // reactStrictMode: false,
};

export default nextConfig;
