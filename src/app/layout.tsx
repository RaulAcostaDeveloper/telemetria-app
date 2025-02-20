import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/modules/global/components";
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
