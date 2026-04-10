import { parseWebContent } from "@/lib/content-parser";
import { HomeStory } from "@/components/immersive/home-story";

export default function LandingPage() {
  const content = parseWebContent();
  return <main><HomeStory content={content} /></main>;
}
