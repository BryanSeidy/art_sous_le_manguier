"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/accueil", label: "Accueil" },
  { href: "/experience", label: "Expérience" },
  { href: "/artistes", label: "Artistes" },
  { href: "/episodes", label: "Épisodes" },
  { href: "/galerie", label: "Galerie" },
  { href: "/palabres", label: "Palabres" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-[#0f1912]/90 backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-3 py-2">
        <Link href="/" className="focus-ring font-heading text-lg text-cream">
          Art Sous le Manguier
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "focus-ring rounded-full px-3 py-2 text-sm text-cream/80 transition hover:bg-white/10 hover:text-cream",
                pathname === link.href && "bg-white/10 text-cream",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button href="/experience" variant="primary" className="px-4 text-xs md:text-sm">
          Entrer dans l'expérience
        </Button>
      </div>

      <div className="container-page -mt-1 pb-2 lg:hidden">
        <nav aria-label="Navigation mobile" className="flex gap-2 overflow-x-auto pb-1">
          {links.map((link) => (
            <Link
              key={`mobile-${link.href}`}
              href={link.href}
              className={cn(
                "focus-ring shrink-0 rounded-full border border-cream/20 px-3 py-1.5 text-xs text-cream/85",
                pathname === link.href && "border-mango/80 bg-mango/10 text-cream",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
