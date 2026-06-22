import { AboutPage } from "@/features/about-us/pages/about-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Leaflet Digital",
  description:
    "Leaflet is a global network of elite remote talent, delivering enterprise-grade digital experiences with startup agility.",
  openGraph: {
    title: "About — Leaflet Digital",
    description: "Our story, mission, and the people behind the studio.",
  },
};

export default function Page() {
  return <AboutPage />;
}
