
export interface Post {
  id: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

// types.ts
export type Paper = {
  id: string;
  title: string;
  authors: string;
  year: number;

  // venue 展示：全称 + (缩写, 可选 CCF)
  venueFull: string;      // e.g., "THE ACM Web Conference 2026"
  venueShort: string;     // e.g., "WWW'26"
  ccf?: 'A' | 'B' | 'C';  // ICLR 这种不填（ccf-none）

  // actions
  pdfUrl?: string;        // 直接打开 PDF
  codeUrl?: string;       // GitHub
  bibtex?: string;

  abstract?: string;
};


// types.ts
export type NewsEvent = {
  id: string;
  dateLabel: string;
  sortDate: string;
  content: string;
  type?: 'paper' | 'platform' | 'award' | 'graduation' | 'talk' | 'general';
  link?: string;

  imageUrl?: string;     // ✅ 新增
  imageAlt?: string;     // ✅ 新增
};



export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  school: string;
  avatar: string;
  socials: {
    github?: string;
    twitter?: string;
    email?: string;
  };
}
