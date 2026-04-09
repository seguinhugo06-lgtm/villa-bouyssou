"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import { ChevronLeft, ChevronRight, X, Loader2, Check } from "lucide-react";

// ── Calendar helpers ─────────────────────────────────────────────────────────

const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS_FR = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ── Price breakdown type ─────────────────────────────────────────────────────

interface PriceBreakdown {
  nights: number;
  subtotal: number;
  cleaningFee: number;
  totalPrice: number;
  averageNightlyRate: number;
}

// ── Booking form state ───────────────────────────────────────────────────────

type BookingStep = "form" | "submitting" | "success" | "error";

// ── Calendar month component ─────────────────────────────────────────────────

function CalendarMonth({
  year,
  month,
  startDate,
  endDate,
  unavailableDates,
  onDateClick,
}: {
  year: number;
  month: number;
  startDate: string | null;
  endDate: string | null;
  unavailableDates: Set<string>;
  onDateClick: (dateStr: string) => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const todayStr = formatDate(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(year, month, day);
    const isUnavailable = unavailableDates.has(dateStr);
    const isPast = dateStr < todayStr;
    const isStart = dateStr === startDate;
    const isEnd = dateStr === endDate;
    const isInRange =
      startDate && endDate && dateStr > startDate && dateStr < endDate;
    const isSelected = isStart || isEnd;

    let classes =
      "relative h-10 md:h-12 flex items-center justify-center text-sm md:text-base rounded-lg transition-all duration-200 ";

    if (isUnavailable || isPast) {
      classes += "text-charcoal/25 cursor-not-allowed line-through";
    } else if (isSelected) {
      classes +=
        "bg-peach text-white font-medium cursor-pointer shadow-md scale-105";
    } else if (isInRange) {
      classes += "bg-peach/20 text-charcoal cursor-pointer";
    } else {
      classes +=
        "text-charcoal hover:bg-peach/10 cursor-pointer hover:scale-105";
    }

    cells.push(
      <motion.div
        key={day}
        whileTap={!isUnavailable && !isPast ? { scale: 0.9 } : undefined}
        className={classes}
        onClick={() => {
          if (!isUnavailable && !isPast) onDateClick(dateStr);
        }}
      >
        {day}
      </motion.div>
    );
  }

  return (
    <div className="flex-1 min-w-[280px]">
      <h3 className="font-heading text-xl md:text-2xl text-navy text-center mb-4 font-light">
        {MONTHS_FR[month]} {year}
      </h3>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_FR.map((d) => (
          <div
            key={d}
            className="h-8 flex items-center justify-center text-xs font-accent text-charcoal/50 uppercase tracking-wider"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
    </div>
  );
}

// ── Booking modal ────────────────────────────────────────────────────────────

function BookingModal({
  startDate,
  endDate,
  nightCount,
  priceData,
  onClose,
}: {
  startDate: string;
  endDate: string;
  nightCount: number;
  priceData: PriceBreakdown | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState<BookingStep>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    guests: 2,
    notes: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("submitting");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          checkIn: startDate,
          checkOut: endDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Une erreur est survenue");
        setStep("error");
        return;
      }

      setStep("success");
    } catch {
      setErrorMsg("Erreur de connexion. Veuillez reessayer.");
      setStep("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
          <h2 className="font-heading text-2xl text-navy font-light">
            Reservation
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-charcoal/5 transition-colors"
          >
            <X className="w-5 h-5 text-charcoal/60" />
          </button>
        </div>

        <div className="p-6">
          {/* Summary bar */}
          <div className="bg-cream rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm font-body text-charcoal/60 mb-1">
              <span>
                {startDate} &rarr; {endDate}
              </span>
              <span>
                {nightCount} nuit{nightCount > 1 ? "s" : ""}
              </span>
            </div>
            {priceData && (
              <div className="flex justify-between items-end mt-2">
                <div>
                  <p className="text-xs text-charcoal/40">
                    {priceData.averageNightlyRate} EUR/nuit moy.
                    {priceData.cleaningFee > 0 &&
                      ` + ${priceData.cleaningFee} EUR menage`}
                  </p>
                </div>
                <p className="font-heading text-2xl text-navy">
                  {priceData.totalPrice}{" "}
                  <span className="text-sm text-charcoal/40">EUR</span>
                </p>
              </div>
            )}
          </div>

          {/* Form */}
          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-accent text-charcoal/60 uppercase tracking-wider mb-1">
                  Nom complet *
                </label>
                <input
                  required
                  type="text"
                  value={formData.guestName}
                  onChange={(e) =>
                    setFormData({ ...formData, guestName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-charcoal/15 focus:border-peach focus:ring-1 focus:ring-peach outline-none transition-colors font-body"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-accent text-charcoal/60 uppercase tracking-wider mb-1">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  value={formData.guestEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, guestEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-charcoal/15 focus:border-peach focus:ring-1 focus:ring-peach outline-none transition-colors font-body"
                  placeholder="jean@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-accent text-charcoal/60 uppercase tracking-wider mb-1">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    value={formData.guestPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, guestPhone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-charcoal/15 focus:border-peach focus:ring-1 focus:ring-peach outline-none transition-colors font-body"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-accent text-charcoal/60 uppercase tracking-wider mb-1">
                    Voyageurs *
                  </label>
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-charcoal/15 focus:border-peach focus:ring-1 focus:ring-peach outline-none transition-colors font-body bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <option key={n} value={n}>
                        {n} voyageur{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-accent text-charcoal/60 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-charcoal/15 focus:border-peach focus:ring-1 focus:ring-peach outline-none transition-colors font-body resize-none"
                  placeholder="Un message ou une demande particuliere..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-accent text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Confirmer la reservation
              </button>
            </form>
          )}

          {/* Submitting */}
          {step === "submitting" && (
            <div className="flex flex-col items-center py-12">
              <Loader2 className="w-10 h-10 text-peach animate-spin mb-4" />
              <p className="font-body text-charcoal/60">
                Envoi en cours...
              </p>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-heading text-xl text-navy mb-2">
                Demande envoyee !
              </h3>
              <p className="font-body text-charcoal/60 max-w-sm">
                Nous avons bien recu votre demande de reservation. Vous
                recevrez un email de confirmation sous peu.
              </p>
              <button
                onClick={onClose}
                className="mt-6 font-accent text-sm uppercase tracking-widest text-terracotta hover:text-terracotta/80 transition-colors"
              >
                Fermer
              </button>
            </div>
          )}

          {/* Error */}
          {step === "error" && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-heading text-xl text-navy mb-2">Erreur</h3>
              <p className="font-body text-charcoal/60 max-w-sm">{errorMsg}</p>
              <button
                onClick={() => setStep("form")}
                className="mt-6 font-accent text-sm uppercase tracking-widest text-terracotta hover:text-terracotta/80 transition-colors"
              >
                Reessayer
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function AvailabilityPage() {
  const now = new Date();
  const [baseMonth, setBaseMonth] = useState(now.getMonth());
  const [baseYear, setBaseYear] = useState(now.getFullYear());
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  // Availability data from API
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(
    new Set()
  );
  const [loadingAvailability, setLoadingAvailability] = useState(true);

  // Price data from API
  const [priceData, setPriceData] = useState<PriceBreakdown | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);

  const secondMonth = baseMonth === 11 ? 0 : baseMonth + 1;
  const secondYear = baseMonth === 11 ? baseYear + 1 : baseYear;

  const nightCount = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
  }, [startDate, endDate]);

  // Fetch availability from API
  useEffect(() => {
    async function fetchAvailability() {
      setLoadingAvailability(true);
      try {
        const res = await fetch("/api/availability");
        const data = await res.json();
        if (data.unavailableDates) {
          setUnavailableDates(new Set(data.unavailableDates));
        }
      } catch (err) {
        console.error("Failed to load availability:", err);
      } finally {
        setLoadingAvailability(false);
      }
    }
    fetchAvailability();
  }, []);

  // Fetch pricing when dates are selected
  const fetchPrice = useCallback(async (checkIn: string, checkOut: string) => {
    setLoadingPrice(true);
    try {
      const res = await fetch(
        `/api/availability?checkIn=${checkIn}&checkOut=${checkOut}`
      );
      const data = await res.json();
      if (data.price) {
        setPriceData(data.price);
      }
    } catch (err) {
      console.error("Failed to fetch price:", err);
    } finally {
      setLoadingPrice(false);
    }
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchPrice(startDate, endDate);
    } else {
      setPriceData(null);
    }
  }, [startDate, endDate, fetchPrice]);

  function handleDateClick(dateStr: string) {
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate(null);
    } else {
      if (dateStr < startDate) {
        setStartDate(dateStr);
        setEndDate(null);
      } else if (dateStr === startDate) {
        setStartDate(null);
      } else {
        setEndDate(dateStr);
      }
    }
  }

  function goPrev() {
    setDirection(-1);
    if (baseMonth === 0) {
      setBaseMonth(11);
      setBaseYear(baseYear - 1);
    } else {
      setBaseMonth(baseMonth - 1);
    }
  }

  function goNext() {
    setDirection(1);
    if (baseMonth === 11) {
      setBaseMonth(0);
      setBaseYear(baseYear + 1);
    } else {
      setBaseMonth(baseMonth + 1);
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <AnimatedText
            text="Disponibilites"
            as="h1"
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy font-light"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 font-body text-charcoal/60 text-lg"
          >
            Selectionnez votre date d&apos;arrivee
          </motion.p>
        </div>

        {/* Loading indicator */}
        {loadingAvailability && (
          <div className="flex justify-center mb-8">
            <Loader2 className="w-6 h-6 text-peach animate-spin" />
          </div>
        )}

        {/* Calendar navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goPrev}
            className="p-2 rounded-full hover:bg-navy/5 transition-colors"
            aria-label="Mois precedent"
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>
          <button
            onClick={goNext}
            className="p-2 rounded-full hover:bg-navy/5 transition-colors"
            aria-label="Mois suivant"
          >
            <ChevronRight className="w-6 h-6 text-navy" />
          </button>
        </div>

        {/* Calendar grid */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${baseYear}-${baseMonth}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex flex-col md:flex-row gap-8 md:gap-12"
          >
            <CalendarMonth
              year={baseYear}
              month={baseMonth}
              startDate={startDate}
              endDate={endDate}
              unavailableDates={unavailableDates}
              onDateClick={handleDateClick}
            />
            <CalendarMonth
              year={secondYear}
              month={secondMonth}
              startDate={startDate}
              endDate={endDate}
              unavailableDates={unavailableDates}
              onDateClick={handleDateClick}
            />
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-8 text-sm font-body text-charcoal/60"
        >
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-peach inline-block" />
            Selectionne
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-peach/20 inline-block" />
            Plage
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-charcoal/10 inline-block line-through text-charcoal/30" />
            Indisponible
          </span>
        </motion.div>

        {/* Price estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center"
        >
          {startDate && endDate && priceData ? (
            <>
              <p className="font-body text-charcoal/60 mb-2">
                {nightCount} nuit{nightCount > 1 ? "s" : ""} selectionnee
                {nightCount > 1 ? "s" : ""}
              </p>
              <p className="font-heading text-4xl md:text-5xl text-navy font-light">
                {loadingPrice ? (
                  <Loader2 className="w-8 h-8 text-peach animate-spin inline-block" />
                ) : (
                  <>
                    {priceData.totalPrice}
                    <span className="text-xl text-charcoal/40 ml-1">EUR</span>
                  </>
                )}
              </p>
              <p className="mt-1 font-body text-sm text-charcoal/40">
                {priceData.averageNightlyRate} EUR/nuit moy. +{" "}
                {priceData.cleaningFee} EUR menage
              </p>
            </>
          ) : startDate && endDate && loadingPrice ? (
            <Loader2 className="w-8 h-8 text-peach animate-spin mx-auto" />
          ) : (
            <>
              <p className="font-body text-charcoal/60 mb-2">A partir de</p>
              <p className="font-heading text-4xl md:text-5xl text-navy font-light">
                380
                <span className="text-xl text-charcoal/40 ml-1">
                  EUR / nuit
                </span>
              </p>
              <p className="mt-1 font-body text-sm text-charcoal/40">
                Selectionnez vos dates pour voir le total
              </p>
            </>
          )}

          <button
            onClick={() => {
              if (startDate && endDate) {
                setShowBooking(true);
              }
            }}
            disabled={!startDate || !endDate}
            className={`mt-8 inline-block font-accent text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 ${
              startDate && endDate
                ? "bg-terracotta hover:bg-terracotta/90 text-white hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                : "bg-charcoal/20 text-charcoal/40 cursor-not-allowed"
            }`}
          >
            Reserver maintenant
          </button>
        </motion.div>
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {showBooking && startDate && endDate && (
          <BookingModal
            startDate={startDate}
            endDate={endDate}
            nightCount={nightCount}
            priceData={priceData}
            onClose={() => setShowBooking(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
