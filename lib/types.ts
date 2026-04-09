export type ContentBlock = {
  title: string;
  paragraphs: string[];
};

export type SiteContent = {
  hero: {
    title: string;
    subtitle: string;
    narrative: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  sections: ContentBlock[];
};
