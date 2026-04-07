import { parseWebContent } from "@/lib/content-parser";

export default function ArtistesPage() {
  const sec = parseWebContent().sections[1];
  return (
    <main className="min-h-screen px-5 py-16 md:px-10">
      <section className="mx-auto max-w-5xl space-y-6">
        <h1 className="font-heading text-5xl text-mango">Artistes</h1>
        <p className="text-lg text-cream/85">Scrollytelling éditorial avec mise en avant des œuvres, voix, parcours et transmission.</p>
        <article className="organic-card p-8">
          <h2 className="font-heading text-3xl">{sec?.title}</h2>
          <div className="mt-5 space-y-3 text-cream/80">{sec?.body.slice(0, 7).map((b) => <p key={b}>{b}</p>)}</div>
        </article>
      </section>
    </main>
  );
}
