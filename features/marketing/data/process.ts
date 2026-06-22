import type { ProcessStep } from "../types";

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    index: "01",
    label: "Discovery",
    title: "Review client brief & scope of work",
    description:
      "We understand your goals, requirements, and challenges in detail.",
  },
  {
    id: "planning",
    number: "02",
    index: "02",
    label: "Planning",
    title: "Map the strategy & milestones",
    description:
      "We define scope, architecture, timeline, and technical approach.",
  },
  {
    id: "design",
    number: "03",
    index: "03",
    label: "Design",
    title: "Craft clean, conversion-focused UI",
    description:
      "We design professional interfaces that feel trustworthy, easy to understand, responsive, and aligned with your brand.",
  },
  {
    id: "development",
    number: "04",
    index: "04",
    label: "Development",
    title: "Build scalable production code",
    description:
      "We develop clean, maintainable, responsive, and production-ready websites using modern technologies and best practices.",
  },
  {
    id: "test&launch",
    number: "05",
    index: "05",
    label: "Testing & Launch",
    title: "Validate quality across devices",
    description:
      "We ensure stability, performance, and readiness before deployment.",
  },
  {
    id: "support&growth",
    number: "06",
    index: "06",
    label: "Support & Growth",
    title: "Improve, maintain & optimize",
    description:
      "We continue supporting improvements, scaling, and feature updates.",
  },
];
