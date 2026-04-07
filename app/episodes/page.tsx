import { parseWebContent } from "@/lib/content-parser";

export default function EpisodesPage() {
  const fruits = parseWebContent().fruits;
  return (
    <main className="min-h-screen px-5 py-16 md:px-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="font-heading text-5xl text-mango">Épisodes / Fruits</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {fruits.map((item) => (
            <article key={item.title} className="organic-card p-6">
              <p className="text-3xl">🥭</p>
              <h2 className="mt-4 font-heading text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm text-cream/80">{item.detail}</p>
              <button className="mt-5 rounded-full border border-mango/70 px-4 py-2 text-sm">Lire / écouter</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
