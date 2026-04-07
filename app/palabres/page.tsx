const samples = [
  "La parole est un geste artistique.",
  "Sous le manguier, chaque voix devient trace.",
  "Les récits circulent comme des racines vivantes.",
];

export default function PalabresPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:px-10">
      <section className="mx-auto max-w-5xl">
        <h1 className="font-heading text-5xl text-mango">Palabres</h1>
        <p className="mt-3 text-cream/80">Espace communautaire poétique intégré dans le décor.</p>
        <div className="mt-8 space-y-5">
          {samples.map((quote) => (
            <article key={quote} className="organic-card p-6">
              <p className="text-lg">“{quote}”</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
