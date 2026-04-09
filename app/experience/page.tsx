import { MangoScene } from "@/components/immersive/mango-scene";
import { LiquidScroll } from "@/components/immersive/liquid-scroll";
import { TreeNav } from "@/components/navigation/tree-nav";
import { Button } from "@/components/ui/button";

export default function ExperiencePage() {
  return (
    <main className="section-spacing">
      <LiquidScroll />
      <div className="container-page grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <section className="surface-card p-6 md:p-8">
          <h1 className="font-heading text-4xl md:text-5xl">Expérience immersive guidée</h1>
          <p className="mt-4 text-[var(--text-muted)]">Explorez le manguier avec une navigation visible: branches pour les rubriques, fruits pour les épisodes, feuilles pour les contenus courts.</p>
          <div className="mt-6">
            <Button href="/accueil">Retour aux repères</Button>
          </div>
          <div className="mt-8">
            <TreeNav />
          </div>
        </section>
        <div className="space-y-3">
          <div className="md:hidden surface-card p-6"><p className="text-sm text-[var(--text-muted)]">Visualisation immersive allégée sur mobile pour privilégier la performance.</p></div>
          <div className="hidden md:block"><MangoScene /></div>
        </div>
      </div>
    </main>
  );
}
