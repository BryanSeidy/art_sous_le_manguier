import { parseWebContent } from "@/lib/content-parser";
import { Button } from "@/components/ui/button";

export default function EpisodesPage() {
  const sections = parseWebContent().sections;

  return (
    <main className="section-spacing">
      <div className="container-page space-y-8">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl md:text-5xl">Épisodes</h1>
          <p className="max-w-3xl text-[var(--text-muted)]">Un écran lisible, centré sur le contenu, avec un player clair et des épisodes hiérarchisés.</p>
          <Button>Regarder l'épisode du moment</Button>
        </header>

        <section className="surface-card p-6 md:p-8" aria-label="Lecteur principal">
          <div className="aspect-video rounded-2xl border border-cream/20 bg-black/50" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">Player principal (vidéo/audio) — prêt pour intégration source média.</p>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          {sections.slice(3, 6).map((s) => (
            <article key={s.title} className="surface-card p-5">
              <p className="text-xs uppercase tracking-wide text-mango">Épisode</p>
              <h2 className="mt-2 font-heading text-xl">{s.title}</h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{s.paragraphs[0]}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
