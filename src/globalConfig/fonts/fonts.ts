import localFont from "next/font/local";

// Aquí declaramos las variables de fuentes de letra
// var(--font-nunito)
// Seguir las instrucciones de description.txt

export const nunitoItalicFont = localFont({
  src: [
    {
      path: "./fontfiles/Nunito/Nunito-Italic-VariableFont_wght.ttf",
      weight: "100..900",
      style: "italic",
    },
  ],
  variable: "--font-nunito-italic",
});

export const nunitoFont = localFont({
  src: [
    {
      path: "./fontfiles/Nunito/Nunito-VariableFont_wght.ttf",
      weight: "100..900",
    },
  ],
  variable: "--font-nunito",
});

export const neuropolFont = localFont({
  src: [
    {
      path: "/fontfiles/neuropol_x/neuropol.otf",
      weight: "100..900",
    },
  ],
  variable: "--font-neuropol",
});
