import { RestrictedWrapper } from "@/modules/auth/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RestrictedWrapper>{children}</RestrictedWrapper>;
}
