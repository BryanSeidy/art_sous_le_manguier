import { parseWebContent } from "@/lib/content-parser";
import { Button } from "@/components/ui/button";

export default function ArtistesPage() {
  const section = parseWebContent().sections[1];

  return (
    <main className="section-spacing">
      <div className="container-page space-y-8">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl md:text-5xl">Artistes</h1>
          <p className="max-w-3xl text-[var(--text-muted)]">Une lecture éditoriale structurée pour comprendre les parcours et la transmission.</p>
          <Button href="/episodes">Découvrir l'artiste en épisode</Button>
        </header>
        <article className="surface-card p-6 md:p-8">
          <h2 className="font-heading text-3xl text-mango">{section.title}</h2>
          <div className="mt-4 space-y-4 text-[var(--text-muted)]">
            {section.paragraphs.slice(0, 5).map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
