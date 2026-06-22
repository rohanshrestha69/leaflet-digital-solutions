// features/marketing/data/projects-page.ts

export type ProjectCategory =
  | "Web Design"
  | "Branding"
  | "UX/UI"
  | "Motion Design"
  | "Mobile"
  | "AI";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectProcessStep = {
  title: string;
  description: string;
};

export type Project = {
  /* Core (used everywhere) */
  id: string;
  slug: string;
  title: string;
  year: string;
  tags: ProjectCategory[];
  image: string;
  video?: string;
  tone?: string;
  href?: string;
  featured?: boolean;
  featuredOrder?: number;

  /* Detail page fields */
  client?: string;
  industry?: string;
  location?: string;
  duration?: string;
  services?: string[];
  about?: string;
  challenge?: string;
  solution?: string;
  takeaways?: string;
  summary?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  metrics?: ProjectMetric[];
  gallery?: string[];
  process?: ProjectProcessStep[];
  liveUrl?: string;
};

const VIDEO_BASE =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";

export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  /*  1. Hallo Helper                                                   */
  /* ---------------------------------------------------------------- */
  {
    id: "hallo-helper",
    slug: "hallo-helper",
    title: "Hallo Helper",
    year: "2025",
    tags: ["Mobile", "UX/UI"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ForBiggerBlazes.mp4`,
    tone: "#1a1a1c",
    href: "/work/hallo-helper",
    featured: true,
    featuredOrder: 1,

    client: "Hallo Services",
    industry: "Marketplace",
    location: "Berlin, DE",
    duration: "12 weeks",
    services: ["Product Design", "Mobile Development", "Design System"],
    liveUrl: "https://hallo-helper.example.com",
    about:
      "End-to-end redesign of a household service marketplace — onboarding, booking, and provider tooling rebuilt from the ground up to handle 3× the order volume.",
    challenge:
      "Hallo was losing 40% of bookings to a fragmented mobile experience. Providers and customers shared the same app, creating confusion. The booking flow took 7 minutes on average and the support team was overwhelmed.",
    solution:
      "We split the experience into two purpose-built apps with a shared design system, redesigned the booking flow down to 90 seconds, and built a real-time matching engine that pairs requests with available providers in under 4 seconds.",
    takeaways:
      "When a single interface tries to serve opposing user needs, both groups lose. Splitting the customer and provider experiences while sharing a design system unlocked 3.2× booking conversion and reduced support tickets by 58%.",
    summary:
      "A complete redesign that proved focused experiences outperform generic ones — every metric that matters moved in the right direction within 30 days of launch.",
    testimonial:
      "Leaflet delivered the kind of clarity our product had been missing for two years. The new onboarding alone moved our activation rate from 38% to 71%.",
    testimonialAuthor: "Sara Lindqvist, CPO at Hallo",
    metrics: [
      { value: "3.2×", label: "booking conversion" },
      { value: "90s", label: "average booking time" },
      { value: "+71%", label: "activation rate" },
      { value: "-58%", label: "support tickets" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Connect provider accounts",
        description:
          "OAuth-based onboarding pulls in service history and credentials in under 60 seconds.",
      },
      {
        title: "Set service preferences",
        description:
          "Granular controls for availability, pricing tiers, and travel radius.",
      },
      {
        title: "Match in real time",
        description:
          "Customer requests route to ranked providers automatically.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  2. Fabio's Pizza                                                  */
  /* ---------------------------------------------------------------- */
  {
    id: "fabios-pizza",
    slug: "fabios-pizza",
    title: "Fabio's Pizza",
    year: "2025",
    tags: ["Branding", "Web Design"],
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ForBiggerEscapes.mp4`,
    tone: "#2a1a1a",
    href: "/work/fabios-pizza",
    featured: true,
    featuredOrder: 2,

    client: "Fabio's",
    industry: "Food & Beverage",
    location: "Milan, IT",
    duration: "8 weeks",
    services: ["Brand Identity", "Web Design", "Packaging"],
    liveUrl: "https://fabios-pizza.example.com",
    about:
      "Identity, packaging and ordering experience for a fast-paced urban pizzeria scaling from one location to five.",
    challenge:
      "Fabio's brand was inconsistent across menus, packaging, and digital. Customer recognition was low and ordering was scattered across three platforms.",
    solution:
      "A confident new identity rooted in Italian print history, paired with a unified online ordering system that handles dine-in, pickup, and delivery from a single interface.",
    takeaways:
      "Strong brand systems compound. Within 90 days of rollout, repeat order rate jumped 47% and average order value increased 23%.",
    summary:
      "A brand and product launch that turned a beloved local pizzeria into a recognizable regional name.",
    testimonial:
      "Our customers actually noticed the rebrand. Online orders doubled in the first month — that never happens with branding work.",
    testimonialAuthor: "Fabio Romano, Founder of Fabio's",
    metrics: [
      { value: "12k", label: "weekly orders" },
      { value: "+47%", label: "repeat orders" },
      { value: "+23%", label: "AOV" },
      { value: "2.1×", label: "online vs in-store" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571066811602-716837d681de?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593504049359-74330189a345?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Brand discovery",
        description:
          "Workshops with founders and staff to surface what makes Fabio's distinct from chains.",
      },
      {
        title: "Identity system",
        description:
          "Logo, type, color, photography direction, and packaging mockups.",
      },
      {
        title: "Ordering platform",
        description:
          "Custom checkout flow integrated with their POS and delivery partners.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  3. Northwind Finance                                              */
  /* ---------------------------------------------------------------- */
  {
    id: "northwind-finance",
    slug: "northwind-finance",
    title: "Northwind Finance",
    year: "2024",
    tags: ["Web Design", "UX/UI"],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ForBiggerFun.mp4`,
    tone: "#101820",
    href: "/work/northwind-finance",
    featured: true,
    featuredOrder: 3,

    client: "Northwind Capital",
    industry: "Wealth Management",
    location: "London, UK",
    duration: "16 weeks",
    services: ["Web Design", "Dashboard UX", "Brand Refresh"],
    liveUrl: "https://northwind.example.com",
    about:
      "Marketing site and analytics dashboard for a modern wealth management platform serving high-net-worth individuals across Europe.",
    challenge:
      "Northwind needed to compete with legacy firms while feeling more accessible. Their existing site converted at 0.4% and their dashboard had a 12-minute average task completion time.",
    solution:
      "A confident marketing site that leads with outcomes instead of jargon, and a dashboard rebuilt around the three decisions clients actually make: contribute, rebalance, withdraw.",
    takeaways:
      "Financial UX is about trust through clarity, not complexity. Removing 40% of dashboard surface area improved task completion by 3×.",
    summary:
      "A platform redesign that proved sophisticated investors prefer clarity over feature density.",
    testimonial:
      "Our conversion rate jumped from 0.4% to 1.9% in the first quarter. The dashboard alone has saved our support team an estimated 200 hours a month.",
    testimonialAuthor: "James Whitfield, Head of Product at Northwind",
    metrics: [
      { value: "+148%", label: "qualified signups" },
      { value: "1.9%", label: "site conversion" },
      { value: "3×", label: "faster tasks" },
      { value: "200h", label: "saved monthly" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Audit current platform",
        description:
          "Session recordings and analytics review across 2,400 active sessions.",
      },
      {
        title: "Reduce surface area",
        description:
          "Cut dashboard from 32 screens to 11, focused on the highest-value flows.",
      },
      {
        title: "Launch with confidence",
        description:
          "Phased rollout to existing clients with concierge onboarding.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  4. Atlas Travel Co.                                               */
  /* ---------------------------------------------------------------- */
  {
    id: "atlas-travel",
    slug: "atlas-travel",
    title: "Atlas Travel Co.",
    year: "2024",
    tags: ["Branding", "Web Design"],
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ForBiggerJoyrides.mp4`,
    tone: "#1c1814",
    href: "/work/atlas-travel",
    featured: true,
    featuredOrder: 4,

    client: "Atlas Travel",
    industry: "Travel & Hospitality",
    location: "Lisbon, PT",
    duration: "10 weeks",
    services: ["Brand Identity", "Booking Platform", "Editorial Design"],
    liveUrl: "https://atlas-travel.example.com",
    about:
      "End-to-end booking experience and brand system for a boutique travel agency curating small-group itineraries across the Mediterranean and North Africa.",
    challenge:
      "Atlas was hand-crafting itineraries that delighted clients but their digital presence felt generic. They needed to scale word-of-mouth into discoverable, bookable trips without losing the personal touch.",
    solution:
      "An editorial-first brand and booking platform where each itinerary reads like a magazine feature. Real photography, real itineraries, and a one-page checkout that respects how people actually plan trips.",
    takeaways:
      "Travel websites often hide the trip behind filters. Atlas leads with story — and got a 4.9-star average across 230 reviews in the first six months.",
    summary:
      "A brand and platform that captured what made Atlas special and scaled it without dilution.",
    testimonial:
      "The new site doesn't feel like a booking engine — it feels like the trip itself. That's exactly what we needed.",
    testimonialAuthor: "Inês Carvalho, Founder of Atlas",
    metrics: [
      { value: "4.9★", label: "guest rating" },
      { value: "+89%", label: "direct bookings" },
      { value: "230+", label: "reviews / 6 months" },
      { value: "12 days", label: "avg booking lead time" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Story-first content model",
        description:
          "Editorial CMS so guides can write each trip as a feature, not a listing.",
      },
      {
        title: "Frictionless booking",
        description:
          "Single-page checkout with intelligent date and guest defaults.",
      },
      {
        title: "Concierge handoff",
        description:
          "Smooth transition from self-serve to Atlas's human travel designers.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  5. Lumen Health                                                   */
  /* ---------------------------------------------------------------- */
  {
    id: "lumen-health",
    slug: "lumen-health",
    title: "Lumen Health",
    year: "2024",
    tags: ["AI", "UX/UI"],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/Sintel.mp4`,
    tone: "#0e1a1f",
    href: "/work/lumen-health",

    client: "Lumen",
    industry: "Healthcare",
    location: "Boston, US",
    duration: "20 weeks",
    services: ["AI Product Design", "Conversational UX", "Web Platform"],
    liveUrl: "https://lumen-health.example.com",
    about:
      "Care navigation platform connecting patients, providers and payers via a conversational interface that intelligently triages care needs.",
    challenge:
      "Patients were waiting 45 minutes on average to reach intake, and clinical staff were spending 60% of their time on administrative coordination instead of care.",
    solution:
      "A conversational triage layer powered by structured medical taxonomies, with seamless handoff to human staff for any case that requires it. Built with explainability and safety guardrails throughout.",
    takeaways:
      "AI in healthcare works when it amplifies clinicians instead of replacing them. Lumen cut intake time by 62% while increasing patient satisfaction.",
    summary:
      "A conversational platform proving that the best AI products feel invisible — they make humans more capable.",
    testimonial:
      "Our nurses got their afternoons back. Patients get answers in minutes instead of hours. This is what healthcare technology should feel like.",
    testimonialAuthor: "Dr. Priya Menon, Chief Medical Officer at Lumen",
    metrics: [
      { value: "62%", label: "faster intake" },
      { value: "+38%", label: "patient satisfaction" },
      { value: "4 min", label: "avg first response" },
      { value: "0", label: "safety incidents" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Clinical guardrails",
        description:
          "Co-designed with physicians to define what the AI can and cannot do.",
      },
      {
        title: "Structured taxonomy",
        description:
          "Every response is grounded in approved medical references.",
      },
      {
        title: "Human handoff",
        description:
          "One-tap escalation to a nurse with full conversation context.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  6. Vision Labs                                                    */
  /* ---------------------------------------------------------------- */
  {
    id: "vision-labs",
    slug: "vision-labs",
    title: "Vision Labs",
    year: "2023",
    tags: ["Web Design", "Motion Design"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/BigBuckBunny.mp4`,
    tone: "#16121f",
    href: "/work/vision-labs",

    client: "Vision Labs",
    industry: "AI Research",
    location: "San Francisco, US",
    duration: "6 weeks",
    services: ["Web Design", "Motion Design", "Brand"],
    liveUrl: "https://vision-labs.example.com",
    about:
      "Research-driven website and product narrative for an applied computer vision lab spinning out of Stanford.",
    challenge:
      "Vision needed a fundraising-ready site in six weeks that would credibly communicate complex CV research to non-technical investors and enterprise partners.",
    solution:
      "An editorial site with custom motion demonstrations that let visitors see the technology in action without needing to read a paper. Built to scale from a 5-person team to a 50-person company.",
    takeaways:
      "Research labs often default to academic restraint. Showing the work in motion — not just describing it — closed Vision's $8M seed round in 4 weeks.",
    summary:
      "A research narrative made tangible — the launch directly contributed to closing their seed round ahead of schedule.",
    testimonial:
      "Every investor meeting started with 'I saw your site.' That's the kind of asset Leaflet delivered.",
    testimonialAuthor: "Dr. Marcus Chen, CEO of Vision Labs",
    metrics: [
      { value: "$8M", label: "seed raised" },
      { value: "4 weeks", label: "to close" },
      { value: "32", label: "investor demos" },
      { value: "12", label: "enterprise leads" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Narrative workshop",
        description:
          "Two days with the founding team to land the core story and audience.",
      },
      {
        title: "Live demos",
        description:
          "Custom WebGL demonstrations of the actual research running in-browser.",
      },
      {
        title: "Ship in six weeks",
        description: "Tight scope, weekly investor previews, no scope creep.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  7. Orbit Studio                                                   */
  /* ---------------------------------------------------------------- */
  {
    id: "orbit-studio",
    slug: "orbit-studio",
    title: "Orbit Studio",
    year: "2025",
    tags: ["Branding", "Web Design"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ElephantsDream.mp4`,
    tone: "#1f1a14",
    href: "/work/orbit-studio",

    client: "Orbit",
    industry: "SaaS",
    location: "Amsterdam, NL",
    duration: "14 weeks",
    services: ["Brand", "Web Design", "Product Marketing"],
    liveUrl: "https://orbit-studio.example.com",
    about:
      "Brand and product launch site for a creative ops platform serving design studios — from solo freelancers to 50-person agencies.",
    challenge:
      "Orbit was building in a crowded market where most competitors compete on feature lists. They needed a brand that felt like a peer to design studios, not a vendor selling to them.",
    solution:
      "A confident, restrained brand and launch site that treats studios as collaborators. Real workflows, real screenshots, real numbers — no hero illustrations, no abstract metaphors.",
    takeaways:
      "When you sell to designers, design opinions are table stakes. Orbit's trial signups 2.4× in week one because the site felt made for them.",
    summary:
      "A brand and launch that turned 'another SaaS' into the platform creative leaders trust.",
    testimonial:
      "The site converts because it earns respect first. Studios sign up because they recognize themselves in it.",
    testimonialAuthor: "Lukas Brandt, Co-founder of Orbit",
    metrics: [
      { value: "2.4×", label: "trial signups" },
      { value: "+62%", label: "trial-to-paid" },
      { value: "8 days", label: "avg sales cycle" },
      { value: "94%", label: "logo recall" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Studio interviews",
        description:
          "Spoke with 18 design leaders to understand actual workflows.",
      },
      {
        title: "Strip the marketing voice",
        description:
          "Rewrote every page to sound like a working studio, not a SaaS pitch.",
      },
      {
        title: "Launch in waves",
        description:
          "Soft launch to insider list, public launch two weeks later.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  8. Ember Commerce                                                 */
  /* ---------------------------------------------------------------- */
  {
    id: "ember-commerce",
    slug: "ember-commerce",
    title: "Ember Commerce",
    year: "2025",
    tags: ["Web Design", "UX/UI"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/TearsOfSteel.mp4`,
    tone: "#22140e",
    href: "/work/ember-commerce",

    client: "Ember",
    industry: "DTC / Homeware",
    location: "Brooklyn, US",
    duration: "11 weeks",
    services: ["Headless Commerce", "Checkout UX", "Performance"],
    liveUrl: "https://ember-commerce.example.com",
    about:
      "Headless commerce storefront and checkout for a fast-growing DTC homeware label shipping 3,000+ orders per week.",
    challenge:
      "Ember was losing 38% of checkouts on mobile. Their Shopify theme couldn't handle their assortment, and page weight was destroying conversion on slower connections.",
    solution:
      "A headless storefront built on a custom React stack with edge-cached product data, a one-page checkout, and image performance tuned to the millisecond.",
    takeaways:
      "Commerce performance is conversion. Cutting LCP from 4.1s to 0.9s recovered $1.2M in annualized revenue.",
    summary:
      "A storefront rebuild that proved every saved millisecond shows up in revenue.",
    testimonial:
      "Our checkout rate went from 38% to 73%. That's not optimization, that's a different business.",
    testimonialAuthor: "Maya Patel, COO at Ember",
    metrics: [
      { value: "+92%", label: "checkout rate" },
      { value: "0.9s", label: "LCP" },
      { value: "+$1.2M", label: "annualized revenue" },
      { value: "73%", label: "mobile completion" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Performance audit",
        description:
          "Identified the 12 changes that would move conversion the most.",
      },
      {
        title: "Headless migration",
        description:
          "Moved off the theme to a custom React + edge-cached stack.",
      },
      {
        title: "Checkout rewrite",
        description:
          "One-page flow with smart defaults and Apple/Google Pay first.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  9. Kova AI                                                        */
  /* ---------------------------------------------------------------- */
  {
    id: "kova-ai",
    slug: "kova-ai",
    title: "Kova AI",
    year: "2024",
    tags: ["AI", "UX/UI"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/SubaruOutbackOnStreetAndDirt.mp4`,
    tone: "#0f0f1c",
    href: "/work/kova-ai",

    client: "Kova Legal",
    industry: "Legal Tech",
    location: "Chicago, US",
    duration: "18 weeks",
    services: ["AI Product Design", "Document Workflows", "Enterprise UX"],
    liveUrl: "https://kova-ai.example.com",
    about:
      "Internal copilot and document workflows for a 400-person legal operations team handling 80,000+ contracts annually.",
    challenge:
      "Kova's paralegals were spending 11 hours a week on repetitive document tasks. Their existing tools were either too generic or required workflows they couldn't trust.",
    solution:
      "A purpose-built copilot trained on their playbooks and templates, with strict citation requirements and a redline review surface that lawyers actually use.",
    takeaways:
      "Enterprise AI succeeds with verification, not with abstraction. Every Kova suggestion is traceable to a source clause — that's why adoption hit 91%.",
    summary:
      "A copilot that earned trust by showing its work — saving the team 11 hours per person per week.",
    testimonial:
      "I have never seen software adoption like this in legal tech. 91% weekly active in three months is unheard of.",
    testimonialAuthor: "Rachel Goldman, Director of Ops at Kova",
    metrics: [
      { value: "11h", label: "saved / week" },
      { value: "91%", label: "weekly active" },
      { value: "+44%", label: "throughput" },
      { value: "0", label: "compliance issues" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Workflow mapping",
        description:
          "Shadowed paralegals for two weeks to find the highest-ROI tasks.",
      },
      {
        title: "Citation-first design",
        description:
          "Every AI suggestion links to the source clause or playbook entry.",
      },
      {
        title: "Trust through rollout",
        description:
          "Small pilots, weekly check-ins, opt-in expansion across the firm.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  10. Fold Mobile                                                   */
  /* ---------------------------------------------------------------- */
  {
    id: "fold-mobile",
    slug: "fold-mobile",
    title: "Fold Mobile",
    year: "2024",
    tags: ["Mobile", "Motion Design"],
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/VolkswagenGTIReview.mp4`,
    tone: "#141a1c",
    href: "/work/fold-mobile",

    client: "Fold Finance",
    industry: "Fintech",
    location: "Stockholm, SE",
    duration: "14 weeks",
    services: ["iOS & Android", "Motion Design", "Brand"],
    liveUrl: "https://fold-mobile.example.com",
    about:
      "Native iOS and Android wallet experience focused on calm, deliberate money management for users who feel overwhelmed by traditional banking apps.",
    challenge:
      "Most banking apps gamify spending. Fold's audience wanted the opposite — clarity, calm, and friction in the right places to encourage thoughtful decisions.",
    solution:
      "A native app with deliberate motion design that slows down the user where it matters: spending, transferring, committing. Every haptic and animation is intentional.",
    takeaways:
      "Sometimes the right move is to add friction. Fold's users save 28% more than they did on their previous app.",
    summary:
      "A mobile app that proved 'delightful' and 'thoughtful' aren't the same thing — and the difference matters.",
    testimonial:
      "We get notes from customers thanking us for not being addictive. That's a metric I never expected to track.",
    testimonialAuthor: "Erik Lindberg, Head of Design at Fold",
    metrics: [
      { value: "4.8★", label: "App Store" },
      { value: "+28%", label: "user savings" },
      { value: "84%", label: "weekly active" },
      { value: "2.1", label: "sessions/day" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Research with savers",
        description:
          "Interviewed 40 users who felt anxious about their finances.",
      },
      {
        title: "Motion as friction",
        description:
          "Designed delays and confirmations that feel respectful, not annoying.",
      },
      {
        title: "Native everything",
        description:
          "Custom iOS and Android implementations — no cross-platform compromises.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  11. North Atlas                                                   */
  /* ---------------------------------------------------------------- */
  {
    id: "north-atlas",
    slug: "north-atlas",
    title: "North Atlas",
    year: "2023",
    tags: ["Branding"],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/WeAreGoingOnBullrun.mp4`,
    tone: "#141816",
    href: "/work/north-atlas",

    client: "North Atlas Foundation",
    industry: "Climate / Nonprofit",
    location: "Reykjavík, IS",
    duration: "9 weeks",
    services: ["Brand", "Editorial Design", "Web Platform"],
    liveUrl: "https://north-atlas.example.com",
    about:
      "Editorial-led brand and content platform for a climate research nonprofit publishing field reports from the Arctic.",
    challenge:
      "North Atlas had rigorous research but inconsistent presentation. Their reports were buried in PDFs and their reach was limited to climate insiders.",
    solution:
      "An editorial brand and platform that treats every report as a publishable feature. Long-form layouts, real data visualizations, and a quarterly print edition that funds the work.",
    takeaways:
      "Climate research needs to reach beyond climate audiences. Treating research as journalism grew their readership from 12k to 1.2M monthly.",
    summary:
      "A brand and platform that turned dense research into reading that people actually share.",
    testimonial:
      "We had funders we'd never heard from reach out after the new site launched. The brand opened doors we didn't know existed.",
    testimonialAuthor: "Dr. Sigrún Halldórsdóttir, Director at North Atlas",
    metrics: [
      { value: "1.2M", label: "monthly readers" },
      { value: "100×", label: "audience growth" },
      { value: "8", label: "new funders" },
      { value: "42", label: "press features" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1418489098061-ce87b5dc3aee?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Editorial system",
        description:
          "Templates for short dispatches, long features, and quarterly summaries.",
      },
      {
        title: "Data as story",
        description:
          "Custom charting library built around their specific datasets.",
      },
      {
        title: "Print that funds digital",
        description:
          "A quarterly publication that subsidizes the free online work.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  12. Harbor Studio                                                 */
  /* ---------------------------------------------------------------- */
  {
    id: "harbor-studio",
    slug: "harbor-studio",
    title: "Harbor Studio",
    year: "2025",
    tags: ["Web Design", "Motion Design"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ForBiggerMeltdowns.mp4`,
    tone: "#1a1814",
    href: "/work/harbor-studio",

    client: "Harbor",
    industry: "SaaS / Productivity",
    location: "Toronto, CA",
    duration: "13 weeks",
    services: ["Web Design", "Product UX", "Motion Design"],
    liveUrl: "https://harbor-studio.example.com",
    about:
      "Workspace and rituals platform helping remote creative teams run better design reviews, kickoffs, and retrospectives.",
    challenge:
      "Harbor was struggling to activate trial users. The product was powerful but onboarding felt like setup — teams gave up before reaching their first 'aha' moment.",
    solution:
      "An activation flow built around a single first ritual instead of feature tours. Teams run their first real review on day one — onboarding happens through doing, not reading.",
    takeaways:
      "Activation is about momentum, not feature awareness. Harbor's day-one team activation jumped 3× when we removed the tour entirely.",
    summary:
      "A product and onboarding redesign that proved less explanation creates more usage.",
    testimonial:
      "We removed our onboarding tour and our activation tripled. I still can't quite believe it worked.",
    testimonialAuthor: "Daniel Park, Product Lead at Harbor",
    metrics: [
      { value: "3×", label: "team activation" },
      { value: "+58%", label: "trial-to-paid" },
      { value: "Day 1", label: "first ritual" },
      { value: "0", label: "tour screens" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&q=80&auto=format&fit=crop",
    ],
    process: [
      {
        title: "Cut the tour",
        description:
          "Removed all explanatory screens and replaced them with a real first ritual.",
      },
      {
        title: "Default templates",
        description:
          "Pre-loaded teams with battle-tested ritual templates from real studios.",
      },
      {
        title: "Activation telemetry",
        description:
          "Instrumented every step so we could iterate weekly on drop-off points.",
      },
    ],
  },
];

export const projectFilters: ProjectCategory[] = [
  "Web Design",
  "Branding",
  "UX/UI",
  "Motion Design",
  "Mobile",
  "AI",
];

/* ------------------------------------------------------------------ */
/*  Selectors                                                           */
/* ------------------------------------------------------------------ */

export function getFeaturedProjects(limit = 4): Project[] {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));

  if (featured.length === 0) return projects.slice(0, limit);
  return featured.slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx + 1) % projects.length];
}

export function getPrevProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx - 1 + projects.length) % projects.length];
}
