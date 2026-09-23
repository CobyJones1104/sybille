import { Almarai, Instrument_Serif } from "next/font/google";

// Lokal über next/font gebündelt (kein Google-Fonts-CDN-Request), siehe CLAUDE.md.
export const almarai = Almarai({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

// Nur kursiv – wird als Akzent in Überschriften verwendet.
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-accent",
  display: "swap",
});
