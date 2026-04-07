import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { AmbientAudio } from "@/components/audio/ambient-audio";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Art Sous le Manguier",
  description: "Expérience narrative immersive autour de l'art contemporain africain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${space.variable} font-body text-cream`}>
        <CustomCursor />
        <AmbientAudio />
        {children}
      </body>
    </html>
  );
}
