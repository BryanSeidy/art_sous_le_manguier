import { parseWebContent } from "@/lib/content-parser";
import { PageHero } from "@/components/ui/page-hero";

export default function LandingPage() {
  const { hero } = parseWebContent();

  return (
    <main>
      <PageHero title={hero.title} subtitle={hero.subtitle} ctaLabel={hero.ctaPrimary} ctaHref="/experience" />

      <section className="section-spacing">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {hero.narrative.map((paragraph) => (
            <article key={paragraph} className="surface-card p-5">
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{paragraph}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
