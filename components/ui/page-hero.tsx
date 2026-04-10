import { Button } from "@/components/ui/button";

type PageHeroProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export function PageHero({ title, subtitle, ctaLabel, ctaHref }: PageHeroProps) {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <div className="surface-card grain-overlay p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-mango">Art Sous le Manguier</p>
          <h1 className="text-balance mt-3 font-heading text-4xl leading-tight md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--text-muted)] md:text-lg">{subtitle}</p>
          <div className="mt-7">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
