import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/navigation/site-header";
import { AmbientAudio } from "@/components/audio/ambient-audio";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Art Sous le Manguier",
  description: "Plateforme immersive claire et élégante pour explorer les récits artistiques contemporains.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${space.variable} font-body antialiased`}>
        <SiteHeader />
        <AmbientAudio />
        {children}
      </body>
    </html>
  );
}
