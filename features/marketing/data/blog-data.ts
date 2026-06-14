/* -------------------------------------------------------------------------- */
/*                                Categories                                  */
/* -------------------------------------------------------------------------- */

export type BlogCategory =
  | "UX/UI"
  | "Web Design"
  | "Branding"
  | "Engineering"
  | "Articles"
  | "News"

/* -------------------------------------------------------------------------- */
/*                              Category colors                               */
/*  Used for the small dot indicator on cards and badge tinting.              */
/* -------------------------------------------------------------------------- */

export const categoryColors: Record<BlogCategory, string> = {
  "UX/UI": "text-[#a78bfa]",
  "Web Design": "text-[#60a5fa]",
  Branding: "text-[var(--brand)]",
  Engineering: "text-[#34d399]",
  Articles: "text-[#f472b6]",
  News: "text-[#facc15]",
}

export function getCategoryColor(category: string): string {
  return (
    categoryColors[category as BlogCategory] ?? "text-[var(--brand)]"
  )
}

/* -------------------------------------------------------------------------- */
/*                              Content blocks                                */
/* -------------------------------------------------------------------------- */

export type BlogTextBlock = {
  type: "text"
  body: string | string[]
}

export type BlogHeadingBlock = {
  type: "heading"
  level?: 2 | 3 | 4
  text: string
  id?: string
}

export type BlogImageBlock = {
  type: "image"
  src: string
  alt: string
  caption?: string
  aspect?: string
}

export type BlogGalleryBlock = {
  type: "gallery"
  images: Array<{ src: string; alt: string }>
  columns?: 2 | 3
}

export type BlogQuoteBlock = {
  type: "quote"
  text: string
  author?: string
}

export type BlogListBlock = {
  type: "list"
  ordered?: boolean
  items: string[]
}

export type BlogCalloutBlock = {
  type: "callout"
  variant?: "info" | "brand" | "warning"
  title?: string
  body: string
}

export type BlogCodeBlock = {
  type: "code"
  language?: string
  code: string
}

export type BlogButtonsBlock = {
  type: "buttons"
  actions: Array<{
    label: string
    href: string
    variant?: "orange" | "outlineDark"
    external?: boolean
  }>
}

export type BlogVideoBlock = {
  type: "video"
  src: string
  poster?: string
  caption?: string
}

export type BlogFaqBlock = {
  type: "faq"
  title?: string
  faqs: BlogFaq[]
}

export type BlogDividerBlock = {
  type: "divider"
}

export type BlogContentBlock =
  | BlogTextBlock
  | BlogHeadingBlock
  | BlogImageBlock
  | BlogGalleryBlock
  | BlogQuoteBlock
  | BlogListBlock
  | BlogCalloutBlock
  | BlogCodeBlock
  | BlogButtonsBlock
  | BlogVideoBlock
  | BlogFaqBlock
  | BlogDividerBlock

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type BlogFaq = {
  question: string
  answer: string
}

export type BlogSection = {
  id: string
  heading: string
  blocks: BlogContentBlock[]
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  date: string
  readTime: string
  author: string
  image: string
  featured?: boolean
  sections: BlogSection[]
  faqs?: BlogFaq[]
  pullQuote?: string
}

/* -------------------------------------------------------------------------- */
/*                                Blog posts                                  */
/* -------------------------------------------------------------------------- */

export const blogPosts: BlogPost[] = [
  {
    id: "silent-revenue-killer",
    slug: "silent-revenue-killer",
    title:
      "The Silent Revenue Killer: Why Your Product UI is Creating Churn",
    excerpt:
      "Most churn isn't a pricing problem — it's a UI problem. Here's how to find the friction points hiding in your product and fix them before they cost you customers.",
    category: "UX/UI",
    date: "May 10, 2026",
    readTime: "6 min read",
    author: "Aarav Sharma",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=900&fit=crop",
    featured: true,
    sections: [
      {
        id: "introduction",
        heading: "The hidden cost of friction",
        blocks: [
          {
            type: "text",
            body: [
              "Most churn doesn't happen because your product is too expensive — it happens because using it feels like a chore. Every confusing button, every unnecessary click, every moment of hesitation adds up to a customer who quietly stops logging in.",
              "The frustrating part is that most of this friction is invisible to the team that built the product. You know where everything is. New users don't.",
            ],
          },
          {
            type: "callout",
            variant: "brand",
            title: "Quick tip",
            body: "Start with session recordings. Ten new users will reveal more friction than a hundred surveys ever could.",
          },
        ],
      },
      {
        id: "find-friction",
        heading: "How to find friction points",
        blocks: [
          {
            type: "text",
            body: "Here's the framework we use to surface the highest-impact friction in any product:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Watch ten new users navigate without guidance",
              "Note every pause, scroll-back, or wrong click",
              "Map each friction point to a conversion moment",
              "Prioritize by frequency × revenue proximity",
            ],
          },
          {
            type: "quote",
            text: "Every confusing interaction is a small request for the user to leave — most of them eventually accept.",
          },
        ],
      },
      {
        id: "fix-priorities",
        heading: "Fixing the right things first",
        blocks: [
          {
            type: "text",
            body: "Not all friction is equal. A confusing onboarding flow is far more expensive than a poorly worded tooltip. Prioritize by impact: how often the friction occurs and how close it is to a conversion moment.",
          },
          {
            type: "callout",
            variant: "warning",
            title: "Watch out",
            body: "Don't fix everything at once. Big-bang redesigns introduce new friction faster than they remove the old.",
          },
        ],
      },
    ],
    pullQuote:
      "Every confusing interaction is a small request for the user to leave — most of them eventually accept.",
    faqs: [
      {
        question: "How do I measure churn caused by UI?",
        answer:
          "Look at activation funnels, time-to-first-value, and feature adoption rates. Drop-offs in these metrics almost always trace back to UI friction.",
      },
      {
        question: "Should I redesign everything at once?",
        answer:
          "No. Identify the highest-impact friction points and fix them iteratively. Big-bang redesigns often introduce new friction.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Activation and retention metrics typically respond within 2–4 weeks of fixing a major friction point.",
      },
    ],
  },

  {
    id: "differentiation-engineering",
    slug: "differentiation-engineering",
    title:
      "Differentiation is Engineering: How Strategic Branding Breaks the B2B Sea of Sameness",
    excerpt:
      "Why most B2B brands look identical — and how the ones that don't are quietly winning the market by treating differentiation as engineering, not marketing.",
    category: "Branding",
    date: "May 1, 2026",
    readTime: "5 min read",
    author: "Anika Rai",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&h=900&fit=crop",
    featured: true,
    sections: [
      {
        id: "introduction",
        heading: "The sea of sameness",
        blocks: [
          {
            type: "text",
            body: [
              "Every B2B SaaS landing page looks like every other B2B SaaS landing page. Gradient hero, three-column feature grid, logos of customers, dashboard screenshot. The visual language has collapsed into a single template.",
              "The companies winning category leadership are the ones breaking this pattern with intention — not for novelty, but to communicate a different position in the market.",
            ],
          },
        ],
      },
      {
        id: "engineering",
        heading: "Differentiation as engineering",
        blocks: [
          {
            type: "text",
            body: "Real differentiation is engineered, not decorated. It starts with a clear thesis about why your company exists and what it does differently — and then every brand decision either reinforces or contradicts that thesis.",
          },
          {
            type: "quote",
            text: "If you look like everyone else, your product has to do all the differentiation work alone — and that's a losing battle.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can a small company really differentiate?",
        answer:
          "Smaller companies have an advantage — they can make distinctive choices without 47 stakeholders watering them down.",
      },
      {
        question: "Won't being different alienate customers?",
        answer:
          "Yes, intentionally. The goal is to repel the wrong customers so the right ones immediately recognize you.",
      },
    ],
  },

  {
    id: "price-anchor-effect",
    slug: "price-anchor-effect",
    title:
      "The Price Anchor Effect: Why Your Logo Can't Justify Your Enterprise Contract",
    excerpt:
      "Premium pricing requires premium perception — and that perception is built (or destroyed) in the first three seconds of your brand experience.",
    category: "Branding",
    date: "April 25, 2026",
    readTime: "7 min read",
    author: "Priya Thapa",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1600&h=900&fit=crop",
    featured: true,
    sections: [
      {
        id: "introduction",
        heading: "What buyers actually evaluate",
        blocks: [
          {
            type: "text",
            body: [
              "Enterprise buyers don't read your feature list before deciding whether to take a meeting. They look at your website, your deck, your case studies — and they form a price expectation within seconds.",
              "If that price expectation is below your actual price, every conversation becomes a justification exercise. If it's above, you've just left money on the table.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How do I know if my brand justifies my price?",
        answer:
          "Run a price sensitivity test with prospects. If they're surprised your pricing is as high as it is, your brand is under-positioning you.",
      },
    ],
  },

  {
    id: "brand-as-growth-engine",
    slug: "brand-as-growth-engine",
    title:
      "Brand as a Growth Engine: Compounding Equity Through Disciplined Design",
    excerpt:
      "Why brand investment compounds like infrastructure — and how to think about brand spend as a growth channel rather than a marketing expense.",
    category: "Articles",
    date: "April 15, 2026",
    readTime: "6 min read",
    author: "Aarav Sharma",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1600&h=900&fit=crop",
    sections: [
      {
        id: "introduction",
        heading: "Brand as infrastructure",
        blocks: [
          {
            type: "text",
            body: "Most companies think of brand as a marketing line item. The companies that grow fastest treat it as infrastructure — a long-term asset that compounds returns across every channel.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How do I measure brand ROI?",
        answer:
          "Look at indirect metrics: branded search volume, direct traffic, time-to-close, and CAC payback periods.",
      },
    ],
  },

  {
    id: "branding-problems",
    slug: "branding-problems",
    title:
      "Branding Problems Behind Marketing: The Hidden Cost of Inconsistency",
    excerpt:
      "Inconsistent branding doesn't just look bad — it actively erodes trust and increases the cost of every marketing dollar you spend.",
    category: "Branding",
    date: "April 8, 2026",
    readTime: "4 min read",
    author: "Anika Rai",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&h=900&fit=crop",
    sections: [
      {
        id: "introduction",
        heading: "The compound cost of inconsistency",
        blocks: [
          {
            type: "text",
            body: "Every inconsistent touchpoint forces the customer to re-evaluate whether they're dealing with the same company. That cognitive overhead is friction — and friction kills conversion.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What's the fastest way to fix brand inconsistency?",
        answer:
          "Build a single source of truth for visual assets and require every team to pull from it.",
      },
    ],
  },

  {
    id: "ux-systems-thinking",
    slug: "ux-systems-thinking",
    title: "Systems Thinking in UX: Designing for Compounding Clarity",
    excerpt:
      "Why one-off UX wins don't compound — and how systems thinking turns individual fixes into permanent improvements.",
    category: "UX/UI",
    date: "March 10, 2026",
    readTime: "5 min read",
    author: "Priya Thapa",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1600&h=900&fit=crop",
    sections: [
      {
        id: "introduction",
        heading: "The system, not the screen",
        blocks: [
          {
            type: "text",
            body: "Great UX isn't a collection of well-designed screens — it's a system that makes the whole product feel coherent. Systems compound; screens don't.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What's the difference between UX and a design system?",
        answer:
          "UX is the experience. A design system is the toolkit that makes consistent UX scalable across teams and time.",
      },
    ],
  },

  {
    id: "webflow-handoff",
    slug: "webflow-handoff",
    title: "The Webflow Handoff: A Modern Workflow for Faster Launches",
    excerpt:
      "Why we ship marketing sites in Webflow and hand them off to clients — and the workflow that makes it work at scale.",
    category: "Web Design",
    date: "March 3, 2026",
    readTime: "4 min read",
    author: "Aarav Sharma",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop",
    sections: [
      {
        id: "introduction",
        heading: "Why Webflow",
        blocks: [
          {
            type: "text",
            body: "Webflow hits a sweet spot — designer-grade output with client-grade editability. The right choice for 80% of marketing sites.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "When isn't Webflow the right choice?",
        answer:
          "When you need deep custom integrations or complex e-commerce — at that point a custom Next.js build is the right call.",
      },
    ],
  },

  {
    id: "remote-first-engineering",
    slug: "remote-first-engineering",
    title: "Building a remote-first engineering team that ships",
    excerpt:
      "Lessons from running a distributed engineering team across six timezones — what works, what breaks, and what we'd do differently.",
    category: "Engineering",
    date: "February 28, 2026",
    readTime: "11 min read",
    author: "Priya Thapa",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&h=900&fit=crop",
    sections: [
      {
        id: "introduction",
        heading: "Why remote-first works",
        blocks: [
          {
            type: "text",
            body: "Remote-first isn't just remote work — it's a deliberate organizational design where every process assumes nobody is in the same room.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How do you handle timezone differences?",
        answer:
          "We default to async communication. Sync meetings happen when timezones overlap, and we record everything for those who can't attend live.",
      },
    ],
  },

  {
    id: "news-2026",
    slug: "news-2026",
    title: "Leaflet 2026: New Studio, New Standards",
    excerpt:
      "We're entering 2026 with a renewed focus, a refined process, and a higher bar for the work we put into the world.",
    category: "News",
    date: "February 22, 2026",
    readTime: "3 min read",
    author: "Aarav Sharma",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop",
    sections: [
      {
        id: "introduction",
        heading: "A new chapter",
        blocks: [
          {
            type: "text",
            body: "This year we're doubling down on craft, narrowing our focus, and raising the bar on everything we ship.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What's changing?",
        answer:
          "Our process, our standards, and our project intake — all upgraded to reflect what we've learned over the past five years.",
      },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured)
}

export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug) ?? null
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPost(slug)
  if (!current) return []

  const sameCategory = blogPosts.filter(
    (p) => p.slug !== slug && p.category === current.category
  )
  const others = blogPosts.filter(
    (p) => p.slug !== slug && p.category !== current.category
  )

  return [...sameCategory, ...others].slice(0, limit)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}

export function getAllCategories(): BlogCategory[] {
  return Array.from(new Set(blogPosts.map((p) => p.category)))
}

/**
 * Returns the latest N blog posts sorted by their position in the array.
 * Useful for the homepage "Writing from the studio" section.
 */
export function getLatestPosts(limit = 4): BlogPost[] {
  return blogPosts.slice(0, limit)
}