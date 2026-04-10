"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ExperienceItem, SiteContent } from "@/lib/types";

function useIntersection(threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, isVisible } = useIntersection(0.2);
  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={`transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <article className="surface-card min-h-[340px] p-6 md:min-h-[380px]">
      <p className="text-xs uppercase tracking-[0.2em] text-[#979E9B]">{item.tag}</p>
      <h3 className="mt-3 font-heading text-3xl text-[#F4F4F4]">{item.title}</h3>
      <p className="mt-2 text-sm italic text-[#cfd5d2]">{item.subtitle}</p>
      <p className="mt-5 text-sm leading-relaxed text-[#e4e8e6]">{item.description}</p>
      <p className="mt-6 text-xs uppercase tracking-[0.12em] text-[#d9dfdd]">{item.detail}</p>
    </article>
  );
}

export function HomeStory({ content }: { content: SiteContent }) {
  return (
    <div className="space-y-20 pb-20 md:space-y-24">
      <section id="hero" className="container-page pt-14 md:pt-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7C7C7C]">Art Sous le Manguier</p>
          <h1 className="mt-4 max-w-5xl font-heading text-4xl leading-tight text-[#4F5753] md:text-7xl">
            {content.hero.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5e6561] md:text-xl">{content.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#experiences">{content.hero.ctaPrimary}</Button>
            <Button href="#cta" variant="secondary">{content.hero.ctaSecondary}</Button>
          </div>
        </Reveal>
      </section>

      <section id="about" className="container-page grid gap-5 md:grid-cols-3">
        {content.hero.narrative.map((paragraph, i) => (
          <Reveal key={paragraph} delay={100 * (i + 1)}>
            <article className="surface-card-light p-5">
              <p className="text-sm leading-relaxed text-[#5f6662]">{paragraph}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section id="vision" className="container-page">
        <Reveal>
          <div className="rounded-3xl border border-[#d4d8d6] bg-white p-7 md:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7C7C7C]">Vision</p>
            <h2 className="mt-4 font-heading text-3xl text-[#4F5753] md:text-5xl">Créer du commun dans un monde fragmenté</h2>
            <p className="mt-5 max-w-3xl text-[#646b67]">
              Inspiré du code de référence, ce parcours privilégie une narration progressive: repères, contexte, expériences, impact puis action.
            </p>
          </div>
        </Reveal>
      </section>

      <section id="experiences" className="bg-[#4F5753] py-14 md:py-16">
        <div className="container-page">
          <Reveal>
            <h2 className="font-heading text-4xl text-[#F4F4F4] md:text-5xl">Nos expériences</h2>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#c6cfcc]">Des formats immersifs et participatifs</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {content.experiences.map((item, i) => (
              <Reveal key={item.title} delay={100 * (i + 1)}>
                <ExperienceCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className="container-page">
        <Reveal>
          <h2 className="font-heading text-4xl text-[#4F5753] md:text-5xl">Impact & engagement</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {content.sections.slice(5, 7).map((section, i) => (
            <Reveal key={section.id} delay={120 * (i + 1)}>
              <article className="surface-card-light p-6">
                <h3 className="font-heading text-2xl text-[#4F5753]">{section.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#626966]">{section.paragraphs[0]}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="cta" className="container-page">
        <Reveal>
          <div className="rounded-3xl bg-[#4F5753] p-8 text-center md:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#cfd7d4]">Rejoignez le mouvement</p>
            <h2 className="mt-3 font-heading text-3xl text-[#F4F4F4] md:text-5xl">Construisons ensemble des expériences qui ont du sens.</h2>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button>Collaborer</Button>
              <Button variant="secondary">Participer</Button>
              <Button variant="ghost" className="border border-white/20">Soutenir</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
