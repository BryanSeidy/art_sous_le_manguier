import fs from "node:fs";
import path from "node:path";
import { SiteContent, ContentBlock } from "./types";

const sourcePath = path.join(process.cwd(), "Documentation", "web_content-ASLM.md");

function clean(line: string) {
  return line.trim().replace(/\*\*/g, "");
}

export function parseWebContent(): SiteContent {
  const lines = fs.readFileSync(sourcePath, "utf-8").split("\n").map(clean).filter(Boolean);

  const sections: ContentBlock[] = [];
  let current: ContentBlock | null = null;

  for (const line of lines) {
    if (/^\d+\./.test(line) && line.includes("—")) {
      if (current) sections.push(current);
      current = {
        title: line.split("—")[1]?.trim() ?? line,
        paragraphs: [],
      };
      continue;
    }
    if (current && !/^(Titre|Sous-titre|CTA|Narration immersive|Narration|Développement|Vision|Philosophie|Dimension|Expérience)/i.test(line)) {
      current.paragraphs.push(line);
    }
  }

  if (current) sections.push(current);

  const heroSource = lines.slice(0, 40);
  const title = heroSource.find((line) => line.startsWith("Sous le manguier")) ?? "Sous le manguier, naissent les récits";
  const subtitle = heroSource.find((line) => line.startsWith("Un espace vivant")) ?? "Une expérience narrative contemporaine.";

  return {
    hero: {
      title,
      subtitle,
      narrative: heroSource.filter((line) => line.length > 70).slice(0, 3),
      ctaPrimary: "Entrer sous le manguier",
      ctaSecondary: "Regarder les épisodes",
    },
    sections,
  };
}
