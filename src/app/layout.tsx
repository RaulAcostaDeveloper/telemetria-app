import type { Metadata } from "next";
import "./globals.css";
import {
  CacheCleaner,
  MainWrapper,
  ReduxProvider,
} from "@/modules/global/components";
import {
  neuropolFont,
  nunitoFont,
  nunitoItalicFont,
} from "@/globalConfig/fonts/fonts";

export const metadata: Metadata = {
  title: "Blackfyre - Transtelemetrix",
  description: "Innovaria app for telemetrix",
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
        <ReduxProvider>
          <MainWrapper>{children}</MainWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
