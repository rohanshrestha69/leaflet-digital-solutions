import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"

import { cn } from "@/lib/utils"
import { MotionProvider } from "@/components/animations/motion-provider"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { GoToTop } from "@/components/layout/go-to-top"

/* -------------------------------------------------------------------------- */
/*                                    Fonts                                   */
/* -------------------------------------------------------------------------- */

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.ttf",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-VariableItalic.ttf",
      weight: "300 900",
      style: "italic",
    },
  ],

  variable: "--font-satoshi",

  display: "optional",

  preload: true,

  fallback: ["system-ui", "sans-serif"],
})

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://leafletdigitalsolutions.com"),

  title: {
    default:
      "Leaflet Digital Solutions | Web Development, Apps & AI Automation",

    template: "%s | Leaflet Digital Solutions",
  },

  description:
    "Leaflet Digital Solutions helps businesses design, develop, and launch websites, mobile apps, dashboards, automation tools, and digital growth systems that improve operations, build trust, and generate qualified leads.",
}

/* -------------------------------------------------------------------------- */
/*                                  Layout                                    */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "scroll-smooth",
        "text-white",
        "antialiased",
        "[text-rendering:optimizeLegibility]",
        "[font-synthesis:none]",
        satoshi.variable,
        "font-sans"
      )}
    >
      <body
        className={cn(
          "min-h-full",
          "overflow-x-clip",
          "text-[var(--text)]"
        )}
      >
        <MotionProvider>
          <div className="relative isolate">
            <SiteHeader />

            <main className="relative z-10">
              {children}
            </main>

            <SiteFooter />

            <GoToTop />
          </div>
        </MotionProvider>
      </body>
    </html>
  )
}

