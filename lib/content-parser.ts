import fs from "node:fs";
import path from "node:path";
import { ParsedContent, ContentSection } from "./types";

const sourcePath = path.join(process.cwd(), "Documentation", "web_content-ASLM.md");

const normalize = (line: string) => line.trim().replace(/\*\*/g, "");

export function parseWebContent(): ParsedContent {
  const raw = fs.readFileSync(sourcePath, "utf-8");
  const lines = raw.split("\n").map(normalize).filter(Boolean);

  const sections: ContentSection[] = [];
  let current: ContentSection | null = null;

  for (const line of lines) {
    if (/^\d+\./.test(line) && line.includes("—")) {
      if (current) sections.push(current);
      const title = line.split("—")[1]?.trim() ?? line;
      current = { id: `section-${sections.length + 1}`, title, body: [] };
      continue;
    }
    if (current) current.body.push(line);
  }
  if (current) sections.push(current);

  const hero = sections[0] ?? { id: "hero", title: "Art Sous le Manguier", body: [] };
  const fruits = sections.slice(3, 6).map((s) => ({
    title: s.title,
    detail: s.body.find((b) => b.length > 60) ?? s.body[0] ?? "",
  }));

  return { hero, sections, fruits };
}
