"use client";

import Link from "next/link";

const nodes = [
  { icon: "🌿", href: "/artistes", label: "Artistes" },
  { icon: "🥭", href: "/episodes", label: "Épisodes" },
  { icon: "🎨", href: "/galerie", label: "Galerie" },
  { icon: "🗣️", href: "/palabres", label: "Palabres" },
];

export function TreeNav() {
  return (
    <div className="organic-card grid gap-3 p-6 md:grid-cols-2">
      {nodes.map((node) => (
        <Link key={node.href} href={node.href} className="rounded-3xl border border-cream/20 bg-black/20 p-4 transition hover:-translate-y-1 hover:border-mango/80">
          <p className="text-2xl">{node.icon}</p>
          <p className="mt-1 font-heading text-lg">{node.label}</p>
          <p className="text-sm text-cream/70">Explorer cette branche du manguier</p>
        </Link>
      ))}
    </div>
  );
}
