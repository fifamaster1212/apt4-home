import placeholder from '../assets/placeholder.svg';

export type BlogCategory = 'product' | 'industry' | 'recruiting';

export interface BlogPost {
  id: string;
  title: string;
  date: string; // ISO date string
  category: BlogCategory;
  imageUrl?: string;
  slug: string;
  content?: string[];
}

// Spaces to dashes per requirements; keep case and punctuation otherwise
export function titleToSlug(title: string): string {
  return title.replace(/\s+/g, '-').toLowerCase();
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Expanding Rolodex with GPT-5',
    date: '2025-08-07',
    category: 'product',
    imageUrl: placeholder,
    slug: titleToSlug('Expanding Rolodex with GPT-5'),
    content: [
      'We are introducing a new wave of capabilities powered by GPT‑5 to elevate every aspect of interview prep — from generation quality to evaluation accuracy.',
      'This update unlocks faster practice loops, richer feedback, and more configurable experiences for organizations.'
    ]
  },
  {
    id: '2',
    title: 'Announcing Rolodex’s New Partnership with PitchBook',
    date: '2025-07-25',
    category: 'industry',
    imageUrl: placeholder,
    slug: titleToSlug('Announcing Rolodex’s New Partnership with PitchBook'),
    content: [
      'PitchBook data and insights are coming to Rolodex. This integration enhances deal research and market scanning across the platform.'
    ]
  },
  {
    id: '3',
    title: 'Rolodex Rolls Out Deep Research Capabilities in Collaboration with OpenAI',
    date: '2025-06-26',
    category: 'product',
    imageUrl: placeholder,
    slug: titleToSlug('Rolodex Rolls Out Deep Research Capabilities in Collaboration with OpenAI'),
    content: [
      'We are rolling out AI‑assisted research workflows designed for finance recruiting and interview readiness.'
    ]
  },
  {
    id: '4',
    title: 'How We Think About Trust and Safety',
    date: '2025-05-18',
    category: 'industry',
    imageUrl: placeholder,
    slug: titleToSlug('How We Think About Trust and Safety'),
    content: [
      'Our framework for building safe, reliable learning experiences for students and teams.'
    ]
  },
  {
    id: '5',
    title: 'Meet the Team: Building AI Guidance That Feels Like a Coach',
    date: '2025-04-03',
    category: 'recruiting',
    imageUrl: placeholder,
    slug: titleToSlug('Meet the Team: Building AI Guidance That Feels Like a Coach'),
    content: [
      'Get to know the people behind Rolodex and our product philosophy.'
    ]
  },
  {
    id: '6',
    title: 'Why Interview Readiness Needs Better Analytics',
    date: '2025-03-21',
    category: 'industry',
    imageUrl: placeholder,
    slug: titleToSlug('Why Interview Readiness Needs Better Analytics'),
    content: [
      'Analytics provide clarity on strengths and gaps — and improve outcomes across cohorts.'
    ]
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatDateShort(iso: string): string {
  const date = new Date(iso);
  const month = date.toLocaleDateString(undefined, { month: 'numeric' });
  const day = date.toLocaleDateString(undefined, { day: 'numeric' });
  const year = date.toLocaleDateString(undefined, { year: '2-digit' });
  return `${month}/${day}/${year}`;
}

export function formatDateLong(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
}


