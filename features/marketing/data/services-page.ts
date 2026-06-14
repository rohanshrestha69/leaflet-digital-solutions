import type { Logo } from "@/components/animations/infinite-logo-strip"

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type ServiceOffering = {
  number: string
  title: string
  slug: string
  description?: string
}

export type ServiceTestimonial = {
  quote: string
  name: string
  role: string
  company: string
}

export type SubService = {
  number: string
  title: string
  description: string
}

export type ServiceProject = {
  name: string
  year: string
  tags: readonly string[]
  image: string
}

export type ServiceStat = {
  value: string
  label: string
  description: string
}

export type ServiceStep = {
  number: string
  title: string
  description: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServiceDetail = ServiceOffering & {
  hero: {
    label: string
    title: string
    titleAccent?: string
    description: string
  }
  intro: {
    title: string
    titleAccent?: string
    body: string
    image: string
    supportingCopy: string
  }
  subServicesTitle: string
  subServicesSubtitle: string
  subServices: SubService[]
  projects: ServiceProject[]
  steps: ServiceStep[]
  faqs: ServiceFaq[]
}

/* -------------------------------------------------------------------------- */
/*                               Service index                                */
/* -------------------------------------------------------------------------- */

export const serviceOfferings: ServiceOffering[] = [
  {
    number: "01",
    title: "Website Design",
    slug: "website-design",
    description:
      "Editorial marketing sites built to convert and easy for your team to maintain.",
  },
  {
    number: "02",
    title: "Branding",
    slug: "branding",
    description:
      "Identity systems with the depth to scale across product, marketing, and beyond.",
  },
  {
    number: "03",
    title: "UX / UI",
    slug: "ux-ui",
    description:
      "Product design that turns complex workflows into experiences people prefer.",
  },
  {
    number: "04",
    title: "Motion Design",
    slug: "motion-design",
    description:
      "Purposeful motion that explains, guides, and elevates without distracting.",
  },
  {
    number: "05",
    title: "SEO",
    slug: "seo",
    description:
      "Technical and content SEO foundations that compound for years after launch.",
  },
  {
    number: "06",
    title: "Content Creation",
    slug: "content",
    description:
      "Words, photography, and assets crafted to live inside the brand system.",
  },
  {
    number: "07",
    title: "Landing Pages",
    slug: "landing-pages",
    description:
      "High-conversion landers built for campaigns, launches, and paid traffic.",
  },
  {
    number: "08",
    title: "Web Development",
    slug: "web-development",
    description:
      "Production-grade Next.js builds with performance and accessibility baked in.",
  },
]

/* -------------------------------------------------------------------------- */
/*                                Shared data                                 */
/* -------------------------------------------------------------------------- */

export const servicesStats: ServiceStat[] = [
  { value: "100+", label: "Projects shipped", description: "A diverse body of work spanning startups and global brands." },
  { value: "98%", label: "Client satisfaction", description: "Nearly all clients walk away with results that exceed expectations." },
  { value: "25+", label: "Experts in our team", description: "Designers, engineers, and strategists collaborating across timezones." },
  { value: "90%", label: "Clients return", description: "Trusted long-term partners on ongoing collaborations and new projects." },
]

export const servicesPartners: Logo[] = [
  { label: "Hennessy Capital" },
  { label: "Planet9" },
  { label: "H-Factor" },
  { label: "Fractalized" },
  { label: "GetTalky" },
  { label: "AlphaLedger" },
  { label: "DocInPoc" },
  { label: "Shaka" },
  { label: "Northwind" },
  { label: "Atlas" },
]

export const servicesTestimonials: ServiceTestimonial[] = [
  {
    quote:
      "Leaflet crushed it with the UX/UI for our app. Super sleek, intuitive, and on-point — exactly what we needed.",
    name: "Ganjina Oripova",
    role: "Co-Founder",
    company: "Planet9",
  },
  {
    quote:
      "The work was great, done on a timely basis, and Leaflet was easy and flexible to work with. We had hugely positive responses from the community after the rebrand.",
    name: "Steven Pu",
    role: "CEO",
    company: "Taraxa",
  },
  {
    quote:
      "All deliverables were completed on time, and positive feedback was received during focus group sessions. They went through every detail to align with the vision.",
    name: "Juan Paolo Legaspi",
    role: "Managing Director",
    company: "Fractal",
  },
]

/* -------------------------------------------------------------------------- */
/*                              Shared FAQ sets                               */
/* -------------------------------------------------------------------------- */

export const servicesFaqs: ServiceFaq[] = [
  {
    question: "Do you offer revisions?",
    answer:
      "Yes — every engagement includes structured revision rounds at each milestone so we land exactly where you want.",
  },
  {
    question: "How long does branding take?",
    answer:
      "A full brand identity typically takes 3 to 5 weeks, depending on scope and the number of touchpoints involved.",
  },
  {
    question: "What do you need from me to start a project?",
    answer:
      "A short brief, any existing brand assets, and access to a single point of contact on your side. We handle the rest.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across SaaS, fintech, AI, web3, and consumer brands — anywhere thoughtful design moves the needle.",
  },
  {
    question: "How long does it take to design a website?",
    answer:
      "Marketing sites usually ship in 4 to 6 weeks. More complex products with custom systems take 6 to 10 weeks.",
  },
  {
    question: "How can my website enhance my brand?",
    answer:
      "Your site is the most visited surface of your brand — tone, motion, and detail compound trust on every visit.",
  },
]

const brandingFaqs: ServiceFaq[] = [
  { question: "What's included in a branding project?", answer: "Logo design, color system, typography, brand guidelines document, and application across key touchpoints — business cards, social templates, and presentation decks." },
  { question: "Can you rebrand an existing company?", answer: "Absolutely. We audit your current brand, identify what's working, and evolve the system — keeping equity where it matters and refreshing what doesn't." },
  { question: "Do you do naming?", answer: "Yes — we offer brand naming as part of our identity engagements, including trademark screening and domain research." },
  { question: "How many concepts do you present?", answer: "We typically present 2–3 refined directions per milestone, narrowing down through collaborative feedback." },
  { question: "Will I own the final brand assets?", answer: "Yes — all source files, fonts, and guidelines are transferred to you at project close with full ownership." },
  { question: "Can the brand scale across products?", answer: "That's the point. Every system we build is designed to flex across product, marketing, merch, and beyond." },
]

const uxUiFaqs: ServiceFaq[] = [
  { question: "What's the difference between UX and UI?", answer: "UX is the structure — user flows, information architecture, and interaction logic. UI is the visual layer — colors, typography, and component design. We handle both." },
  { question: "Do you work on existing products?", answer: "Yes — we frequently audit and redesign existing platforms, improving usability and conversion without rebuilding from scratch." },
  { question: "How do you validate designs?", answer: "Through rapid prototyping, internal heuristic reviews, and user testing sessions at key milestones." },
  { question: "What tools do you design in?", answer: "Figma for design, FigJam for workshops, and Maze or Useberry for usability testing." },
  { question: "Can you build a design system?", answer: "Yes — we create scalable component libraries in Figma with documentation your engineering team can implement directly." },
  { question: "Do you support handoff to developers?", answer: "Every project includes a structured handoff with annotated specs, token documentation, and developer walkthroughs." },
]

const motionDesignFaqs: ServiceFaq[] = [
  { question: "What kind of motion do you create?", answer: "UI micro-interactions, page transitions, scroll-driven animations, loading sequences, logo animations, and explainer motion graphics." },
  { question: "Do you animate existing designs?", answer: "Yes — we can take static Figma designs and layer in purposeful motion that enhances the experience." },
  { question: "What tools do you use?", answer: "After Effects, Lottie, Rive, and Framer Motion for web — depending on the platform and performance requirements." },
  { question: "Can motion actually improve conversion?", answer: "Yes — well-placed micro-interactions reduce cognitive load, guide attention, and increase perceived quality, which correlates directly with trust and conversion." },
  { question: "How do you ensure performance?", answer: "We optimize every animation for GPU acceleration, use transform/opacity only where possible, and benchmark frame rates across devices." },
  { question: "Do you create motion guidelines?", answer: "Yes — we document easing curves, duration scales, and usage principles so your team can extend the system consistently." },
]

const seoFaqs: ServiceFaq[] = [
  { question: "What type of SEO do you offer?", answer: "Technical SEO (site speed, schema, crawlability), on-page optimization (content, metadata, internal linking), and content strategy for long-term organic growth." },
  { question: "How long until we see results?", answer: "Initial improvements in 4–8 weeks. Meaningful ranking and traffic gains typically compound over 3–6 months." },
  { question: "Do you do keyword research?", answer: "Yes — every engagement starts with competitive analysis, keyword mapping, and content gap identification." },
  { question: "Can you fix existing SEO issues?", answer: "Absolutely. We run a full technical audit and prioritize fixes by impact — from crawl errors to Core Web Vitals." },
  { question: "Do you write SEO content?", answer: "Yes — our content team writes search-optimized articles, landing pages, and metadata that ranks and reads naturally." },
  { question: "How do you report on progress?", answer: "Monthly reports covering keyword rankings, organic traffic, Core Web Vitals, and actionable next steps." },
]

const contentFaqs: ServiceFaq[] = [
  { question: "What types of content do you create?", answer: "Website copy, blog articles, case studies, social media content, email sequences, video scripts, and brand photography direction." },
  { question: "Do you match our brand voice?", answer: "Yes — we start with a tone-of-voice audit (or create one) and write everything within that framework." },
  { question: "Can you handle ongoing content?", answer: "Yes — we offer monthly content retainers for blogs, social, and email, with editorial calendars and performance tracking." },
  { question: "Do you do photography?", answer: "We art-direct and coordinate brand photography — either with our network of photographers or your existing team." },
  { question: "How do you ensure quality?", answer: "Every piece goes through writing, editing, and brand review before delivery. Revision rounds are built into every engagement." },
  { question: "Can content improve conversions?", answer: "Absolutely. Strategic copy on key pages is one of the highest-leverage changes you can make — often outperforming design changes alone." },
]

const landingPageFaqs: ServiceFaq[] = [
  { question: "How fast can you deliver a landing page?", answer: "Most landing pages ship in 1–2 weeks — design, copy, development, and QA included." },
  { question: "Do you write the copy?", answer: "Yes — conversion-focused copy is included. We research your audience, value props, and competitive landscape before writing." },
  { question: "Can you A/B test?", answer: "Yes — we set up variant testing with tools like Vercel Flags, Optimizely, or Google Optimize to maximize conversion." },
  { question: "What platforms do you build on?", answer: "Next.js for custom builds, Webflow for marketing-managed pages, or whatever integrates with your existing stack." },
  { question: "Do you track performance?", answer: "Every page ships with analytics, event tracking, and conversion attribution set up from day one." },
  { question: "Can you build pages for ad campaigns?", answer: "Absolutely — we specialize in high-converting landers for paid social, Google Ads, and product launches." },
]

const webDevFaqs: ServiceFaq[] = [
  { question: "What tech stack do you use?", answer: "Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion — with Vercel for deployment and edge optimization." },
  { question: "Do you build custom backends?", answer: "Yes — we build API routes, database integrations, auth flows, and admin dashboards alongside the frontend." },
  { question: "How do you handle performance?", answer: "Server components, static generation, image optimization, lazy loading, and bundle analysis are standard on every build." },
  { question: "Can you work with our existing codebase?", answer: "Yes — we frequently join existing projects, audit the code, and ship improvements alongside your team." },
  { question: "Do you handle hosting and deployment?", answer: "We deploy on Vercel, AWS, or your preferred platform — with CI/CD pipelines, preview deployments, and monitoring." },
  { question: "What about accessibility?", answer: "WCAG 2.1 AA compliance is built into every project — semantic HTML, keyboard navigation, ARIA labels, and screen reader testing." },
]

/* -------------------------------------------------------------------------- */
/*                        Shared project pool                                 */
/* -------------------------------------------------------------------------- */

const projectPool = {
  vanquish: { name: "Vanquish", year: "2024", tags: ["Branding", "Webflow", "Web Design"], image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=900&fit=crop" },
  brandformance: { name: "Brandformance", year: "2024", tags: ["Web Design", "UX/UI"], image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&h=900&fit=crop" },
  continuos: { name: "ContinuOS", year: "2024", tags: ["Web Design", "UX/UI"], image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=900&fit=crop" },
  northwind: { name: "Northwind", year: "2024", tags: ["Web Design", "Development"], image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=900&fit=crop" },
  planet9: { name: "Planet9", year: "2024", tags: ["UX/UI", "Mobile App"], image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=900&fit=crop" },
  taraxa: { name: "Taraxa", year: "2023", tags: ["Branding", "Web Design"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop" },
  fractal: { name: "Fractal", year: "2024", tags: ["Branding", "Motion"], image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=900&fit=crop" },
  alphaledger: { name: "AlphaLedger", year: "2024", tags: ["Development", "UX/UI"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop" },
  gettalky: { name: "GetTalky", year: "2023", tags: ["Landing Page", "CRO"], image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=900&fit=crop" },
  shaka: { name: "Shaka", year: "2024", tags: ["SEO", "Content"], image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=900&fit=crop" },
  docinpoc: { name: "DocInPoc", year: "2024", tags: ["Development", "AI"], image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=900&fit=crop" },
  hennessy: { name: "Hennessy Capital", year: "2023", tags: ["Web Design", "Branding"], image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop" },
} as const

/* -------------------------------------------------------------------------- */
/*                        Shared step templates                               */
/* -------------------------------------------------------------------------- */

const designSteps: ServiceStep[] = [
  { number: "01", title: "Discovery & Strategy", description: "Understanding your goals, audience, and competitive landscape to define a clear direction." },
  { number: "02", title: "Wireframing & UX", description: "Mapping the architecture and user flow before pixels are placed on the canvas." },
  { number: "03", title: "Design & Style Guide", description: "Crafting the visual system — typography, color, components — into a cohesive brand experience." },
  { number: "04", title: "Handover & Support", description: "Smooth launch, team training, and ongoing iteration to keep the site evolving." },
]

const brandingSteps: ServiceStep[] = [
  { number: "01", title: "Discovery & Audit", description: "Deep dive into your business, market, audience, and competitors to uncover your brand's position." },
  { number: "02", title: "Strategy & Narrative", description: "Defining your brand story, voice, values, and messaging framework." },
  { number: "03", title: "Identity Design", description: "Logo, color system, typography, and visual language — tested across every touchpoint." },
  { number: "04", title: "Guidelines & Rollout", description: "A comprehensive brand book and templates your team can use on day one." },
]

const developmentSteps: ServiceStep[] = [
  { number: "01", title: "Architecture & Planning", description: "Technical discovery, stack selection, and system design before writing a single line of code." },
  { number: "02", title: "Sprint Development", description: "Iterative sprints with weekly demos — you see progress, provide feedback, and steer direction." },
  { number: "03", title: "Testing & QA", description: "Cross-browser, device, accessibility, and performance testing to catch issues before launch." },
  { number: "04", title: "Deploy & Iterate", description: "Zero-downtime deployment, monitoring setup, and post-launch optimization sprints." },
]

const seoSteps: ServiceStep[] = [
  { number: "01", title: "Audit & Analysis", description: "Full technical audit, competitive analysis, and keyword opportunity mapping." },
  { number: "02", title: "Strategy & Roadmap", description: "Prioritized action plan covering technical fixes, content gaps, and link-building opportunities." },
  { number: "03", title: "Implementation", description: "Executing on-page optimizations, content creation, schema markup, and Core Web Vitals improvements." },
  { number: "04", title: "Monitor & Scale", description: "Monthly reporting, ranking tracking, and iterative improvements based on data." },
]

/* -------------------------------------------------------------------------- */
/*                          Per-service detail content                        */
/* -------------------------------------------------------------------------- */

export const serviceDetails: Record<string, ServiceDetail> = {
  /* ---------------------------------------------------------------------- */
  /*  01 — Website Design                                                    */
  /* ---------------------------------------------------------------------- */
  "website-design": {
    ...serviceOfferings[0],
    hero: {
      label: "Website Design",
      title: "Web design that",
      titleAccent: "inspires and converts.",
      description:
        "High-performing websites that captivate and convert — blending creativity and strategy to deliver seamless digital experiences.",
    },
    intro: {
      title: "More than a",
      titleAccent: "digital presence.",
      body: "A well-designed website goes beyond aesthetics — it builds trust, captures attention, and turns casual visitors into loyal customers. We design every detail with intent, balancing brand expression with conversion-focused UX.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=900&fit=crop",
      supportingCopy: "Your website is the first impression most people have of your brand — and we treat it that way.",
    },
    subServicesTitle: "Stunning, high-performance websites end to end.",
    subServicesSubtitle: "A complete toolkit — from content and design to development, optimization, and conversion.",
    subServices: [
      { number: "01", title: "Content Writing", description: "Engaging, impactful content tailored to your brand and audience." },
      { number: "02", title: "Website Design", description: "Visually stunning and user-friendly designs that convert." },
      { number: "03", title: "Website Development", description: "Responsive, high-performance websites built to scale." },
      { number: "04", title: "CMS Setup", description: "Flexible content management that streamlines updates and workflows." },
      { number: "05", title: "SEO", description: "Technical and on-page optimization to rank higher and earn organic traffic." },
      { number: "06", title: "CRO", description: "Conversion-focused UX improvements that maximize business outcomes." },
    ],
    projects: [projectPool.vanquish, projectPool.brandformance, projectPool.continuos, projectPool.northwind],
    steps: designSteps,
    faqs: servicesFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  02 — Branding                                                          */
  /* ---------------------------------------------------------------------- */
  "branding": {
    ...serviceOfferings[1],
    hero: {
      label: "Branding",
      title: "Brands built to",
      titleAccent: "outlast trends.",
      description:
        "Identity systems that feel inevitable — rooted in strategy, expressed with craft, and designed to scale across every touchpoint.",
    },
    intro: {
      title: "Identity is",
      titleAccent: "your unfair advantage.",
      body: "A strong brand isn't a logo — it's a promise kept across every interaction. We build identity systems with the depth to scale across product, marketing, and culture — systems that get sharper with use, not duller.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=900&fit=crop",
      supportingCopy: "From naming to visual identity, every element is designed to compound brand equity over time.",
    },
    subServicesTitle: "End-to-end brand identity systems.",
    subServicesSubtitle: "Strategy, design, and guidelines that give your team the confidence to build consistently.",
    subServices: [
      { number: "01", title: "Brand Strategy", description: "Positioning, audience mapping, and competitive analysis to define your brand's space." },
      { number: "02", title: "Logo & Identity", description: "Logomark, wordmark, and symbol — tested across every scale and application." },
      { number: "03", title: "Visual Language", description: "Color, typography, photography style, and graphic elements that feel uniquely yours." },
      { number: "04", title: "Brand Guidelines", description: "Comprehensive documentation your team and partners can use on day one." },
      { number: "05", title: "Brand Naming", description: "Name exploration, trademark screening, and domain research." },
      { number: "06", title: "Brand Applications", description: "Business cards, social templates, pitch decks, and packaging design." },
    ],
    projects: [projectPool.taraxa, projectPool.fractal, projectPool.vanquish, projectPool.hennessy],
    steps: brandingSteps,
    faqs: brandingFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  03 — UX / UI                                                           */
  /* ---------------------------------------------------------------------- */
  "ux-ui": {
    ...serviceOfferings[2],
    hero: {
      label: "UX / UI Design",
      title: "Product design that",
      titleAccent: "people prefer.",
      description:
        "Interfaces that turn complex workflows into clear, intuitive experiences — designed for real users, validated with real data.",
    },
    intro: {
      title: "Design for",
      titleAccent: "how people think.",
      body: "Great product design is invisible — it removes friction so users can focus on their goals, not your interface. We design systems that scale, reduce support load, and make your product the obvious choice.",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=900&fit=crop",
      supportingCopy: "From user research to pixel-perfect UI, we design products that work as well as they look.",
    },
    subServicesTitle: "Research-driven product design.",
    subServicesSubtitle: "User flows, prototypes, design systems, and usability testing — end to end.",
    subServices: [
      { number: "01", title: "User Research", description: "Interviews, surveys, and analytics to understand behavior and uncover opportunity." },
      { number: "02", title: "Information Architecture", description: "Structuring content and features so users find what they need without thinking." },
      { number: "03", title: "Wireframing", description: "Low-fidelity layouts to validate structure and flow before visual design." },
      { number: "04", title: "UI Design", description: "High-fidelity interfaces with attention to spacing, color, typography, and interaction." },
      { number: "05", title: "Design Systems", description: "Scalable component libraries with documentation for engineering handoff." },
      { number: "06", title: "Usability Testing", description: "Task-based testing with real users to validate decisions and iterate quickly." },
    ],
    projects: [projectPool.planet9, projectPool.alphaledger, projectPool.continuos, projectPool.brandformance],
    steps: designSteps,
    faqs: uxUiFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  04 — Motion Design                                                     */
  /* ---------------------------------------------------------------------- */
  "motion-design": {
    ...serviceOfferings[3],
    hero: {
      label: "Motion Design",
      title: "Motion that",
      titleAccent: "means something.",
      description:
        "Purposeful animation that explains, guides, and elevates — without stealing the show from your content.",
    },
    intro: {
      title: "Beyond eye",
      titleAccent: "candy.",
      body: "Motion isn't decoration — it's communication. We use animation to reduce cognitive load, guide attention, reveal hierarchy, and create the kind of polish that makes users trust your product on a subconscious level.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=900&fit=crop",
      supportingCopy: "From micro-interactions to page transitions, every frame serves a purpose.",
    },
    subServicesTitle: "Motion that enhances every layer.",
    subServicesSubtitle: "UI animation, brand motion, and explainer graphics — all designed for performance.",
    subServices: [
      { number: "01", title: "Micro-interactions", description: "Hover states, button feedback, and input animations that make interfaces feel alive." },
      { number: "02", title: "Page Transitions", description: "Smooth, GPU-accelerated transitions that guide users between views." },
      { number: "03", title: "Scroll Animations", description: "Parallax, reveal, and scroll-driven effects that tell a story as users move." },
      { number: "04", title: "Logo Animation", description: "Animated logos for splash screens, intros, and social media." },
      { number: "05", title: "Motion Guidelines", description: "Easing curves, duration scales, and usage documentation for your team." },
      { number: "06", title: "Explainer Graphics", description: "Animated diagrams, product walkthroughs, and onboarding sequences." },
    ],
    projects: [projectPool.fractal, projectPool.planet9, projectPool.vanquish, projectPool.continuos],
    steps: [
      { number: "01", title: "Motion Audit", description: "Analyzing your current interface to identify where motion adds the most value." },
      { number: "02", title: "Concept & Storyboard", description: "Sketching animation flows and timing before touching any tools." },
      { number: "03", title: "Prototype & Refine", description: "Building interactive prototypes, testing on devices, and iterating on feel." },
      { number: "04", title: "Implement & Document", description: "Shipping production-ready code or Lottie files with motion guidelines." },
    ],
    faqs: motionDesignFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  05 — SEO                                                               */
  /* ---------------------------------------------------------------------- */
  "seo": {
    ...serviceOfferings[4],
    hero: {
      label: "SEO",
      title: "SEO that",
      titleAccent: "compounds for years.",
      description:
        "Technical and content SEO foundations that drive organic traffic, build authority, and keep working long after launch.",
    },
    intro: {
      title: "Organic growth",
      titleAccent: "is a system.",
      body: "Search isn't a channel you turn on — it's an asset you build. We lay the technical foundation, fill content gaps, and create the kind of structured, intent-driven content that earns rankings and keeps them.",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=900&fit=crop",
      supportingCopy: "From Core Web Vitals to content strategy, every optimization is designed to compound over time.",
    },
    subServicesTitle: "Full-stack search engine optimization.",
    subServicesSubtitle: "Technical fixes, content strategy, and performance monitoring — integrated into your growth engine.",
    subServices: [
      { number: "01", title: "Technical SEO", description: "Site speed, crawlability, schema markup, and Core Web Vitals optimization." },
      { number: "02", title: "On-page SEO", description: "Metadata, heading structure, internal linking, and content optimization." },
      { number: "03", title: "Keyword Strategy", description: "Competitive analysis, intent mapping, and topic clustering for your market." },
      { number: "04", title: "Content Strategy", description: "Editorial planning for blogs, landing pages, and pillar content that ranks." },
      { number: "05", title: "Local SEO", description: "Google Business Profile, local citations, and geo-targeted content." },
      { number: "06", title: "Analytics & Reporting", description: "Monthly performance reports with rankings, traffic, and actionable insights." },
    ],
    projects: [projectPool.shaka, projectPool.hennessy, projectPool.gettalky, projectPool.taraxa],
    steps: seoSteps,
    faqs: seoFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  06 — Content Creation                                                  */
  /* ---------------------------------------------------------------------- */
  "content": {
    ...serviceOfferings[5],
    hero: {
      label: "Content Creation",
      title: "Content that",
      titleAccent: "earns attention.",
      description:
        "Words, photography, and assets crafted to live inside your brand system — and drive measurable results.",
    },
    intro: {
      title: "Every word",
      titleAccent: "is a brand decision.",
      body: "Content isn't filler — it's the most direct line between your brand and your audience. We create copy, articles, case studies, and visual assets that speak in your voice and move people toward action.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=900&fit=crop",
      supportingCopy: "From blog articles to brand photography, every asset is designed to work within your system.",
    },
    subServicesTitle: "Content that works across every surface.",
    subServicesSubtitle: "Website copy, articles, case studies, social content, and photography — all on-brand.",
    subServices: [
      { number: "01", title: "Website Copywriting", description: "Conversion-focused copy for landing pages, product pages, and marketing sites." },
      { number: "02", title: "Blog & Articles", description: "Long-form content that ranks, educates, and builds thought leadership." },
      { number: "03", title: "Case Studies", description: "Structured project stories that demonstrate impact and build trust with prospects." },
      { number: "04", title: "Social Content", description: "Platform-native posts, carousels, and threads that extend your reach." },
      { number: "05", title: "Email Sequences", description: "Nurture flows, onboarding sequences, and campaign emails that drive action." },
      { number: "06", title: "Brand Photography", description: "Art direction, shot lists, and coordination for photography that fits your system." },
    ],
    projects: [projectPool.shaka, projectPool.taraxa, projectPool.hennessy, projectPool.fractal],
    steps: [
      { number: "01", title: "Voice & Tone Audit", description: "Defining (or refining) your brand voice, tone, and messaging hierarchy." },
      { number: "02", title: "Content Strategy", description: "Editorial calendar, topic mapping, and channel prioritization." },
      { number: "03", title: "Creation & Review", description: "Writing, editing, and brand review — with revision rounds built in." },
      { number: "04", title: "Publish & Measure", description: "Publishing across channels with performance tracking and iteration." },
    ],
    faqs: contentFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  07 — Landing Pages                                                     */
  /* ---------------------------------------------------------------------- */
  "landing-pages": {
    ...serviceOfferings[6],
    hero: {
      label: "Landing Pages",
      title: "Landing pages that",
      titleAccent: "actually convert.",
      description:
        "High-conversion landers built for campaigns, launches, and paid traffic — designed, written, and shipped in days, not months.",
    },
    intro: {
      title: "Every click",
      titleAccent: "deserves a destination.",
      body: "Generic pages kill campaigns. We design and build bespoke landing pages that match your ad creative, speak to your audience's intent, and guide them to a single, measurable action.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=900&fit=crop",
      supportingCopy: "From paid social to product launches, every lander is optimized for the traffic source hitting it.",
    },
    subServicesTitle: "Campaign-ready pages, end to end.",
    subServicesSubtitle: "Strategy, copy, design, development, and conversion tracking — all included.",
    subServices: [
      { number: "01", title: "Campaign Strategy", description: "Aligning the page with your funnel, audience segment, and traffic source." },
      { number: "02", title: "Conversion Copywriting", description: "Headline testing, value prop articulation, and CTA optimization." },
      { number: "03", title: "Page Design", description: "Scroll-optimized layouts that reduce bounce and guide toward action." },
      { number: "04", title: "Development", description: "Pixel-perfect builds on Next.js or Webflow with sub-second load times." },
      { number: "05", title: "A/B Testing", description: "Variant testing with proper statistical rigor to maximize conversion." },
      { number: "06", title: "Analytics Setup", description: "Event tracking, attribution, and reporting connected to your CRM." },
    ],
    projects: [projectPool.gettalky, projectPool.brandformance, projectPool.northwind, projectPool.vanquish],
    steps: [
      { number: "01", title: "Brief & Audit", description: "Understanding the campaign, traffic source, audience, and success metrics." },
      { number: "02", title: "Copy & Wireframe", description: "Writing the page before designing it — structure follows persuasion." },
      { number: "03", title: "Design & Build", description: "Visual design and production-grade development in a single sprint." },
      { number: "04", title: "Launch & Optimize", description: "Go live, monitor analytics, run variants, and iterate for peak conversion." },
    ],
    faqs: landingPageFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  08 — Web Development                                                   */
  /* ---------------------------------------------------------------------- */
  "web-development": {
    ...serviceOfferings[7],
    hero: {
      label: "Web Development",
      title: "Code that",
      titleAccent: "ships and scales.",
      description:
        "Production-grade Next.js builds with performance, accessibility, and developer experience baked into every layer.",
    },
    intro: {
      title: "Engineering",
      titleAccent: "is a design decision.",
      body: "Fast, accessible, maintainable code isn't a nice-to-have — it's the foundation of every great digital product. We build with the same intentionality we design with, using modern tooling that your team can actually maintain.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=900&fit=crop",
      supportingCopy: "Next.js, TypeScript, Tailwind — production-grade architecture from day one.",
    },
    subServicesTitle: "Full-stack web engineering.",
    subServicesSubtitle: "Frontend, backend, infrastructure, and performance — built to your requirements.",
    subServices: [
      { number: "01", title: "Frontend Development", description: "React, Next.js, and Tailwind CSS — server-rendered, edge-optimized, and accessible." },
      { number: "02", title: "Backend & API", description: "API routes, database design, auth flows, and third-party integrations." },
      { number: "03", title: "CMS Integration", description: "Sanity, Contentful, or Payload — structured content your team can manage." },
      { number: "04", title: "Performance Optimization", description: "Core Web Vitals, bundle analysis, lazy loading, and caching strategies." },
      { number: "05", title: "DevOps & CI/CD", description: "Automated pipelines, preview deployments, and zero-downtime releases." },
      { number: "06", title: "Accessibility", description: "WCAG 2.1 AA compliance — semantic HTML, keyboard nav, and screen reader testing." },
    ],
    projects: [projectPool.docinpoc, projectPool.alphaledger, projectPool.northwind, projectPool.continuos],
    steps: developmentSteps,
    faqs: webDevFaqs,
  },
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

export function getServiceDetail(slug: string): ServiceDetail | null {
  return serviceDetails[slug] ?? null
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceDetails)
}