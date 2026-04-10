"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nodes = [
  { icon: "🌿", href: "/artistes", label: "Feuilles · Artistes", note: "Portraits et parcours" },
  { icon: "🥭", href: "/episodes", label: "Fruits · Épisodes", note: "Capsules principales" },
  { icon: "🎨", href: "/galerie", label: "Branches · Galerie", note: "Exploration visuelle" },
  { icon: "🗣️", href: "/palabres", label: "Racines · Palabres", note: "Communauté et échanges" },
];

export function TreeNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigation de l'arbre" className="grid gap-3 sm:grid-cols-2">
      {nodes.map((node) => (
        <Link
          key={node.href}
          href={node.href}
          className={cn(
            "focus-ring rounded-2xl border border-cream/20 bg-black/20 p-4 transition hover:border-mango/80 hover:bg-black/30 active:translate-y-[1px]",
            pathname === node.href && "border-mango/90 bg-mango/10",
          )}
        >
          <p className="text-xl">{node.icon}</p>
          <p className="mt-1 font-heading text-lg">{node.label}</p>
          <p className="text-sm text-[var(--text-muted)]">{node.note}</p>
        </Link>
      ))}
    </nav>
  );
}
