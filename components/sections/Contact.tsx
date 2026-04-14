"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "../ui/SectionLabel";
import { TextReveal } from "../ui/TextReveal";
import { MagneticButton } from "../ui/MagneticButton";
import { Check, Send } from "lucide-react";

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
      className="relative overflow-hidden bg-void py-24 md:py-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-sm opacity-[0.05]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/8 blur-[180px]"
      />

      <div className="relative mx-auto max-w-4xl px-6 md:px-10">
        <SectionLabel number="05" label="Contact" />
        <div className="mt-8 text-center">
          <TextReveal
            as="h2"
            text="Let's build something."
            className="display text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-platinum md:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-lg text-slate-muted"
          >
            Drop your email and a link to your current site. Or if you don't have one yet,
            tell us the idea. We'll be in touch within one business day.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12"
        >
          <div className="relative rounded-2xl border border-cyan-glow/20 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 backdrop-blur-sm md:p-12">
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
                    <Check className="h-9 w-9 text-cyan-glow" strokeWidth={2.5} />
                    <div className="absolute inset-0 animate-[pulse-glow_2s_ease-in-out_infinite] rounded-full" />
                  </div>
                  <h3 className="display mt-8 text-4xl font-semibold tracking-tight text-platinum">
                    Signal received.
                  </h3>
                  <p className="mt-4 max-w-md text-slate-muted">
                    Thanks for reaching out. Jake or Cameron will get back to you within
                    one business day.
                  </p>
                  <button
                    onClick={onReset}
                    className="mono mt-8 text-[11px] text-cyan-glow underline-offset-4 transition hover:underline"
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
                  className="space-y-8"
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
                      placeholder="you@company.com"
                      className="w-full bg-transparent py-3 text-lg text-platinum placeholder:text-slate-muted/50 focus:outline-none"
                    />
                  </Field>

                  <Field
                    label={noWebsite ? "Your Idea" : "Current Website URL"}
                    number="02"
                    error={
                      noWebsite ? errors.idea?.message : errors.websiteUrl?.message
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
                          className="w-full resize-none bg-transparent py-3 text-lg text-platinum placeholder:text-slate-muted/50 focus:outline-none"
                        />
                      ) : (
                        <motion.input
                          key="url"
                          {...register("websiteUrl")}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          type="text"
                          placeholder="example.com"
                          className="w-full bg-transparent py-3 text-lg text-platinum placeholder:text-slate-muted/50 focus:outline-none"
                        />
                      )}
                    </AnimatePresence>
                  </Field>

                  <label
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-muted"
                    data-cursor="hover"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        {...register("noWebsiteYet")}
                        className="peer sr-only"
                      />
                      <div className="h-5 w-5 rounded border border-cyan-glow/40 bg-transparent transition-colors peer-checked:border-cyan-glow peer-checked:bg-cyan-glow/20" />
                      <Check
                        className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-cyan-glow opacity-0 transition-opacity peer-checked:opacity-100"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="select-none">I don't have a website yet.</span>
                  </label>

                  <div className="flex flex-col items-start gap-6 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="mono text-[10px] text-slate-muted">
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
    <div className="group relative border-b border-cyan-glow/15 pb-1 focus-within:border-cyan-glow/60 transition-colors">
      <div className="mono flex items-center gap-3 text-[10px] text-slate-muted">
        <span className="text-cyan-glow">{number}</span>
        <span>{label}</span>
      </div>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mono absolute left-0 -bottom-5 text-[10px] text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
