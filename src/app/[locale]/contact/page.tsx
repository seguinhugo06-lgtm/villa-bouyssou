"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedText from "@/components/ui/AnimatedText";
import { Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  guests: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  comment: string;
};

function FloatingInput({
  label,
  type = "text",
  register,
  name,
  required = false,
  delay = 0,
}: {
  label: string;
  type?: string;
  register: ReturnType<typeof useForm<FormData>>["register"];
  name: keyof FormData;
  required?: boolean;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative"
    >
      <input
        {...register(name, { required })}
        type={type}
        className="peer w-full bg-transparent border-b-2 border-navy/15 focus:border-peach px-0 pt-6 pb-2 font-body text-charcoal outline-none transition-colors duration-300"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        placeholder=" "
      />
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-body ${
          focused || hasValue
            ? "top-0 text-xs text-peach"
            : "top-6 text-base text-charcoal/40"
        }`}
      >
        {label}
        {required && <span className="text-terracotta ml-0.5">*</span>}
      </label>
    </motion.div>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Contact form error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text={t("aboutHost")}
            as="h1"
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy font-light"
          />
        </div>

        {/* Host info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar placeholder */}
            <div className="w-24 h-24 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-navy/40" />
            </div>

            <div className="text-center md:text-left">
              <h2 className="font-heading text-2xl md:text-3xl text-navy font-light mb-2">
                Elina Bouyssou
              </h2>
              <p className="font-body text-charcoal/60 text-sm mb-6">
                {t("hostSubtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="mailto:lavillabouyssou@gmail.com"
                  className="flex items-center gap-3 bg-navy/5 hover:bg-navy/10 rounded-xl px-5 py-3 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-peach" />
                  <span className="font-body text-sm text-charcoal/70">
                    lavillabouyssou@gmail.com
                  </span>
                </a>
                <a
                  href="tel:+33687402093"
                  className="flex items-center gap-3 bg-navy/5 hover:bg-navy/10 rounded-xl px-5 py-3 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-peach" />
                  <span className="font-body text-sm text-charcoal/70">
                    +33 6 87 40 20 93
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-navy font-light mb-10 text-center">
            {t("formTitle")}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Email */}
            <FloatingInput
              label={t("email")}
              type="email"
              register={register}
              name="email"
              required
              delay={0.1}
            />

            {/* Name row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FloatingInput
                label={t("firstName")}
                register={register}
                name="firstName"
                required
                delay={0.2}
              />
              <FloatingInput
                label={t("lastName")}
                register={register}
                name="lastName"
                required
                delay={0.25}
              />
            </div>

            {/* Guests select */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <label className="block text-xs text-peach mb-2 font-body">
                {t("guestsLabel")}
              </label>
              <select
                {...register("guests")}
                className="w-full bg-transparent border-b-2 border-navy/15 focus:border-peach px-0 pb-2 font-body text-charcoal outline-none transition-colors duration-300 cursor-pointer appearance-none"
              >
                {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? t("guest") : t("guests")}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 top-8 pointer-events-none">
                <svg
                  className="w-4 h-4 text-charcoal/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Phone */}
            <FloatingInput
              label={t("phone")}
              type="tel"
              register={register}
              name="phone"
              delay={0.35}
            />

            {/* Date row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label className="block text-xs text-peach mb-2 font-body">
                  {t("checkIn")}
                </label>
                <input
                  {...register("checkIn")}
                  type="date"
                  className="w-full bg-transparent border-b-2 border-navy/15 focus:border-peach px-0 pb-2 font-body text-charcoal outline-none transition-colors duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <label className="block text-xs text-peach mb-2 font-body">
                  {t("checkOut")}
                </label>
                <input
                  {...register("checkOut")}
                  type="date"
                  className="w-full bg-transparent border-b-2 border-navy/15 focus:border-peach px-0 pb-2 font-body text-charcoal outline-none transition-colors duration-300"
                />
              </motion.div>
            </div>

            {/* Comment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative"
            >
              <textarea
                {...register("comment")}
                rows={4}
                className="peer w-full bg-transparent border-b-2 border-navy/15 focus:border-peach px-0 pt-6 pb-2 font-body text-charcoal outline-none transition-colors duration-300 resize-none"
                placeholder=" "
              />
              <label className="absolute left-0 top-0 text-xs text-peach font-body peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-charcoal/40 transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-peach">
                {t("comment")}
              </label>
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="text-center pt-4"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative bg-terracotta hover:bg-terracotta/90 disabled:bg-terracotta/60 text-white font-accent text-sm uppercase tracking-widest px-12 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed min-w-[200px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                      }}
                    />
                    {t("sending")}
                  </span>
                ) : submitted ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {t("sent")}
                  </motion.span>
                ) : (
                  t("send")
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
