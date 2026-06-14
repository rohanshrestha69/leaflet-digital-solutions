"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Globe } from "lucide-react"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  directors,
  leadership,
  type TeamMember,
} from "@/features/marketing/data/about-data"
import { sectionViewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import {
  sectionContainer,
  itemVariants,
  gridContainer,
  tileVariants,
} from "./about-variants"
import { LiaLinkedin } from "react-icons/lia"

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function AboutTeam() {
  return (
    <section className="relative border-b border-[var(--border)] py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              World-class people,
              <br />
              building work that lasts.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              A small, senior team backed by a global network of specialists
              across design, engineering, and growth.
            </p>
          </motion.div>

          {/* Leadership */}
          <motion.div
            variants={gridContainer}
            className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6"
          >
            {leadership.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </motion.div>

          {/* Directors */}
          <motion.div
            variants={gridContainer}
            className="mt-5 grid gap-5 md:mt-6 md:grid-cols-3 md:gap-6"
          >
            {directors.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </motion.div>

          {/* Network spotlight */}
<motion.div
  variants={gridContainer}
  className="mt-5 grid gap-5 md:mt-6 md:grid-cols-3 md:gap-6"
>
  {/* Left image */}
  <motion.div
    variants={tileVariants}
    className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] md:col-span-1 md:min-h-[320px]"
  >
    <Image
      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop"
      alt="Global team collaboration"
      fill
      sizes="(min-width: 1024px) 33vw, 100vw"
      className="object-cover"
    />
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent"
    />

    {/* Floating badge */}
    <div className="absolute bottom-4 left-4 right-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[var(--background)]/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-[var(--brand)]" />
        14 countries
      </span>
    </div>
  </motion.div>

  {/* Right network card */}
  <motion.article
    variants={tileVariants}
    className={cn(
      "group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)]",
      "border border-[var(--brand-border)] bg-[var(--brand)]/[0.04]",
      "p-6 md:p-8 md:col-span-2 md:min-h-[320px]",
      "transition-colors duration-300"
    )}
  >
    {/* Top row: eyebrow + icon */}
    <div className="flex items-center justify-between">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--brand)]">
        The network
      </span>
      <span className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]">
        <Globe className="size-3.5" strokeWidth={2} />
      </span>
    </div>

    {/* Main content — centered vertically */}
    <div className="my-auto flex flex-col gap-4 py-6 md:py-8">
      <div className="flex items-baseline gap-2.5">
        <span className="font-heading text-[48px] font-semibold leading-none tracking-tight text-[var(--brand)] md:text-[64px] lg:text-[72px]">
          120+
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          specialists
        </span>
      </div>

      <p className="max-w-md text-[13px] leading-relaxed text-[var(--text-muted)] md:text-[14px]">
        Designers, engineers, writers, and strategists across 14 countries —
        the global Leaflet network behind every project.
      </p>
    </div>

    {/* Bottom: stats + CTA */}
    <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-4 sm:flex-row sm:items-end sm:justify-between">
      {/* Mini stats */}
      <div className="flex items-center gap-5 sm:gap-6">
        <MiniStat value="14" label="Countries" />
        <span className="h-6 w-px bg-[var(--border)]" />
        <MiniStat value="6" label="Disciplines" />
        <span className="h-6 w-px bg-[var(--border)]" />
        <MiniStat value="24/7" label="Coverage" />
      </div>

      <Link
        href="https://linkedin.com/company/leaflet-digital"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group/cta inline-flex w-fit items-center gap-1.5 rounded-full",
          "border border-[var(--brand-border)] bg-[var(--brand)]/10 px-3.5 py-1.5",
          "text-[12px] font-medium text-[var(--brand)]",
          "transition-all duration-300 ease-[var(--ease-premium)]",
          "hover:bg-[var(--brand)]/20 hover:gap-2"
        )}
      >
        View on LinkedIn
        <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
      </Link>
    </div>

    {/* Subtle radial glow */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(248,130,33,0.1),transparent_55%)]"
    />
  </motion.article>
</motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 Team card                                  */
/* -------------------------------------------------------------------------- */

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.article
      variants={tileVariants}
      className={cn(
        "group flex flex-col gap-6 rounded-[var(--radius-xl)]",
        "border border-[var(--border)] bg-[var(--card)]/40 p-6 md:p-7",
        "transition-colors duration-300 ease-[var(--ease-premium)]",
        "hover:border-[var(--border-strong)]"
      )}
    >
      {/* Avatar */}
      <div className="relative size-20 overflow-hidden rounded-full border border-[var(--border)]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-110"
        />
      </div>

      {/* Name + role */}
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-[18px] font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--brand)] md:text-[20px]">
          {member.name}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          {member.role}
        </p>
      </div>

      {/* Bio */}
      <p className="text-[13px] leading-relaxed text-[var(--text-muted)] md:text-[14px]">
        {member.bio}
      </p>

      {/* LinkedIn */}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className={cn(
            "mt-auto inline-flex size-9 items-center justify-center rounded-full",
            "border border-[var(--border)] text-[var(--text-muted)]",
            "transition-all duration-300 ease-[var(--ease-premium)]",
            "hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]"
          )}
        >
          <LiaLinkedin className="size-3.5" />
        </a>
      )}
    </motion.article>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 Mini stat                                  */
/* -------------------------------------------------------------------------- */

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-heading text-[18px] font-semibold tracking-tight text-[var(--text)] md:text-[20px]">
        {value}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        {label}
      </span>
    </div>
  )
}