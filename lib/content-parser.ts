import fs from "node:fs";
import path from "node:path";
import { ContentBlock, SiteContent } from "./types";

const sourcePath = path.join(process.cwd(), "Documentation", "web_content-ASLM.md");

function clean(line: string) {
  return line.trim().replace(/\*\*/g, "");
}

function isLabelLine(line: string) {
  return /^(Titre|Sous-titre|CTA|Narration immersive|Narration|Développement|Vision|Philosophie|Dimension forte|Expérience UX suggérée|Exemple narratif|4\.1|4\.2|4\.3)/i.test(line);
}

export function parseWebContent(): SiteContent {
  const lines = fs.readFileSync(sourcePath, "utf-8").split("\n").map(clean).filter(Boolean);

  const sections: ContentBlock[] = [];
  let current: ContentBlock | null = null;

  for (const line of lines) {
    if (/^\d+\./.test(line) && line.includes("—")) {
      if (current) sections.push(current);
      current = {
        id: `section-${sections.length + 1}`,
        title: line.split("—")[1]?.trim() ?? line,
        paragraphs: [],
      };
      continue;
    }
    if (current && !isLabelLine(line)) {
      current.paragraphs.push(line);
    }
  }

  if (current) sections.push(current);

  const heroLines = sections[0]?.paragraphs ?? [];

  return {
    hero: {
      title: heroLines.find((line) => line.startsWith("Sous le manguier")) ?? "Sous le manguier, naissent les récits qui traversent le temps",
      subtitle: heroLines.find((line) => line.startsWith("Un espace vivant")) ?? "Un espace vivant où l’art, la mémoire et les voix contemporaines se rencontrent.",
      narrative: heroLines.filter((line) => line.length > 90).slice(0, 3),
      ctaPrimary: "Découvrir nos actions",
      ctaSecondary: "Participer à l'expérience",
    },
    sections,
    experiences: [
      {
        tag: "Exploration",
        title: "Dangoa",
        subtitle: "Cartographie poétique des quartiers",
        description: "Une exploration artistique où la ville devient une œuvre vivante. Parcours immersifs, déambulations et rencontres spontanées.",
        detail: "Marcher, rencontrer, ressentir.",
      },
      {
        tag: "Parole",
        title: "Awoula Awoula",
        subtitle: "La parole comme lien social",
        description: "Des soirées de contes et de récits partagés pour faire dialoguer les générations et transmettre les imaginaires.",
        detail: "Chaque histoire devient mémoire.",
      },
      {
        tag: "Immersion",
        title: "Soir au Kwatta",
        subtitle: "Immersion artistique multisensorielle",
        description: "Musique, danse, projections et poésie composent un temps fort où les arts dialoguent avec le territoire.",
        detail: "Le souffle de la nuit urbaine.",
      },
      {
        tag: "Création",
        title: "Porteurs de Joie",
        subtitle: "L’art participatif au cœur des communautés",
        description: "Ateliers, installations éphémères et performances interactives transforment l’espace public en terrain de création collective.",
        detail: "La joie comme acte de résistance.",
      },
    ],
  };
}
