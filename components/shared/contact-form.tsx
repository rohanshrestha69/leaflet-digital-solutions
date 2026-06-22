// components/shared/contact-form.tsx
"use client";

import { useCallback, useId, useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type ContactFormService =
  | "Branding"
  | "Website Design"
  | "UX/UI"
  | "Motion Design"
  | "Landing Page"
  | "Content Creation"
  | "Web Development"
  | "SEO";

export type ContactFormBudget =
  | "< $10k"
  | "$10k – $30k"
  | "$30k – $80k"
  | "$80k+";

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: ContactFormService[];
  budget: ContactFormBudget | null;
  message: string;
};

type ContactFormProps = {
  eyebrow?: string;
  heading?: React.ReactNode;
  description?: string;
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  services?: ContactFormService[];
  budgets?: ContactFormBudget[];
  id?: string;
  noBorder?: boolean;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/*                                  Defaults                                  */
/* -------------------------------------------------------------------------- */

const DEFAULT_SERVICES: ContactFormService[] = [
  "Branding",
  "Website Design",
  "UX/UI",
  "Motion Design",
  "Landing Page",
  "Content Creation",
  "Web Development",
  "SEO",
];

const DEFAULT_BUDGETS: ContactFormBudget[] = [
  "< $10k",
  "$10k – $30k",
  "$30k – $80k",
  "$80k+",
];

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const sectionV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: ease.out },
  },
};

const fieldV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.out },
  },
};

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function ContactForm({
  eyebrow = "Start a conversation",
  heading = (
    <>
      Tell us about
      <br />
      <span className="text-[var(--text-muted)]">your next stage.</span>
    </>
  ),
  description = "Share a few details and we'll get back to you within two business days. The more context you give us, the better our first response will be.",
  onSubmit,
  services = DEFAULT_SERVICES,
  budgets = DEFAULT_BUDGETS,
  id,
  noBorder = false,
  className,
}: ContactFormProps) {
  const formId = useId();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<
    ContactFormService[]
  >([]);
  const [budget, setBudget] = useState<ContactFormBudget | null>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleService = useCallback((s: ContactFormService) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      await onSubmit?.({
        name,
        company,
        email,
        phone,
        services: selectedServices,
        budget,
        message,
      });
      setSubmitted(true);
    },
    [name, company, email, phone, selectedServices, budget, message, onSubmit],
  );

  if (submitted) return <ContactFormSuccess id={id} noBorder={noBorder} />;

  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28",
        !noBorder && "border-b border-[var(--border)]",
        className,
      )}
    >
      <Container wide>
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="show"
          viewport={viewport.section}
          className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
        >
          {/* Left — heading */}
          <motion.div
            variants={itemV}
            className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start"
          >
            <span className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--brand)]">
              {eyebrow}
            </span>
            <SectionHeading>{heading}</SectionHeading>
            {description && (
              <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]">
                {description}
              </p>
            )}
          </motion.div>

          {/* Right — form */}
          <motion.form
            variants={itemV}
            onSubmit={handleSubmit}
            className={cn(
              "flex flex-col gap-10 rounded-[var(--radius-xl)]",
              "border border-[var(--border)] bg-[var(--card)]/40 p-7 md:p-10",
              "transition-[border-color] duration-300 ease-[var(--ease-premium)]",
              "hover:border-[var(--border-strong)]",
            )}
          >
            {/* Contact fields */}
            <motion.div variants={fieldV} className="grid gap-6 sm:grid-cols-2">
              <UnderlinedField
                id={`${formId}-name`}
                label="Name"
                value={name}
                onChange={setName}
                placeholder="Evan Stewart"
                maxLength={100}
              />
              <UnderlinedField
                id={`${formId}-company`}
                label="Company"
                value={company}
                onChange={setCompany}
                placeholder="Microsoft"
                maxLength={100}
              />
              <UnderlinedField
                id={`${formId}-email`}
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="evan@microsoft.com"
                type="email"
                required
                maxLength={255}
              />
              <UnderlinedField
                id={`${formId}-phone`}
                label="Phone"
                value={phone}
                onChange={setPhone}
                placeholder="+1 (555) 000-0000"
                type="tel"
                maxLength={30}
              />
            </motion.div>

            {/* Services */}
            <motion.div variants={fieldV} className="flex flex-col gap-5">
              <FieldLabel>I&apos;m interested in…</FieldLabel>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Services"
              >
                {services.map((s) => (
                  <Chip
                    key={s}
                    active={selectedServices.includes(s)}
                    onClick={() => toggleService(s)}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </motion.div>

            {/* Budget */}
            <motion.div variants={fieldV} className="flex flex-col gap-5">
              <FieldLabel>Project budget (USD)</FieldLabel>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Budget"
              >
                {budgets.map((b) => (
                  <Chip
                    key={b}
                    active={budget === b}
                    onClick={() => setBudget(budget === b ? null : b)}
                  >
                    {b}
                  </Chip>
                ))}
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={fieldV} className="flex flex-col gap-3">
              <label
                htmlFor={`${formId}-message`}
                className="text-[13px] font-medium text-[var(--text)]"
              >
                Tell us about your project
              </label>
              <textarea
                id={`${formId}-message`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something concise…"
                rows={4}
                maxLength={1000}
                required
                className={cn(
                  "w-full resize-y rounded-md border border-[var(--border)] bg-[var(--background)]",
                  "px-3 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)]",
                  "outline-none transition-[border-color,box-shadow] duration-200",
                  "hover:border-[var(--border-strong)]",
                  "focus:border-[var(--brand-border)] focus:ring-2 focus:ring-[var(--brand)]/15",
                )}
              />
              <p className="font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                {message.length} / 1000
              </p>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fieldV}>
              <button
                type="submit"
                className={cn(
                  buttonVariants({ variant: "orange", size: "lg" }),
                  "w-full gap-2 sm:w-auto",
                )}
              >
                Send message
                <ArrowUpRight className="size-4" />
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Success state                               */
/* -------------------------------------------------------------------------- */

function ContactFormSuccess({
  id,
  noBorder,
}: {
  id?: string;
  noBorder?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28",
        !noBorder && "border-b border-[var(--border)]",
      )}
    >
      <Container wide>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: ease.out }}
          className={cn(
            "mx-auto flex max-w-2xl flex-col items-center justify-center text-center",
            "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40",
            "p-10 md:p-16",
          )}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: ease.bouncy, delay: 0.15 }}
            className="mb-6 flex size-16 items-center justify-center rounded-full border border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
          >
            <Check className="size-7" strokeWidth={2.5} />
          </motion.div>

          <h3 className="font-heading text-[26px] font-semibold tracking-tight text-[var(--text)] md:text-[32px]">
            Message sent
          </h3>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
            Thanks for reaching out — we&apos;ll get back to you within two
            business days.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-medium text-[var(--text)]">{children}</p>
  );
}

function UnderlinedField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn(
          "text-[13px] font-medium transition-colors duration-200",
          focused ? "text-[var(--brand)]" : "text-[var(--text)]",
        )}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        className={cn(
          "w-full border-b border-[var(--border)] bg-transparent pb-2",
          "text-[15px] text-[var(--text)] placeholder:text-[var(--text-subtle)]",
          "outline-none transition-[border-color] duration-200",
          "hover:border-[var(--border-strong)] focus:border-[var(--brand)]",
        )}
      />

      {/* Animated focus underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--brand)]"
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.35, ease: ease.smooth }}
        style={{ originX: 0, transformOrigin: "left" }}
      />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15, ease: ease.smooth }}
      className={cn(
        "rounded-full border px-4 py-2 text-[13px] font-medium",
        "transition-[background-color,border-color,color] duration-250 ease-[var(--ease-premium)]",
        active
          ? "border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
          : "border-[var(--border)] bg-[var(--background)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]",
      )}
    >
      {children}
    </motion.button>
  );
}
