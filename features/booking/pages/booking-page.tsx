// features/booking/pages/booking-page.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, type Variants } from "motion/react";

import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { SplitWords } from "@/components/animations/text-reveal";
import { LineSweepReveal } from "@/components/animations/line-sweep-reveal";
import { ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

import {
  MEETING_SERVICES,
  type MeetingFormat,
  type MeetingService,
} from "@/features/marketing/data/services-page";
import { formatDateShort } from "@/lib/calendar";
import { BookingSuccessModal } from "../components/booking-success-modal";
import { BookingSummary } from "../components/booking-summary";
import { DateTimeStep } from "../components/datetime-step";
import { DetailsStep } from "../components/details-step";
import { ServiceStep } from "../components/service-step";
import { StepSection } from "../components/step-section";

/* ── Variants ─────────────────────────────────────────────────── */

const heroV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const heroItemV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
};

const formV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const stepV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
};

/* ── Component ────────────────────────────────────────────────── */

type StepNumber = 1 | 2 | 3;

type DetailsFields = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  format: MeetingFormat;
};

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  notes: "",
};

export function BookingPage() {
  /* ── State ─────────────────────────────────────────────── */

  /* Step 1 */
  const [serviceId, setServiceId] = useState(MEETING_SERVICES[0]!.id);
  const service = useMemo(
    () => MEETING_SERVICES.find((s) => s.id === serviceId)!,
    [serviceId],
  );
  const [duration, setDuration] = useState(service.durations[0]!);

  /* Step 2 */
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  /* Step 3 */
  const [fullName, setFullName] = useState(INITIAL_FORM.fullName);
  const [email, setEmail] = useState(INITIAL_FORM.email);
  const [phone, setPhone] = useState(INITIAL_FORM.phone);
  const [company, setCompany] = useState(INITIAL_FORM.company);
  const [notes, setNotes] = useState(INITIAL_FORM.notes);
  const [format, setFormat] = useState<MeetingFormat>("online");

  /* UI */
  const [openStep, setOpenStep] = useState<StepNumber | null>(1);
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  /* Snapshot of the booking shown in the modal — frozen at submit time
   * so the modal can keep showing the right info even if the user
   * later resets the form. */
  const [snapshot, setSnapshot] = useState<{
    service: MeetingService;
    duration: number;
    date: Date;
    time: string;
    email: string;
  } | null>(null);

  /* ── Completion ────────────────────────────────────────── */
  const step1Done = Boolean(serviceId && duration);
  const step2Done = Boolean(selectedDate && selectedTime);
  const step3Done = Boolean(fullName.trim() && email.trim());
  const canSubmit = step1Done && step2Done && step3Done;

  const summaries = {
    1: `${service.title} · ${duration} min`,
    2:
      selectedDate && selectedTime
        ? `${formatDateShort(selectedDate)} · ${selectedTime}`
        : "Select a date and time",
    3: fullName.trim()
      ? `${fullName.trim()}${company.trim() ? ` — ${company.trim()}` : ""}`
      : "Add your details",
  };

  /* ── Handlers ──────────────────────────────────────────── */

  const handleServiceSelect = useCallback(
    (next: MeetingService, nextDuration: number) => {
      setServiceId(next.id);
      setDuration(nextDuration);
    },
    [],
  );

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  }, []);

  const handleDetailsChange = useCallback(
    <K extends keyof DetailsFields>(field: K, value: DetailsFields[K]) => {
      switch (field) {
        case "fullName":
          setFullName(value as string);
          break;
        case "email":
          setEmail(value as string);
          break;
        case "phone":
          setPhone(value as string);
          break;
        case "company":
          setCompany(value as string);
          break;
        case "notes":
          setNotes(value as string);
          break;
        case "format":
          setFormat(value as MeetingFormat);
          break;
      }
    },
    [],
  );

  const toggleStep = (n: StepNumber) =>
    setOpenStep((curr) => (curr === n ? null : n));

  const resetForm = useCallback(() => {
    setSelectedDate(null);
    setSelectedTime(null);
    setFullName(INITIAL_FORM.fullName);
    setEmail(INITIAL_FORM.email);
    setPhone(INITIAL_FORM.phone);
    setCompany(INITIAL_FORM.company);
    setNotes(INITIAL_FORM.notes);
    setFormat("online");
    setOpenStep(1);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSubmit || submitting || !selectedDate || !selectedTime) return;

      setSubmitting(true);
      /* Replace with real API call */
      await new Promise((r) => setTimeout(r, 1200));

      /* Freeze the snapshot before any reset can happen */
      setSnapshot({
        service,
        duration,
        date: selectedDate,
        time: selectedTime,
        email,
      });

      setSubmitting(false);
      setSuccessOpen(true);
      resetForm();
    },
    [
      canSubmit,
      submitting,
      service,
      duration,
      selectedDate,
      selectedTime,
      email,
      resetForm,
    ],
  );

  const handleCloseModal = useCallback(() => {
    setSuccessOpen(false);
  }, []);

  /* ── Render ────────────────────────────────────────────── */
  return (
    <>
      <main className="min-h-screen bg-[var(--background)]">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative border-b border-[var(--border)] pt-32 md:pt-40">
          <Container wide className="pb-16 md:pb-20">
            <motion.div
              variants={heroV}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6"
            >
              <motion.div variants={heroItemV}>
                <SectionLabel variant="line" animated={false}>
                  Book a meeting
                </SectionLabel>
              </motion.div>

              <motion.div variants={heroItemV}>
                <SplitWords
                  text="Let's find a time that works."
                  as="h1"
                  className={cn(
                    "max-w-4xl font-heading font-bold tracking-tight text-[var(--text)]",
                    "text-[36px] leading-[1.05]",
                    "sm:text-[52px]",
                    "md:text-[64px]",
                    "lg:text-[76px]",
                  )}
                  delay={0.1}
                  stagger={0.04}
                />
              </motion.div>

              <motion.div variants={heroItemV} className="max-w-2xl">
                <LineSweepReveal
                  text="Pick the kind of conversation you want, choose a slot, and tell us a little about your project. A senior member of the team will confirm within one business day."
                  as="p"
                  className="text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]"
                  delay={0.1}
                  stagger={0.022}
                  duration={0.32}
                />
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* ── Form ─────────────────────────────────────── */}
        <section className="relative py-16 md:py-24">
          <Container wide>
            <motion.form
              variants={formV}
              initial="hidden"
              whileInView="show"
              viewport={viewport.section}
              onSubmit={handleSubmit}
              className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12"
            >
              <div className="flex flex-col gap-5">
                <motion.div variants={stepV}>
                  <StepSection
                    step={1}
                    title="Choose a meeting"
                    summary={summaries[1]}
                    completed={step1Done && openStep !== 1}
                    open={openStep === 1}
                    onToggle={() => toggleStep(1)}
                  >
                    <ServiceStep
                      serviceId={serviceId}
                      duration={duration}
                      onSelect={handleServiceSelect}
                      onNext={() => setOpenStep(2)}
                    />
                  </StepSection>
                </motion.div>

                <motion.div variants={stepV}>
                  <StepSection
                    step={2}
                    title="Date & time"
                    summary={summaries[2]}
                    completed={step2Done && openStep !== 2}
                    open={openStep === 2}
                    onToggle={() => toggleStep(2)}
                  >
                    <DateTimeStep
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onSelectDate={handleSelectDate}
                      onSelectTime={setSelectedTime}
                      onNext={() => setOpenStep(3)}
                    />
                  </StepSection>
                </motion.div>

                <motion.div variants={stepV}>
                  <StepSection
                    step={3}
                    title="Your details"
                    summary={summaries[3]}
                    completed={step3Done && openStep !== 3}
                    open={openStep === 3}
                    onToggle={() => toggleStep(3)}
                  >
                    <DetailsStep
                      fullName={fullName}
                      email={email}
                      phone={phone}
                      company={company}
                      notes={notes}
                      format={format}
                      onChange={handleDetailsChange}
                    />
                  </StepSection>
                </motion.div>
              </div>

              <motion.aside
                variants={stepV}
                className="lg:sticky lg:top-28 lg:self-start"
              >
                <BookingSummary
                  service={service}
                  duration={duration}
                  date={selectedDate}
                  time={selectedTime}
                  format={format}
                  canSubmit={canSubmit}
                  submitting={submitting}
                />
              </motion.aside>
            </motion.form>
          </Container>
        </section>
      </main>

      {/* ── Success modal ──────────────────────────────────── */}
      {snapshot && (
        <BookingSuccessModal
          open={successOpen}
          service={snapshot.service}
          duration={snapshot.duration}
          date={snapshot.date}
          time={snapshot.time}
          email={snapshot.email}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
