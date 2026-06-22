// app/book/page.tsx
import { BookingPage } from "@/features/booking/pages/booking-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Meeting",
  description:
    "Schedule a discovery call with Leaflet. Pick the conversation you want, choose a slot, and tell us about your project.",
  openGraph: {
    title: "Book a Meeting — Leaflet Digital Solutions",
    description:
      "Schedule a discovery call with Leaflet. Pick the conversation you want, choose a slot, and tell us about your project.",
  },
};

export default function Page() {
  return <BookingPage />;
}
