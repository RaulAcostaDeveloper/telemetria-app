import type { Metadata } from "next";

import "./globals.css";
import {
  neuropolFont,
  nunitoFont,
  nunitoItalicFont,
} from "@/global/fonts/fonts";
import { CacheCleaner, MainWrapper } from "@/global/components";
import { ReduxProvider } from "@/global/redux/provider/reduxProvider/ReduxProvider";
import { Matrix } from "@/global/components/matrix/matrix";

export const metadata: Metadata = {
  title: "Core - Transtelemetrix",
  description:
    "Advanced web app for real-time monitoring and historial analysis of vehicle fleets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoItalicFont.variable} ${nunitoFont.variable} ${neuropolFont.variable}`}
      >
        <CacheCleaner />
        <Matrix />
        <ReduxProvider>
          <MainWrapper>{children}</MainWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
