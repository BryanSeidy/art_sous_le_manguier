import { Button } from "@/components/ui/button";

export default function GaleriePage() {
  return (
    <main className="section-spacing">
      <div className="container-page space-y-8">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl md:text-5xl">Galerie</h1>
          <p className="max-w-3xl text-[var(--text-muted)]">Une exploration visuelle sobre: effets légers, lisibilité élevée et parcours contrôlé.</p>
          <Button href="/artistes">Découvrir les œuvres</Button>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <article key={item} className="surface-card p-3">
              <div className="aspect-[4/5] rounded-xl border border-cream/20 bg-gradient-to-br from-indigo/50 to-earth/30" />
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
