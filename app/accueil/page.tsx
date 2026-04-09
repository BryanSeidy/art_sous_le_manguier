import { parseWebContent } from "@/lib/content-parser";
import { Button } from "@/components/ui/button";

export default function AccueilPage() {
  const content = parseWebContent();
  return (
    <main className="section-spacing">
      <div className="container-page space-y-8">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl md:text-5xl">Accueil — repères clairs</h1>
          <p className="max-w-3xl text-[var(--text-muted)]">Retrouvez les axes du projet: mission, démarche, impact, communauté et actualités.</p>
          <Button href="/episodes">Regarder l'épisode</Button>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {content.sections.slice(1).map((section) => (
            <article key={section.title} className="surface-card p-6">
              <h2 className="font-heading text-2xl text-mango">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{section.paragraphs[0]}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
