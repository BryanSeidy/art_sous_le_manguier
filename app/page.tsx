import Link from "next/link";
import { parseWebContent } from "@/lib/content-parser";
import { MangoScene } from "@/components/immersive/mango-scene";

export default function HomePage() {
  const content = parseWebContent();

  return (
    <main className="grain min-h-screen px-5 pb-14 pt-20 md:px-10">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-mango">Expérience immersive</p>
          <h1 className="font-heading text-4xl leading-tight md:text-6xl">{content.hero.body[1] ?? content.hero.title}</h1>
          <p className="mt-6 max-w-xl text-cream/80">{content.hero.body[3]}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/experience" className="mango-button">Entrer sous le manguier</Link>
            <Link href="/episodes" className="rounded-full border border-cream/30 px-5 py-3">Regarder les épisodes</Link>
          </div>
        </div>
        <MangoScene />
      </section>
    </main>
  );
}
