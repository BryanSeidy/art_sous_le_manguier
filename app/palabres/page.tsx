import { Button } from "@/components/ui/button";

const samples = [
  "La parole est un geste artistique.",
  "Sous le manguier, chaque voix devient trace.",
  "Les récits circulent comme des racines vivantes.",
];

export default function PalabresPage() {
  return (
    <main className="section-spacing">
      <div className="container-page space-y-8">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl md:text-5xl">Palabres</h1>
          <p className="max-w-3xl text-[var(--text-muted)]">Espace de contributions communautaires avec feedback visuel immédiat.</p>
          <Button>Publier une parole</Button>
        </header>

        <section className="surface-card p-5 md:p-6">
          <label htmlFor="message" className="mb-2 block text-sm text-cream">Votre contribution</label>
          <textarea
            id="message"
            className="focus-ring min-h-32 w-full rounded-xl border border-cream/30 bg-[#0f1912] p-3 text-sm text-cream placeholder:text-cream/40"
            placeholder="Écrivez une parole à partager..."
          />
          <p className="mt-2 text-xs text-[var(--text-muted)]">Feedback: champ lisible, focus visible, bouton d'action clair.</p>
        </section>

        <div className="space-y-3">
          {samples.map((quote) => (
            <article key={quote} className="surface-card p-5">
              <p className="text-[var(--text-muted)]">“{quote}”</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
