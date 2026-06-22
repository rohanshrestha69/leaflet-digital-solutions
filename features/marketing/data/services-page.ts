import type { Logo } from "@/components/animations/infinite-logo-strip";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type ServiceOffering = {
  number: string;
  title: string;
  slug: string;
  description?: string;
};

export type ServiceTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type SubService = {
  number: string;
  title: string;
  description: string;
};

export type ServiceProject = {
  name: string;
  year: string;
  tags: readonly string[];
  image: string;
};

export type ServiceStat = {
  value: string;
  label: string;
  description: string;
};

export type ServiceStep = {
  number: string;
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDetail = ServiceOffering & {
  hero: {
    label: string;
    title: string;
    titleAccent?: string;
    description: string;
  };
  intro: {
    title: string;
    titleAccent?: string;
    body: string;
    image: string;
    supportingCopy: string;
  };
  subServicesTitle: string;
  subServicesSubtitle: string;
  subServices: SubService[];
  projects: ServiceProject[];
  steps: ServiceStep[];
  faqs: ServiceFaq[];
};

/* -------------------------------------------------------------------------- */
/*                               Service index                                */
/* -------------------------------------------------------------------------- */

export const serviceOfferings: ServiceOffering[] = [
  {
    number: "01",
    title: "Custom Software Development",
    slug: "custom-software",
    description:
      "Business systems, CRMs, ERPs, dashboards, booking platforms, inventory systems, and internal tools that streamline operations.",
  },
  {
    number: "02",
    title: "Website Development",
    slug: "website-development",
    description:
      "Fast, SEO-ready, responsive websites designed to build trust and convert visitors into customers.",
  },
  {
    number: "03",
    title: "Mobile App Development",
    slug: "mobile-development",
    description:
      "Cross-platform mobile applications for startups, businesses, and service-based platforms.",
  },
  {
    number: "04",
    title: "AI Automation & Integrations",
    slug: "ai-automation",
    description:
      "Workflow automation, AI assistants, data processing systems, and tool integrations that reduce manual work.",
  },
  {
    number: "05",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "User-focused interface design that improves usability, clarity, and product adoption.",
  },
  {
    number: "06",
    title: "SEO & Digital Growth",
    slug: "seo-growth",
    description:
      "Technical SEO, content structure, and optimization to improve visibility and organic reach.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                Shared data                                 */
/* -------------------------------------------------------------------------- */

export const servicesStats: ServiceStat[] = [
  {
    value: "100+",
    label: "Projects shipped",
    description: "A diverse body of work spanning startups and global brands.",
  },
  {
    value: "98%",
    label: "Client satisfaction",
    description:
      "Nearly all clients walk away with results that exceed expectations.",
  },
  {
    value: "25+",
    label: "Experts in our team",
    description:
      "Designers, engineers, and strategists collaborating across timezones.",
  },
  {
    value: "90%",
    label: "Clients return",
    description:
      "Trusted long-term partners on ongoing collaborations and new projects.",
  },
];

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
];

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
];

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
    question: "How long does a project take?",
    answer:
      "Timelines vary by scope — websites typically take 4 to 6 weeks, custom software 8 to 16 weeks, and mobile apps 8 to 12 weeks for an MVP.",
  },
  {
    question: "What do you need from me to start a project?",
    answer:
      "A short brief, any existing brand assets, and access to a single point of contact on your side. We handle the rest.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across SaaS, fintech, AI, web3, logistics, and service-based businesses — anywhere thoughtful technology moves the needle.",
  },
  {
    question: "How long does it take to design a website?",
    answer:
      "Marketing sites usually ship in 4 to 6 weeks. More complex builds with custom systems take 6 to 10 weeks.",
  },
  {
    question: "How can a great website enhance my business?",
    answer:
      "Your site is the most visited surface of your brand — trust, clarity, and speed compound on every visit and directly impact conversion.",
  },
];

const customSoftwareFaqs: ServiceFaq[] = [
  {
    question:
      "Do you build fully custom systems or use off-the-shelf platforms?",
    answer:
      "Both — we recommend the right approach based on your requirements. Sometimes a configured platform is the right call; often bespoke is the only way to fit complex workflows.",
  },
  {
    question: "What types of business systems do you build?",
    answer:
      "CRMs, ERPs, booking platforms, inventory systems, internal dashboards, client portals, and operations tools tailored to your exact processes.",
  },
  {
    question: "How long does a custom software project take?",
    answer:
      "Scoped projects typically run 8 to 16 weeks depending on complexity. We break work into sprints so you see progress every week.",
  },
  {
    question: "Can you integrate with our existing tools?",
    answer:
      "Yes — we integrate with third-party APIs, legacy databases, ERPs, and SaaS platforms as part of every build.",
  },
  {
    question: "Will we own the source code?",
    answer:
      "Absolutely. All source code, documentation, and assets are transferred to you at project close with full ownership.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes — we offer retainer-based maintenance plans covering bug fixes, dependency updates, and feature iterations after launch.",
  },
];

const websiteDevFaqs: ServiceFaq[] = [
  {
    question: "What technologies do you build websites with?",
    answer:
      "Next.js, TypeScript, and Tailwind CSS for custom builds. Webflow for marketing-managed sites. We match the stack to your team's ability to maintain it.",
  },
  {
    question: "How long does a website take to build?",
    answer:
      "Marketing sites typically ship in 4 to 6 weeks. Larger sites with custom features or CMS integrations run 6 to 10 weeks.",
  },
  {
    question: "Is SEO included?",
    answer:
      "Yes — technical SEO is built in from the start. Proper metadata, schema markup, semantic HTML, sitemap generation, and Core Web Vitals optimisation.",
  },
  {
    question: "Can my team manage content after launch?",
    answer:
      "Yes — we set up a CMS (Sanity, Contentful, or similar) with training so your team can edit content without touching code.",
  },
  {
    question: "Do you handle hosting and deployment?",
    answer:
      "We deploy on Vercel, AWS, or your preferred platform with CI/CD pipelines, preview deployments, and monitoring included.",
  },
  {
    question: "What about accessibility?",
    answer:
      "WCAG 2.1 AA compliance is standard — semantic HTML, keyboard navigation, ARIA labels, and screen reader testing on every project.",
  },
];

const mobileFaqs: ServiceFaq[] = [
  {
    question: "Do you build for iOS and Android?",
    answer:
      "Yes — we build cross-platform apps using React Native, delivering a single codebase that runs natively on both platforms.",
  },
  {
    question: "How long does a mobile app take to build?",
    answer:
      "An MVP typically takes 8 to 12 weeks. Full-featured applications with complex backends run 12 to 20 weeks depending on scope.",
  },
  {
    question: "Do you handle App Store submission?",
    answer:
      "Yes — we manage the full submission process for both the Apple App Store and Google Play, including review compliance.",
  },
  {
    question: "Can you build the backend as well?",
    answer:
      "Yes — we design and build APIs, databases, authentication, and admin dashboards alongside the mobile frontend.",
  },
  {
    question: "Do you do user testing?",
    answer:
      "Yes — interactive prototypes are tested with real users before development begins, reducing costly changes later.",
  },
  {
    question: "Can you work on an existing app?",
    answer:
      "Absolutely — we audit existing codebases, resolve technical debt, and ship new features alongside your current product.",
  },
];

const aiFaqs: ServiceFaq[] = [
  {
    question: "What kind of automation do you build?",
    answer:
      "Workflow automation, document processing, AI assistants, data extraction pipelines, and integrations between tools that don't natively connect.",
  },
  {
    question: "Which AI models and tools do you work with?",
    answer:
      "OpenAI, Anthropic, and open-source models — combined with tools like n8n, Zapier, Make, LangChain, and custom Python pipelines depending on requirements.",
  },
  {
    question: "Do I need a large dataset to get started?",
    answer:
      "Not always. Many automations work with existing data and tools. We assess what's available and design solutions that work with what you have.",
  },
  {
    question: "How do you ensure accuracy and reliability?",
    answer:
      "We build in validation steps, human-in-the-loop checkpoints where needed, and monitoring so you can catch and correct issues early.",
  },
  {
    question: "Can you integrate AI into our existing software?",
    answer:
      "Yes — we integrate AI capabilities directly into your existing platforms via APIs, webhooks, and custom middleware.",
  },
  {
    question: "How quickly can automation be deployed?",
    answer:
      "Simpler integrations and automations can go live in 2 to 4 weeks. Complex multi-system pipelines typically take 6 to 10 weeks.",
  },
];

const uiUxFaqs: ServiceFaq[] = [
  {
    question: "What's included in a UI/UX engagement?",
    answer:
      "User research, information architecture, wireframing, high-fidelity UI design, interactive prototyping, usability testing, and developer handoff.",
  },
  {
    question: "Do you work on existing products?",
    answer:
      "Yes — we frequently audit and redesign existing platforms, improving usability and conversion without rebuilding from scratch.",
  },
  {
    question: "What tools do you design in?",
    answer:
      "Figma for design and prototyping, FigJam for workshops and mapping, and Maze or Useberry for usability testing.",
  },
  {
    question: "Can you build a design system?",
    answer:
      "Yes — we create scalable component libraries in Figma with usage documentation your engineering team can implement directly.",
  },
  {
    question: "How do you validate design decisions?",
    answer:
      "Through rapid prototyping, heuristic reviews, and task-based usability testing at key milestones.",
  },
  {
    question: "Do you support handoff to developers?",
    answer:
      "Every project includes annotated specs, token documentation, and a developer walkthrough to ensure accurate implementation.",
  },
];

const seoGrowthFaqs: ServiceFaq[] = [
  {
    question: "What does your SEO service cover?",
    answer:
      "Technical SEO, on-page optimisation, keyword strategy, content structure, Core Web Vitals, schema markup, and monthly performance reporting.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Initial technical improvements show within 4 to 8 weeks. Meaningful ranking and traffic gains compound over 3 to 6 months.",
  },
  {
    question: "Do you write content as part of SEO?",
    answer:
      "Yes — our team writes search-optimised landing pages, blog articles, and metadata that ranks well and reads naturally.",
  },
  {
    question: "Can you fix existing SEO problems?",
    answer:
      "Absolutely. We run a full technical audit and prioritise fixes by impact — crawl errors, duplicate content, site speed, and structured data.",
  },
  {
    question: "Do you do keyword research?",
    answer:
      "Yes — every engagement starts with competitive analysis, keyword mapping, and content gap identification specific to your market.",
  },
  {
    question: "How do you report on progress?",
    answer:
      "Monthly reports covering keyword rankings, organic traffic trends, Core Web Vitals scores, and prioritised next steps.",
  },
];

/* -------------------------------------------------------------------------- */
/*                        Shared project pool                                 */
/* -------------------------------------------------------------------------- */

const projectPool = {
  vanquish: {
    name: "Vanquish",
    year: "2024",
    tags: ["Branding", "Web Design", "Development"],
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=900&fit=crop",
  },
  brandformance: {
    name: "Brandformance",
    year: "2024",
    tags: ["Web Design", "UX/UI"],
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&h=900&fit=crop",
  },
  continuos: {
    name: "ContinuOS",
    year: "2024",
    tags: ["Custom Software", "UX/UI"],
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=900&fit=crop",
  },
  northwind: {
    name: "Northwind",
    year: "2024",
    tags: ["Web Design", "Development"],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=900&fit=crop",
  },
  planet9: {
    name: "Planet9",
    year: "2024",
    tags: ["Mobile App", "UX/UI"],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=900&fit=crop",
  },
  taraxa: {
    name: "Taraxa",
    year: "2023",
    tags: ["Web Development", "SEO"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop",
  },
  fractal: {
    name: "Fractal",
    year: "2024",
    tags: ["Custom Software", "AI"],
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=900&fit=crop",
  },
  alphaledger: {
    name: "AlphaLedger",
    year: "2024",
    tags: ["Development", "UX/UI"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop",
  },
  gettalky: {
    name: "GetTalky",
    year: "2023",
    tags: ["Mobile App", "UI/UX"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=900&fit=crop",
  },
  shaka: {
    name: "Shaka",
    year: "2024",
    tags: ["SEO", "Digital Growth"],
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=900&fit=crop",
  },
  docinpoc: {
    name: "DocInPoc",
    year: "2024",
    tags: ["AI Automation", "Development"],
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=900&fit=crop",
  },
  hennessy: {
    name: "Hennessy Capital",
    year: "2023",
    tags: ["Web Development", "SEO"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                        Shared step templates                               */
/* -------------------------------------------------------------------------- */

const softwareSteps: ServiceStep[] = [
  {
    number: "01",
    title: "Discovery & Requirements",
    description:
      "Deep dive into your workflows, pain points, and business goals to define the scope and system architecture.",
  },
  {
    number: "02",
    title: "Architecture & Planning",
    description:
      "Technical stack selection, database design, and system planning before a single line of code is written.",
  },
  {
    number: "03",
    title: "Iterative Development",
    description:
      "Sprint-based builds with weekly demos — you see progress, provide feedback, and steer direction throughout.",
  },
  {
    number: "04",
    title: "Testing, Launch & Support",
    description:
      "Rigorous QA, zero-downtime deployment, team training, and post-launch support to keep systems running smoothly.",
  },
];

const websiteSteps: ServiceStep[] = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "Understanding your goals, target audience, and competitive landscape to define a clear direction.",
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description:
      "Wireframes and high-fidelity designs reviewed and approved before development begins.",
  },
  {
    number: "03",
    title: "Development & SEO",
    description:
      "Pixel-perfect builds with performance, accessibility, and technical SEO baked in from the start.",
  },
  {
    number: "04",
    title: "Launch & Handover",
    description:
      "Smooth deployment, CMS training, and ongoing support so your team can manage content with confidence.",
  },
];

const mobileSteps: ServiceStep[] = [
  {
    number: "01",
    title: "Product Definition",
    description:
      "Defining core features, user personas, and platform requirements before any design or code begins.",
  },
  {
    number: "02",
    title: "UX & Prototyping",
    description:
      "Interactive prototypes validated with real users before committing to full development.",
  },
  {
    number: "03",
    title: "Cross-Platform Development",
    description:
      "Building for iOS and Android simultaneously using React Native — one codebase, native performance.",
  },
  {
    number: "04",
    title: "QA, Launch & Iteration",
    description:
      "Device testing, App Store submission, and post-launch sprints based on real user feedback.",
  },
];

const aiSteps: ServiceStep[] = [
  {
    number: "01",
    title: "Workflow Audit",
    description:
      "Mapping your current processes to identify repetitive tasks and high-value automation opportunities.",
  },
  {
    number: "02",
    title: "Solution Design",
    description:
      "Selecting the right tools, models, and integration approach for your specific workflows and data.",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description:
      "Developing automation pipelines, AI agents, and integrations that connect seamlessly with your existing stack.",
  },
  {
    number: "04",
    title: "Monitor & Optimise",
    description:
      "Tracking automation performance, refining models, and expanding coverage as your operations scale.",
  },
];

const uiUxSteps: ServiceStep[] = [
  {
    number: "01",
    title: "Research & Discovery",
    description:
      "User interviews, analytics review, and heuristic audits to understand how people actually use your product.",
  },
  {
    number: "02",
    title: "Information Architecture",
    description:
      "Structuring flows and content hierarchy so users find what they need without friction.",
  },
  {
    number: "03",
    title: "Design & Prototyping",
    description:
      "High-fidelity UI with interactive prototypes — tested and refined before handoff to engineering.",
  },
  {
    number: "04",
    title: "Handoff & Support",
    description:
      "Annotated specs, component documentation, and developer walkthroughs to ensure accurate implementation.",
  },
];

const seoSteps: ServiceStep[] = [
  {
    number: "01",
    title: "Audit & Analysis",
    description:
      "Full technical audit, keyword opportunity mapping, and competitive landscape analysis.",
  },
  {
    number: "02",
    title: "Strategy & Roadmap",
    description:
      "Prioritised action plan covering technical fixes, content gaps, and on-page optimisation.",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Executing optimisations across technical structure, content, metadata, and Core Web Vitals.",
  },
  {
    number: "04",
    title: "Monitor & Scale",
    description:
      "Monthly reporting, ranking tracking, and continuous improvements compounding over time.",
  },
];

/* -------------------------------------------------------------------------- */
/*                          Per-service detail content                        */
/* -------------------------------------------------------------------------- */

export const serviceDetails: Record<string, ServiceDetail> = {
  /* ---------------------------------------------------------------------- */
  /*  01 — Custom Software Development                                       */
  /* ---------------------------------------------------------------------- */
  "custom-software": {
    ...serviceOfferings[0],
    hero: {
      label: "Custom Software Development",
      title: "Software built around",
      titleAccent: "how your business works.",
      description:
        "Business systems, CRMs, ERPs, dashboards, and internal tools engineered to fit your exact operations — not the other way around.",
    },
    intro: {
      title: "Off-the-shelf rarely",
      titleAccent: "fits complex operations.",
      body: "Generic software forces your team to work around its limitations. We build systems designed from the ground up for your workflows — reducing manual effort, eliminating data silos, and giving your team tools they actually want to use.",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=900&fit=crop",
      supportingCopy:
        "From booking platforms to full ERPs, every system we build is engineered to compound operational efficiency over time.",
    },
    subServicesTitle: "End-to-end business software, built to last.",
    subServicesSubtitle:
      "From requirements to deployment — systems that fit your operations, integrate with your stack, and scale with your growth.",
    subServices: [
      {
        number: "01",
        title: "CRM Development",
        description:
          "Custom customer relationship management systems built around your sales process and pipeline.",
      },
      {
        number: "02",
        title: "ERP Systems",
        description:
          "Integrated platforms that unify operations, finance, inventory, and reporting into a single system.",
      },
      {
        number: "03",
        title: "Dashboards & Reporting",
        description:
          "Real-time operational dashboards that surface the metrics your team needs to make faster decisions.",
      },
      {
        number: "04",
        title: "Booking & Scheduling Platforms",
        description:
          "End-to-end booking systems with availability management, payments, and notifications built in.",
      },
      {
        number: "05",
        title: "Inventory Management",
        description:
          "Stock tracking, supplier management, and fulfilment systems tailored to your supply chain.",
      },
      {
        number: "06",
        title: "Internal Tools & Portals",
        description:
          "Admin panels, client portals, and internal tools that streamline day-to-day operations for your team.",
      },
    ],
    projects: [
      projectPool.continuos,
      projectPool.alphaledger,
      projectPool.fractal,
      projectPool.docinpoc,
    ],
    steps: softwareSteps,
    faqs: customSoftwareFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  02 — Website Development                                               */
  /* ---------------------------------------------------------------------- */
  "website-development": {
    ...serviceOfferings[1],
    hero: {
      label: "Website Development",
      title: "Websites that build trust",
      titleAccent: "and convert visitors.",
      description:
        "Fast, SEO-ready, and responsive websites designed to represent your business professionally and turn traffic into customers.",
    },
    intro: {
      title: "Your website is your",
      titleAccent: "hardest working team member.",
      body: "A well-built website operates 24/7 — building credibility, answering questions, and guiding visitors toward action. We design and develop sites that perform as well as they look, with speed, accessibility, and search visibility built in from day one.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=900&fit=crop",
      supportingCopy:
        "Every site we build is engineered for performance, maintained by your team, and optimised to grow with your business.",
    },
    subServicesTitle: "Complete website delivery, start to finish.",
    subServicesSubtitle:
      "Design, development, CMS, SEO, and performance — everything needed to launch with confidence.",
    subServices: [
      {
        number: "01",
        title: "Website Design",
        description:
          "Clean, conversion-focused layouts designed to reflect your brand and guide visitor action.",
      },
      {
        number: "02",
        title: "Frontend Development",
        description:
          "Responsive, pixel-perfect builds using Next.js and Tailwind CSS — fast on every device.",
      },
      {
        number: "03",
        title: "CMS Integration",
        description:
          "Sanity, Contentful, or Webflow setup so your team can manage content without touching code.",
      },
      {
        number: "04",
        title: "Technical SEO",
        description:
          "Schema markup, metadata, sitemap generation, and Core Web Vitals baked into every build.",
      },
      {
        number: "05",
        title: "Performance Optimisation",
        description:
          "Image optimisation, lazy loading, and caching strategies for sub-second load times.",
      },
      {
        number: "06",
        title: "Hosting & Deployment",
        description:
          "CI/CD pipelines, preview deployments, and monitoring on Vercel or your preferred platform.",
      },
    ],
    projects: [
      projectPool.vanquish,
      projectPool.northwind,
      projectPool.taraxa,
      projectPool.hennessy,
    ],
    steps: websiteSteps,
    faqs: websiteDevFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  03 — Mobile App Development                                            */
  /* ---------------------------------------------------------------------- */
  "mobile-development": {
    ...serviceOfferings[2],
    hero: {
      label: "Mobile App Development",
      title: "Mobile apps built for",
      titleAccent: "real-world use.",
      description:
        "Cross-platform mobile applications for startups, growing businesses, and service platforms — designed for users, built for scale.",
    },
    intro: {
      title: "One codebase.",
      titleAccent: "Two platforms. Native performance.",
      body: "We build cross-platform mobile applications using React Native — delivering a consistent, high-quality experience on iOS and Android without the overhead of two separate codebases. From MVP to production, we design and engineer apps that users return to.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=900&fit=crop",
      supportingCopy:
        "From concept to App Store — product definition, UX, development, and post-launch iteration all in one team.",
    },
    subServicesTitle: "Full-cycle mobile app development.",
    subServicesSubtitle:
      "Strategy, design, engineering, and launch — cross-platform from day one.",
    subServices: [
      {
        number: "01",
        title: "MVP Development",
        description:
          "Focused first versions that validate your core value proposition fast and within budget.",
      },
      {
        number: "02",
        title: "Cross-Platform Engineering",
        description:
          "React Native builds that run natively on iOS and Android from a single maintained codebase.",
      },
      {
        number: "03",
        title: "UX & Interface Design",
        description:
          "Mobile-native UI patterns designed for thumb reachability, clarity, and platform conventions.",
      },
      {
        number: "04",
        title: "Backend & API Development",
        description:
          "Scalable APIs, authentication flows, push notifications, and real-time features.",
      },
      {
        number: "05",
        title: "App Store Submission",
        description:
          "Full submission management for Apple App Store and Google Play, including review compliance.",
      },
      {
        number: "06",
        title: "Post-Launch Iteration",
        description:
          "Analytics-driven improvements, feature additions, and performance optimisation after launch.",
      },
    ],
    projects: [
      projectPool.planet9,
      projectPool.gettalky,
      projectPool.continuos,
      projectPool.alphaledger,
    ],
    steps: mobileSteps,
    faqs: mobileFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  04 — AI Automation & Integrations                                      */
  /* ---------------------------------------------------------------------- */
  "ai-automation": {
    ...serviceOfferings[3],
    hero: {
      label: "AI Automation & Integrations",
      title: "Less manual work.",
      titleAccent: "More compounding output.",
      description:
        "Workflow automation, AI assistants, data processing pipelines, and tool integrations that eliminate repetitive tasks and scale your operations.",
    },
    intro: {
      title: "Automation is",
      titleAccent: "a force multiplier.",
      body: "Every hour your team spends on repetitive tasks is an hour not spent on high-value work. We identify your highest-friction workflows, design intelligent automation systems, and integrate them directly into the tools your team already uses — without disrupting how you operate.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop",
      supportingCopy:
        "From simple tool integrations to multi-step AI pipelines — we design automation that runs reliably in the background.",
    },
    subServicesTitle: "Intelligent automation across your operations.",
    subServicesSubtitle:
      "Workflow design, AI integration, data pipelines, and ongoing optimisation — built for reliability.",
    subServices: [
      {
        number: "01",
        title: "Workflow Automation",
        description:
          "Automating repetitive multi-step processes across your tools using n8n, Make, or custom pipelines.",
      },
      {
        number: "02",
        title: "AI Assistants",
        description:
          "Custom GPT-powered assistants for customer support, internal knowledge, and lead qualification.",
      },
      {
        number: "03",
        title: "Data Processing Pipelines",
        description:
          "Automated ingestion, transformation, and routing of data across systems and databases.",
      },
      {
        number: "04",
        title: "Tool Integrations",
        description:
          "Connecting platforms that don't natively communicate — CRMs, ERPs, marketing tools, and more.",
      },
      {
        number: "05",
        title: "Document Intelligence",
        description:
          "AI-powered document extraction, classification, and processing to eliminate manual data entry.",
      },
      {
        number: "06",
        title: "Automation Monitoring",
        description:
          "Dashboards and alerting that surface failures and performance metrics across all automation systems.",
      },
    ],
    projects: [
      projectPool.docinpoc,
      projectPool.fractal,
      projectPool.alphaledger,
      projectPool.continuos,
    ],
    steps: aiSteps,
    faqs: aiFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  05 — UI/UX Design                                                      */
  /* ---------------------------------------------------------------------- */
  "ui-ux-design": {
    ...serviceOfferings[4],
    hero: {
      label: "UI/UX Design",
      title: "Interfaces that make",
      titleAccent: "products obvious to use.",
      description:
        "User-focused design that improves usability, reduces friction, and drives product adoption — grounded in research, refined through testing.",
    },
    intro: {
      title: "Good design removes",
      titleAccent: "the need to think.",
      body: "The best interfaces are invisible — they guide users to their goals without friction or confusion. We design digital products with the same rigour applied to research as to pixels, ensuring every decision is grounded in how people actually behave.",
      image:
        "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=900&fit=crop",
      supportingCopy:
        "From user research to design systems — we design products that work as well as they look.",
    },
    subServicesTitle: "Research-driven design from flow to pixel.",
    subServicesSubtitle:
      "User research, information architecture, UI design, prototyping, and developer handoff — end to end.",
    subServices: [
      {
        number: "01",
        title: "User Research",
        description:
          "Interviews, surveys, and analytics analysis to understand user behaviour and uncover design opportunities.",
      },
      {
        number: "02",
        title: "Information Architecture",
        description:
          "Structuring navigation, content, and features so users find what they need without thinking.",
      },
      {
        number: "03",
        title: "Wireframing",
        description:
          "Low-fidelity layouts that validate structure and flow before any visual design is applied.",
      },
      {
        number: "04",
        title: "UI Design",
        description:
          "High-fidelity interfaces with careful attention to spacing, hierarchy, colour, and interaction states.",
      },
      {
        number: "05",
        title: "Design Systems",
        description:
          "Scalable Figma component libraries with documentation ready for engineering implementation.",
      },
      {
        number: "06",
        title: "Usability Testing",
        description:
          "Task-based testing with real users to validate design decisions and iterate before development.",
      },
    ],
    projects: [
      projectPool.planet9,
      projectPool.brandformance,
      projectPool.gettalky,
      projectPool.alphaledger,
    ],
    steps: uiUxSteps,
    faqs: uiUxFaqs,
  },

  /* ---------------------------------------------------------------------- */
  /*  06 — SEO & Digital Growth                                              */
  /* ---------------------------------------------------------------------- */
  "seo-growth": {
    ...serviceOfferings[5],
    hero: {
      label: "SEO & Digital Growth",
      title: "Organic visibility that",
      titleAccent: "compounds over time.",
      description:
        "Technical SEO, content structure, and optimisation strategies that improve search rankings, drive qualified traffic, and build lasting authority.",
    },
    intro: {
      title: "Search is an asset",
      titleAccent: "you build, not rent.",
      body: "Paid traffic stops the moment you stop paying. Organic search compounds — every technical improvement, every well-structured page, every piece of targeted content adds to an asset that grows in value over time. We build the foundations that make that compounding possible.",
      image:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=900&fit=crop",
      supportingCopy:
        "From Core Web Vitals to content strategy, every optimisation is designed to earn rankings and hold them.",
    },
    subServicesTitle: "Full-stack SEO and organic growth.",
    subServicesSubtitle:
      "Technical foundations, keyword strategy, content, and performance monitoring — integrated into your growth engine.",
    subServices: [
      {
        number: "01",
        title: "Technical SEO",
        description:
          "Site speed, crawlability, schema markup, Core Web Vitals, and indexation optimisation.",
      },
      {
        number: "02",
        title: "On-Page Optimisation",
        description:
          "Metadata, heading structure, internal linking, and content optimisation across key pages.",
      },
      {
        number: "03",
        title: "Keyword & Content Strategy",
        description:
          "Competitive analysis, intent mapping, and editorial planning for pages that rank and convert.",
      },
      {
        number: "04",
        title: "SEO Content Writing",
        description:
          "Search-optimised articles, landing pages, and metadata that rank well and read naturally.",
      },
      {
        number: "05",
        title: "Local SEO",
        description:
          "Google Business Profile, local citations, and geo-targeted content for location-based businesses.",
      },
      {
        number: "06",
        title: "Analytics & Reporting",
        description:
          "Monthly performance reports covering rankings, organic traffic, and actionable next steps.",
      },
    ],
    projects: [
      projectPool.shaka,
      projectPool.taraxa,
      projectPool.hennessy,
      projectPool.northwind,
    ],
    steps: seoSteps,
    faqs: seoGrowthFaqs,
  },
};

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

export function getServiceDetail(slug: string): ServiceDetail | null {
  return serviceDetails[slug] ?? null;
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceDetails);
}

/* -------------------------------------------------------------------------- */
/*                         Meeting scheduling content                         */
/* -------------------------------------------------------------------------- */

export type MeetingService = {
  id: string;
  title: string;
  description: string;
  durations: number[];
};

export const MEETING_SERVICES: MeetingService[] = [
  {
    id: "discovery",
    title: "Discovery Call",
    description:
      "A working session to scope your problem, align on outcomes, and decide if we're the right team to build it.",
    durations: [30, 45],
  },
  {
    id: "strategy",
    title: "Product & Brand Strategy",
    description:
      "Deeper review of your product, positioning, and roadmap. Bring questions — we'll bring frameworks.",
    durations: [45, 60],
  },
  {
    id: "audit",
    title: "Website / UX Audit",
    description:
      "Walk through your current site with a senior designer. Get concrete recommendations on the call.",
    durations: [45, 60],
  },
  {
    id: "engineering",
    title: "Engineering Consultation",
    description:
      "Architecture, integrations, and delivery planning for new builds or modernization work.",
    durations: [30, 60],
  },
];

export const TIME_SLOTS = {
  morning: [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
  ],
  afternoon: ["1:00 PM", "1:30 PM", "2:00 PM", "3:00 PM", "4:00 PM", "4:30 PM"],
  evening: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
} as const;

export type MeetingFormat = "online" | "in-person";
