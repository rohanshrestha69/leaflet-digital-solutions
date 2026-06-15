// features/contact/components/contact-page.tsx
"use client"

import { useState, useCallback, useId } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Users,
  Sparkles,
  Layers,
  Send,
  CheckCircle2,
  Check,
} from "lucide-react"
import { motion, type Variants } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ease, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

const ENGAGEMENT_OPTIONS = [
  {
    icon: Users,
    title: "Augment my existing team",
    body: "Senior engineers embedded in your workflow to expand capacity.",
  },
  {
    icon: Sparkles,
    title: "I have a new project",
    body: "End-to-end design and development from idea to production.",
  },
  {
    icon: Layers,
    title: "Dedicated team for my project",
    body: "A cross-functional squad fully focused on your outcomes.",
  },
] as const

const SERVICE_TAGS = [
  "Product Development",
  "Web Applications",
  "Mobile Apps",
  "AI & Automation",
  "UI/UX Design",
  "DevOps & Cloud",
  "Staff Augmentation",
] as const

const CONTACT_INFO = [
  { icon: Phone, label: "(800) 815-2044", href: "tel:+18008152044" },
  { icon: Mail, label: "hello@leaflet.studio", href: "mailto:hello@leaflet.studio" },
  { icon: MapPin, label: "Remote-first · Global team", href: undefined },
] as const

const OFFICES = [
  {
    city: "Kathmandu",
    address: "Babar Mahal, Kathmandu 44600",
    image: "https://www.contiki.com/media/jysjppxo/gettyimages-546569926-1.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=1920&height=1720&quality=80",
  },
  {
    city: "Chitwan",
    address: "Khairahani-8, Parsa",
    image: "https://www.contiki.com/media/urxbhf23/jeep-safari-chitwan-national-park-nepal-1.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=1100&height=550&quality=80",
  },
  {
    city: "Melbourne",
    address: "Level 5, 123 Collins St, Melbourne VIC 3000",
    image: "https://www.contiki.com/media/vcfbkj0e/getty-693631434-1-1-9.jpg?center=0.5%2C0.5&format=webp&mode=crop&width=1920&height=1720&quality=80",
  },
] as const

const COUNTRIES = [
  "Nepal", "United States", "United Kingdom", "Canada",
  "Australia", "Germany", "Switzerland", "India", "Other",
] as const

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const sectionV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const itemV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
}

const formV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

const formItemV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
}

const gridV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <HeroSection />
      <FormSection />
      <OfficesSection />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="relative border-b border-[var(--border)]">
      <Container wide className="pb-16 pt-32 md:pb-24 md:pt-40">
        <motion.div
          variants={sectionV}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <motion.div variants={itemV} className="max-w-3xl">
            <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)]">
              Get in touch
            </span>
            <h1 className="mt-5 font-heading text-[36px] font-semibold leading-[1.05] tracking-tight text-[var(--text)] sm:text-[52px] md:text-[68px] lg:text-[80px]">
              Let&apos;s build
              <br />
              <span className="text-[var(--text-muted)]">something together.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]">
              Whether you&apos;re launching a new product or scaling an existing
              one — drop us a note and we&apos;ll reply within two business days.
            </p>
          </motion.div>

          <motion.div variants={itemV} className="flex flex-wrap items-center gap-3">
            <a
              href="#form"
              className={cn(buttonVariants({ variant: "orange", size: "lg" }), "gap-2")}
            >
              Start a conversation
              <ArrowUpRight className="size-4" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Form section                                */
/* -------------------------------------------------------------------------- */

function FormSection() {
  return (
    <section
      id="form"
      className="relative border-b border-[var(--border)] py-20 md:py-28"
    >
      <Container wide>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <aside className="order-2 self-start lg:order-1 lg:sticky lg:top-24">
            <InfoColumn />
          </aside>
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Info column                                 */
/* -------------------------------------------------------------------------- */

function InfoColumn() {
  return (
    <motion.div
      variants={sectionV}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
      className="flex flex-col gap-8"
    >
      {/* Image */}
      <motion.div
        variants={itemV}
        className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]"
      >
        <Image
          src="https://images.pexels.com/photos/9489091/pexels-photo-9489091.jpeg"
          alt="Team collaboration at Leaflet Digital Solutions"
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="h-[280px] w-full object-cover sm:h-[400px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/40 to-transparent"
        />
      </motion.div>

      {/* Contact info */}
      <motion.div variants={itemV} className="flex flex-col gap-5">
        <div>
          <h2 className="font-heading text-[24px] font-semibold leading-tight tracking-tight text-[var(--text)] md:text-[32px]">
            Prefer a quick chat?
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
            Available Monday to Friday, US business hours.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {CONTACT_INFO.map((item) => (
            <InfoRow key={item.label} icon={item.icon} label={item.label} href={item.href} />
          ))}
        </div>
      </motion.div>

      {/* Careers */}
      <motion.div
        variants={itemV}
        className={cn(
          "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40 p-6",
          "transition-colors duration-300 ease-[var(--ease-premium)] hover:border-[var(--border-strong)]"
        )}
      >
        <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          02 — Careers
        </span>
        <h3 className="mt-3 font-heading text-[20px] font-semibold tracking-tight text-[var(--text)]">
          Looking for a job?
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
          We&apos;re always hiring curious builders. Even if nothing fits today,
          we&apos;ll keep you in the loop.
        </p>
        <Link
          href="/careers"
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)] transition-colors duration-200 hover:text-[var(--brand)]"
        >
          Apply now
          <ArrowUpRight className="size-3.5" />
        </Link>
      </motion.div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Contact form                                */
/* -------------------------------------------------------------------------- */

function ContactForm() {
  const id = useId()
  const [engagement, setEngagement] = useState(1)
  const [services, setServices] = useState<string[]>(["Product Development"])
  const [submitted, setSubmitted] = useState(false)

  const toggleService = useCallback((tag: string) => {
    setServices((prev) =>
      prev.includes(tag) ? prev.filter((s) => s !== tag) : [...prev, tag]
    )
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }, [])

  if (submitted) return <FormSuccess />

  return (
    <motion.form
      variants={formV}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
      onSubmit={handleSubmit}
      className={cn(
        "relative rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40 p-7 md:p-10",
        "transition-colors duration-300 ease-[var(--ease-premium)] hover:border-[var(--border-strong)]"
      )}
    >
      {/* Header */}
      <motion.div variants={formItemV}>
        <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)]">
          Project inquiry
        </span>
        <h2 className="mt-4 font-heading text-[26px] font-semibold leading-tight tracking-tight text-[var(--text)] md:text-[34px]">
          Tell us about your project
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
          We&apos;ll respond within two business days.
        </p>
      </motion.div>

      {/* Name + Email */}
      <motion.div variants={formItemV} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your full name" htmlFor={`${id}-name`}>
          <Input
            id={`${id}-name`}
            name="name"
            placeholder="John Smith"
            required
            className="h-12 border-[var(--border)] bg-[var(--background)] text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] hover:border-[var(--border-strong)] focus:border-[var(--brand-border)] focus:ring-2 focus:ring-[var(--brand)]/15"
          />
        </Field>
        <Field label="Your email address" hint="We won't send you spam." htmlFor={`${id}-email`}>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-12 border-[var(--border)] bg-[var(--background)] text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] hover:border-[var(--border-strong)] focus:border-[var(--brand-border)] focus:ring-2 focus:ring-[var(--brand)]/15"
          />
        </Field>
      </motion.div>

      {/* Engagement model */}
      <motion.div variants={formItemV} className="mt-10">
        <FieldLabel>How do you want to work with us?</FieldLabel>
        <FieldHint>Choose the engagement model that fits best.</FieldHint>
        <div className="mt-5 flex flex-col gap-2.5">
          {ENGAGEMENT_OPTIONS.map((opt, i) => (
            <EngagementOption
              key={opt.title}
              option={opt}
              active={engagement === i}
              onSelect={() => setEngagement(i)}
            />
          ))}
        </div>
      </motion.div>

      {/* Services */}
      <motion.div variants={formItemV} className="mt-10">
        <FieldLabel>What services do you need?</FieldLabel>
        <FieldHint>Select all that apply.</FieldHint>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Services">
          {SERVICE_TAGS.map((tag) => (
            <ServiceTag
              key={tag}
              label={tag}
              active={services.includes(tag)}
              onToggle={() => toggleService(tag)}
            />
          ))}
        </div>
      </motion.div>

      {/* Country + Phone */}
      <motion.div variants={formItemV} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-[200px_1fr]">
        <Field label="Country" htmlFor={`${id}-country`}>
          <Select name="country" defaultValue="Nepal">
            <SelectTrigger id={`${id}-country`} className="h-12 border-[var(--border)] bg-[var(--background)] text-[14px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Phone number" htmlFor={`${id}-phone`}>
          <Input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="h-12 border-[var(--border)] bg-[var(--background)] text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] hover:border-[var(--border-strong)] focus:border-[var(--brand-border)] focus:ring-2 focus:ring-[var(--brand)]/15"
          />
        </Field>
      </motion.div>

      {/* Message */}
      <motion.div variants={formItemV} className="mt-8">
        <Field label="Tell us about your project" htmlFor={`${id}-msg`}>
          <Textarea
            id={`${id}-msg`}
            name="message"
            rows={5}
            placeholder="I'm looking to build a..."
            required
            className="w-full resize-y rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors duration-200 hover:border-[var(--border-strong)] focus:border-[var(--brand-border)] focus:ring-2 focus:ring-[var(--brand)]/15"
          />
        </Field>
      </motion.div>

      {/* Submit */}
      <motion.div variants={formItemV} className="mt-10">
        <button
          type="submit"
          className={cn(buttonVariants({ variant: "orange", size: "lg" }), "w-full gap-2 sm:w-auto")}
        >
          Send message
          <Send className="size-4" />
        </button>
      </motion.div>
    </motion.form>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Form success                                */
/* -------------------------------------------------------------------------- */

function FormSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: ease.out }}
      className={cn(
        "flex min-h-[500px] flex-col items-center justify-center text-center",
        "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40 p-10"
      )}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: ease.bouncy, delay: 0.1 }}
        className="mb-6 flex size-16 items-center justify-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
      >
        <CheckCircle2 className="size-7" />
      </motion.div>
      <h3 className="font-heading text-[26px] font-semibold tracking-tight text-[var(--text)]">
        Message sent
      </h3>
      <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[var(--text-muted)]">
        Thanks for reaching out — we&apos;ll get back to you within two business days.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outlineDark", size: "lg" }), "mt-8 gap-2")}
      >
        Back to home
        <ArrowUpRight className="size-4" />
      </Link>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Engagement option                             */
/* -------------------------------------------------------------------------- */

function EngagementOption({
  option,
  active,
  onSelect,
}: {
  option: (typeof ENGAGEMENT_OPTIONS)[number]
  active: boolean
  onSelect: () => void
}) {
  const Icon = option.icon

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.12, ease: ease.smooth }}
      className={cn(
        "group flex w-full items-start gap-4 rounded-[var(--radius-xl)] border p-4 text-left",
        "transition-[background-color,border-color] duration-200 ease-[var(--ease-premium)]",
        active
          ? "border-[var(--brand-border)] bg-[var(--brand)]/10"
          : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--border-strong)]"
      )}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
          active
            ? "border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
            : "border-[var(--border)] bg-[var(--background)] text-[var(--text-muted)] group-hover:text-[var(--text)]"
        )}
      >
        <Icon className="size-4" strokeWidth={2} />
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[14px] font-medium text-[var(--text)]">{option.title}</span>
        <span className="mt-1 text-[13px] leading-relaxed text-[var(--text-muted)]">{option.body}</span>
      </span>

      <span
        className={cn(
          "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
          active
            ? "border-[var(--brand)] bg-[var(--brand)] text-white"
            : "border-[var(--border)] bg-transparent text-transparent"
        )}
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
    </motion.button>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Service tag                                 */
/* -------------------------------------------------------------------------- */

function ServiceTag({
  label,
  active,
  onToggle,
}: {
  label: string
  active: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.12, ease: ease.smooth }}
      className={cn(
        "rounded-full border px-4 py-2 text-[13px] font-medium",
        "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-premium)]",
        active
          ? "border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
          : "border-[var(--border)] bg-[var(--background)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
      )}
    >
      {label}
    </motion.button>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Offices                                   */
/* -------------------------------------------------------------------------- */

function OfficesSection() {
  return (
    <section className="relative py-20 md:py-28">
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
        >
          <motion.div
            variants={itemV}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              We&apos;re happy to chat
              <br />
              in person too.
            </SectionHeading>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-right">
              Drop by one of our offices for a coffee — we&apos;d love to meet you.
            </p>
          </motion.div>

          <motion.div
            variants={gridV}
            className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {OFFICES.map((office, index) => (
              <OfficeCard key={office.city} office={office} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

function OfficeCard({
  office,
  index,
}: {
  office: (typeof OFFICES)[number]
  index: number
}) {
  const number = String(index + 1).padStart(2, "0")

  return (
    <motion.article
      variants={itemV}
      className={cn(
        "group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40",
        "transition-colors duration-300 ease-[var(--ease-premium)] hover:border-[var(--border-strong)]"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={office.image}
          alt={`${office.city} office`}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/80 via-transparent to-transparent"
        />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/[0.1] bg-[var(--background)]/70 px-3 py-1.5 font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-muted)] backdrop-blur-md">
          {number}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-[18px] font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--brand)]">
          {office.city}
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-muted)]">
          {office.address}
        </p>
      </div>
    </motion.article>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Shared primitives                             */
/* -------------------------------------------------------------------------- */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading text-[16px] font-semibold text-[var(--text)] md:text-[17px]">
      {children}
    </p>
  )
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-[13px] text-[var(--text-muted)]">{children}</p>
}

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string
  hint?: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[13px] font-medium text-[var(--text)]">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-[12px] text-[var(--text-subtle)]">{hint}</p>}
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href?: string
}) {
  const content = (
    <span className="flex items-center gap-3">
      <span
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
          "border border-[var(--border)] bg-[var(--background)] text-[var(--text-muted)]",
          "transition-colors duration-200",
          "group-hover:border-[var(--brand-border)] group-hover:bg-[var(--brand)]/10 group-hover:text-[var(--brand)]"
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="text-[14px] text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--brand)]">
        {label}
      </span>
    </span>
  )

  if (href) {
    return (
      <a href={href} className="group block rounded-md py-2 transition-colors duration-200">
        {content}
      </a>
    )
  }

  return <div className="group block py-2">{content}</div>
}