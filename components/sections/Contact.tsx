"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "../ui/SectionLabel";
import { TextReveal } from "../ui/TextReveal";
import { MagneticButton } from "../ui/MagneticButton";
import { Check, Send, Clock, MessageSquare, FileText } from "lucide-react";

const schema = z
  .object({
    email: z.string().email("That doesn't look like an email"),
    noWebsiteYet: z.boolean(),
    websiteUrl: z.string().optional(),
    idea: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.noWebsiteYet) {
      if (!data.idea || data.idea.trim().length < 10) {
        ctx.addIssue({
          code: "custom",
          path: ["idea"],
          message: "Tell us a bit more — at least 10 characters",
        });
      }
    } else {
      if (!data.websiteUrl || data.websiteUrl.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["websiteUrl"],
          message: "Paste your current site's URL",
        });
      } else {
        try {
          const url = data.websiteUrl.startsWith("http")
            ? data.websiteUrl
            : `https://${data.websiteUrl}`;
          new URL(url);
        } catch {
          ctx.addIssue({
            code: "custom",
            path: ["websiteUrl"],
            message: "That doesn't look like a valid URL",
          });
        }
      }
    }
  });

type FormValues = z.infer<typeof schema>;

const nextSteps = [
  {
    icon: Clock,
    title: "We reply within 24 hours",
    body: "Usually same-day. Always on business days.",
  },
  {
    icon: MessageSquare,
    title: "Quick discovery call",
    body: "30–60 minutes, on your schedule.",
  },
  {
    icon: FileText,
    title: "Clear scope + quote",
    body: "No mystery pricing. No surprise bills.",
  },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      noWebsiteYet: false,
      websiteUrl: "",
      idea: "",
    },
  });

  const noWebsite = watch("noWebsiteYet");

  async function onSubmit(values: FormValues) {
    // TODO: wire up real email delivery (Resend / Next route handler) in production
    // eslint-disable-next-line no-console
    console.log("[Relyance] Contact submission:", values);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  }

  function onReset() {
    reset();
    setSubmitted(false);
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-void py-20 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-sm opacity-[0.05]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/8 blur-[180px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <SectionLabel number="05" label="Contact" />
            <TextReveal
              as="h2"
              text="Let's build something."
              className="display mt-6 text-balance text-4xl font-semibold leading-[0.95] tracking-tight text-platinum md:text-6xl lg:text-7xl"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-sm text-pretty text-sm leading-relaxed text-slate-muted md:text-base"
          >
            Drop your email and a link to your current site — or if you don't
            have one yet, tell us the idea. We'll be in touch within one
            business day.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-5 lg:gap-10">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl border border-cyan-glow/20 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 md:p-10">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/70 to-transparent"
              />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-cyan-glow/50 bg-cyan-glow/10">
                      <Check
                        className="h-9 w-9 text-cyan-glow"
                        strokeWidth={2.5}
                      />
                      <div className="absolute inset-0 animate-[pulse-glow_2s_ease-in-out_infinite] rounded-full" />
                    </div>
                    <h3 className="display mt-8 text-3xl font-semibold tracking-tight text-platinum md:text-4xl">
                      Signal received.
                    </h3>
                    <p className="mt-4 max-w-md text-slate-muted">
                      Thanks for reaching out. Jake or Cam will get back to
                      you within one business day.
                    </p>
                    <button
                      onClick={onReset}
                      type="button"
                      className="mono mt-8 min-h-[44px] px-4 text-[11px] text-cyan-glow underline-offset-4 transition hover:underline touch-manipulation"
                      data-cursor="hover"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-7"
                    noValidate
                  >
                    <Field
                      label="Email"
                      number="01"
                      error={errors.email?.message}
                    >
                      <input
                        {...register("email")}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        className="w-full bg-transparent py-3 text-base text-platinum placeholder:text-slate-muted/50 focus:outline-none md:text-lg"
                      />
                    </Field>

                    <Field
                      label={noWebsite ? "Your Idea" : "Current Website URL"}
                      number="02"
                      error={
                        noWebsite
                          ? errors.idea?.message
                          : errors.websiteUrl?.message
                      }
                    >
                      <AnimatePresence mode="wait">
                        {noWebsite ? (
                          <motion.textarea
                            key="idea"
                            {...register("idea")}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            placeholder="Tell us what you're building — the more, the better."
                            rows={4}
                            className="w-full resize-none bg-transparent py-3 text-base text-platinum placeholder:text-slate-muted/50 focus:outline-none md:text-lg"
                          />
                        ) : (
                          <motion.input
                            key="url"
                            {...register("websiteUrl")}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            type="text"
                            inputMode="url"
                            autoComplete="url"
                            placeholder="example.com"
                            className="w-full bg-transparent py-3 text-base text-platinum placeholder:text-slate-muted/50 focus:outline-none md:text-lg"
                          />
                        )}
                      </AnimatePresence>
                    </Field>

                    <label
                      className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm text-slate-muted touch-manipulation"
                      data-cursor="hover"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          {...register("noWebsiteYet")}
                          className="peer sr-only"
                        />
                        <div className="h-5 w-5 rounded border border-cyan-glow/40 bg-transparent transition-colors peer-checked:border-cyan-glow peer-checked:bg-cyan-glow/20 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-glow/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-void" />
                        <Check
                          className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-cyan-glow opacity-0 transition-opacity peer-checked:opacity-100"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="select-none">
                        I don't have a website yet.
                      </span>
                    </label>

                    <div className="flex flex-col items-start gap-5 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                      <div className="mono text-[10px] leading-relaxed text-slate-muted">
                        No spam · No tracking · No nonsense
                      </div>
                      <MagneticButton type="submit" variant="primary">
                        {isSubmitting ? "Sending…" : "Send Signal"}
                        <Send className="h-4 w-4" />
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* INFO PANEL */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="flex h-full flex-col gap-8 rounded-2xl border border-cyan-glow/10 bg-gradient-to-br from-white/[0.025] to-transparent p-6 md:p-8">
              <div>
                <div className="mono flex items-center gap-3 text-[10px] tracking-[0.2em] text-cyan-glow/80">
                  <span className="h-px w-8 bg-cyan-glow/40" />
                  <span>What happens next</span>
                </div>

                <ol className="mt-6 space-y-5">
                  {nextSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <li key={step.title} className="flex gap-3.5">
                        <div className="mono flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-glow/25 bg-cyan-glow/[0.04] text-cyan-glow">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="mono text-[10px] text-cyan-glow/80">
                              {(i + 1).toString().padStart(2, "0")}
                            </span>
                            <h4 className="text-sm font-medium leading-snug text-platinum">
                              {step.title}
                            </h4>
                          </div>
                          <p className="mt-1 text-[12.5px] leading-relaxed text-slate-muted">
                            {step.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="border-t border-cyan-glow/10" />

              <div>
                <div className="mono flex items-center gap-3 text-[10px] tracking-[0.2em] text-cyan-glow/80">
                  <span className="h-px w-8 bg-cyan-glow/40" />
                  <span>Prefer email?</span>
                </div>
                <a
                  href="mailto:sales@relyancesolutions.com"
                  className="mt-4 block text-base font-medium text-platinum transition-colors hover:text-cyan-glow"
                  data-cursor="hover"
                >
                  sales@relyancesolutions.com
                </a>
                <p className="mt-2 text-[12.5px] leading-relaxed text-slate-muted">
                  We read every message. No chatbots, no tickets.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  number,
  children,
  error,
}: {
  label: string;
  number: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="group">
      <div className="relative border-b border-cyan-glow/15 pb-1 transition-colors focus-within:border-cyan-glow/60">
        <div className="mono flex items-center gap-3 text-[10px] text-slate-muted">
          <span className="text-cyan-glow">{number}</span>
          <span>{label}</span>
        </div>
        {children}
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mono overflow-hidden pt-1.5 text-[10px] text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
