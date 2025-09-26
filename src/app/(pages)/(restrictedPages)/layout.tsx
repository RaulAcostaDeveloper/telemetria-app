import { RestrictedWrapper } from "@/modules/auth/components";

// Reestricción de las rutas según el estado de la autenticación en el cliente
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RestrictedWrapper>{children}</RestrictedWrapper>;
}
