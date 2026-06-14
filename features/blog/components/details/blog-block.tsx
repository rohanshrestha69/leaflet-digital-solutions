"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Info, Sparkles, AlertTriangle } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import type {
  BlogButtonsBlock,
  BlogCalloutBlock,
  BlogCodeBlock,
  BlogContentBlock,
  BlogDividerBlock,
  BlogFaqBlock,
  BlogGalleryBlock,
  BlogHeadingBlock,
  BlogImageBlock,
  BlogListBlock,
  BlogQuoteBlock,
  BlogTextBlock,
  BlogVideoBlock,
} from "@/features/marketing/data/blog-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

/* -------------------------------------------------------------------------- */
/*                                  Dispatcher                                */
/* -------------------------------------------------------------------------- */

export function BlogBlock({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />
    case "heading":
      return <HeadingBlock block={block} />
    case "image":
      return <ImageBlock block={block} />
    case "gallery":
      return <GalleryBlock block={block} />
    case "quote":
      return <QuoteBlock block={block} />
    case "list":
      return <ListBlock block={block} />
    case "callout":
      return <CalloutBlock block={block} />
    case "code":
      return <CodeBlock block={block} />
    case "buttons":
      return <ButtonsBlock block={block} />
    case "video":
      return <VideoBlock block={block} />
    case "faq":
      return <FaqBlock block={block} />
    case "divider":
      return <DividerBlock block={block} />
    default:
      return null
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Text                                    */
/* -------------------------------------------------------------------------- */

function TextBlock({ block }: { block: BlogTextBlock }) {
  const paragraphs = Array.isArray(block.body) ? block.body : [block.body]

  return (
    <div className="flex flex-col gap-5">
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[17px] md:leading-[1.8]"
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Heading                                   */
/* -------------------------------------------------------------------------- */

function HeadingBlock({ block }: { block: BlogHeadingBlock }) {
  const Tag = `h${block.level ?? 3}` as "h2" | "h3" | "h4"
  const sizeClass =
    block.level === 2
      ? "text-[22px] md:text-[28px]"
      : block.level === 4
        ? "text-[17px] md:text-[19px]"
        : "text-[19px] md:text-[22px]"

  return (
    <Tag
      id={block.id}
      className={cn(
        "scroll-mt-28 font-heading font-semibold tracking-tight text-[var(--text)]",
        sizeClass
      )}
    >
      {block.text}
    </Tag>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    Image                                   */
/* -------------------------------------------------------------------------- */

function ImageBlock({ block }: { block: BlogImageBlock }) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)]",
          block.aspect ?? "aspect-[16/9]"
        )}
      >
        <Image
          src={block.src}
          alt={block.alt}
          fill
          sizes="(min-width: 1024px) 65vw, 100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>
      {block.caption && (
        <figcaption className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Gallery                                   */
/* -------------------------------------------------------------------------- */

function GalleryBlock({ block }: { block: BlogGalleryBlock }) {
  const cols = block.columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"

  return (
    <div className={cn("grid grid-cols-1 gap-4 md:gap-5", cols)}>
      {block.images.map((img, i) => (
        <div
          key={i}
          className={cn(
            "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)]",
            "border border-[var(--border)]",
            "transition-colors duration-300 ease-[var(--ease-premium)]",
            "hover:border-[var(--border-strong)]"
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 ease-[var(--ease-premium)] hover:scale-[1.04]"
          />
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Quote                                    */
/* -------------------------------------------------------------------------- */

function QuoteBlock({ block }: { block: BlogQuoteBlock }) {
  return (
    <blockquote
      className={cn(
        "flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40",
        "p-8 md:p-10"
      )}
    >
      <p className="font-heading text-[20px] font-medium leading-snug tracking-tight text-[var(--text)] md:text-[26px]">
        <span className="text-[var(--brand)]">&ldquo;</span>
        {block.text}
        <span className="text-[var(--brand)]">&rdquo;</span>
      </p>
      {block.author && (
        <cite className="font-mono text-[10px] uppercase not-italic tracking-[0.22em] text-[var(--text-subtle)]">
          — {block.author}
        </cite>
      )}
    </blockquote>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    List                                    */
/* -------------------------------------------------------------------------- */

function ListBlock({ block }: { block: BlogListBlock }) {
  const Tag = block.ordered ? "ol" : "ul"

  return (
    <Tag className="flex flex-col gap-3 pl-0">
      {block.items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[17px]"
        >
          {block.ordered ? (
            <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10 font-mono text-[11px] font-semibold text-[var(--brand)]">
              {i + 1}
            </span>
          ) : (
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
          )}
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </Tag>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Callout                                   */
/* -------------------------------------------------------------------------- */

function CalloutBlock({ block }: { block: BlogCalloutBlock }) {
  const variant = block.variant ?? "info"

  const variantStyles = {
    info: {
      border: "border-[var(--border)]",
      bg: "bg-[var(--card)]/40",
      icon: "text-[var(--text-muted)]",
      iconBg: "bg-[var(--background)]",
      iconBorder: "border-[var(--border)]",
    },
    brand: {
      border: "border-[var(--brand-border)]",
      bg: "bg-[var(--brand)]/[0.06]",
      icon: "text-[var(--brand)]",
      iconBg: "bg-[var(--brand)]/10",
      iconBorder: "border-[var(--brand-border)]",
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/[0.04]",
      icon: "text-amber-400",
      iconBg: "bg-amber-500/10",
      iconBorder: "border-amber-500/30",
    },
  } as const

  const styles = variantStyles[variant]
  const Icon =
    variant === "warning" ? AlertTriangle : variant === "brand" ? Sparkles : Info

  return (
    <aside
      className={cn(
        "flex gap-4 rounded-[var(--radius-xl)] border p-6 md:p-7",
        styles.border,
        styles.bg
      )}
    >
      <div
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-full border",
          styles.iconBg,
          styles.iconBorder,
          styles.icon
        )}
      >
        <Icon className="size-4" strokeWidth={2.25} />
      </div>
      <div className="flex flex-col gap-2">
        {block.title && (
          <p className="font-heading text-[15px] font-semibold tracking-tight text-[var(--text)] md:text-[16px]">
            {block.title}
          </p>
        )}
        <p className="text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
          {block.body}
        </p>
      </div>
    </aside>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    Code                                    */
/* -------------------------------------------------------------------------- */

function CodeBlock({ block }: { block: BlogCodeBlock }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/60"
      )}
    >
      {block.language && (
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            {block.language}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto px-5 py-5 text-[13px] leading-relaxed text-[var(--text)] md:text-[14px]">
        <code className="font-mono">{block.code}</code>
      </pre>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Buttons                                   */
/* -------------------------------------------------------------------------- */

function ButtonsBlock({ block }: { block: BlogButtonsBlock }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {block.actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener noreferrer" : undefined}
          className={cn(
            buttonVariants({
              variant: action.variant ?? "orange",
              size: "lg",
            }),
            "gap-2"
          )}
        >
          {action.label}
          <ArrowUpRight className="size-4" />
        </Link>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Video                                    */
/* -------------------------------------------------------------------------- */

function VideoBlock({ block }: { block: BlogVideoBlock }) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]"
        )}
      >
        <video
          src={block.src}
          poster={block.poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
      {block.caption && (
        <figcaption className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    FAQ                                     */
/* -------------------------------------------------------------------------- */

function FaqBlock({ block }: { block: BlogFaqBlock }) {
  const [openFaq, setOpenFaq] = useState<string[]>(["faq-0"])

  return (
    <div className="flex flex-col gap-6">
      {block.title && (
        <h3 className="font-heading text-[22px] font-semibold tracking-tight text-[var(--text)] md:text-[26px]">
          {block.title}
        </h3>
      )}

      <div className="border-t border-[var(--border)]">
        <Accordion value={openFaq} onValueChange={setOpenFaq}>
          {block.faqs.map((faq, i) => {
            const number = String(i + 1).padStart(2, "0")
            return (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="border-b border-[var(--border)]"
              >
                <AccordionTrigger
                  className={cn(
                    "group flex w-full items-start gap-5 py-5 text-left no-underline",
                    "transition-colors duration-300 ease-[var(--ease-premium)]",
                    "hover:no-underline data-[state=open]:text-[var(--brand)]"
                  )}
                >
                  <span className="mt-1 font-mono text-[11px] tabular-nums tracking-[0.18em] text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)]">
                    {number}
                  </span>
                  <span className="flex-1 font-heading text-[16px] font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--brand)] group-data-[state=open]:text-[var(--brand)] md:text-[18px]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-[40px] pr-4 text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  <p className="max-w-2xl">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Divider                                   */
/* -------------------------------------------------------------------------- */

function DividerBlock({ block: _block }: { block: BlogDividerBlock }) {
  return (
    <div
      aria-hidden
      className="my-4 flex items-center justify-center"
    >
      <span className="inline-flex h-1 w-1 rounded-full bg-[var(--brand)]" />
      <span className="mx-1.5 inline-flex h-1 w-1 rounded-full bg-[var(--brand)]/60" />
      <span className="inline-flex h-1 w-1 rounded-full bg-[var(--brand)]/30" />
    </div>
  )
}