export type ContentSection = {
  id: string;
  title: string;
  body: string[];
};

export type ParsedContent = {
  hero: ContentSection;
  sections: ContentSection[];
  fruits: { title: string; detail: string }[];
};
