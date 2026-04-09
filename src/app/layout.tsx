import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "La Villa Bouyssou | Villa contemporaine à Sarlat",
    template: "%s | La Villa Bouyssou",
  },
  description:
    "Louez une villa contemporaine avec piscine chauffée à 500m du centre historique de Sarlat-la-Canéda, Périgord Noir. 3 chambres avec salle de bain privée.",
  keywords: [
    "villa sarlat",
    "location vacances périgord",
    "piscine chauffée",
    "sarlat-la-canéda",
    "villa contemporaine",
    "périgord noir",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_GB",
    siteName: "La Villa Bouyssou",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
