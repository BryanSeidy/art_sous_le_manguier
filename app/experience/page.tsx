import { TreeNav } from "@/components/navigation/tree-nav";
import { SectionBlock } from "@/components/ui/section-block";
import { parseWebContent } from "@/lib/content-parser";
import { LiquidScroll } from "@/components/immersive/liquid-scroll";

export default function ExperiencePage() {
  const content = parseWebContent();
  return (
    <main className="grain min-h-screen px-5 py-16 md:px-10">
      <LiquidScroll />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header>
          <h1 className="font-heading text-5xl text-mango">Le manguier vivant</h1>
          <p className="mt-3 max-w-2xl text-cream/80">Explorez par branches, fruits et feuilles. Chaque interaction dévoile un nouveau récit.</p>
        </header>
        <TreeNav />
        <div className="grid gap-6 md:grid-cols-2">
          {content.sections.slice(1, 5).map((section) => (
            <SectionBlock key={section.id} title={section.title} body={section.body} />
          ))}
        </div>
      </div>
    </main>
  );
}
