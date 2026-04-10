export type ContentBlock = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type HeroContent = {
  title: string;
  subtitle: string;
  narrative: string[];
  ctaPrimary: string;
  ctaSecondary: string;
};

export type ExperienceItem = {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
};

export type SiteContent = {
  hero: HeroContent;
  sections: ContentBlock[];
  experiences: ExperienceItem[];
};
