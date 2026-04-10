"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pageLinks = [
  { href: "/accueil", label: "Accueil" },
  { href: "/experience", label: "Expérience" },
  { href: "/artistes", label: "Artistes" },
  { href: "/episodes", label: "Épisodes" },
  { href: "/galerie", label: "Galerie" },
  { href: "/palabres", label: "Palabres" },
];

const homeAnchors = [
  { href: "#about", label: "Qui sommes-nous" },
  { href: "#vision", label: "Vision" },
  { href: "#experiences", label: "Expériences" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const navLinks = pathname === "/" ? homeAnchors : pageLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-[#c5cbc8] bg-[#F4F4F4]/90 backdrop-blur-xl">
      <div className="container-page flex min-h-16 items-center justify-between gap-3 py-2">
        <Link href="/" className="focus-ring font-heading text-lg text-[#4F5753]">
          Art Sous le Manguier
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "focus-ring rounded-full px-3 py-2 text-sm text-[#59605d] transition hover:bg-white hover:text-[#4F5753]",
                pathname !== "/" && "",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button href={pathname === "/" ? "#cta" : "/"} className="px-4 text-xs md:text-sm">
          {pathname === "/" ? "Collaborer" : "Retour landing"}
        </Button>
      </div>
    </header>
  );
}
