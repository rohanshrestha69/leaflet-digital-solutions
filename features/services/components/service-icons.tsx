// features/services/components/service-icons.tsx
"use client";

import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Icon wrapper                                                       */
/* ------------------------------------------------------------------ */

type ServiceIconProps = {
  src: string;
  alt: string;
};

function ServiceIcon({ src, alt }: ServiceIconProps) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        priority={false}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Individual icon components                                         */
/* ------------------------------------------------------------------ */

export function CustomSoftwareIcon() {
  return (
    <ServiceIcon
      src="/icons/software-dev.svg"
      alt="Custom Software Development"
    />
  );
}

export function WebsiteDevIcon() {
  return (
    <ServiceIcon src="/icons/website-setup.svg" alt="Website Development" />
  );
}

export function MobileAppIcon() {
  return (
    <ServiceIcon src="/icons/mobile-app.svg" alt="Mobile App Development" />
  );
}

export function AIAutomationIcon() {
  return (
    <ServiceIcon src="/icons/ai-data-extraction.svg" alt="AI Automation" />
  );
}

export function UIUXDesignIcon() {
  return <ServiceIcon src="/icons/ui-ux.svg" alt="UI/UX Design" />;
}

export function SEOGrowthIcon() {
  return <ServiceIcon src="/icons/seo.svg" alt="SEO & Digital Growth" />;
}

/* ------------------------------------------------------------------ */
/*  Registry                                                           */
/* ------------------------------------------------------------------ */

export const serviceIconMap: Record<string, React.ComponentType> = {
  "custom-software": CustomSoftwareIcon,
  "website-development": WebsiteDevIcon,
  "mobile-development": MobileAppIcon,
  "ai-automation": AIAutomationIcon,
  "ui-ux-design": UIUXDesignIcon,
  "seo-growth": SEOGrowthIcon,
};
