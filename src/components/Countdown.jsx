import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "../data/wedding";

const WEDDING_DATE = new Date("2026-12-06T13:00:00+02:00");

function calculateTimeLeft() {
  const difference = WEDDING_DATE.getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    {
      value: timeLeft.days,
      label: "Days",
    },
    {
      value: timeLeft.hours,
      label: "Hours",
    },
    {
      value: timeLeft.minutes,
      label: "Minutes",
    },
    {
      value: timeLeft.seconds,
      label: "Seconds",
    },
  ];

  return (
    <section
      id="countdown"
      className="bg-[#090909] px-6 py-28 text-[#f5f2eb] sm:py-36"
    >
      <div className="mx-auto max-w-5xl text-center">

        {/* Small heading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[8px] font-medium uppercase tracking-[0.45em] text-white/35 sm:text-[9px]"
        >
          Counting Down to the Day
        </motion.p>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 font-serif text-[2.5rem] font-light sm:text-[3.5rem]"
        >
          Until We Say "I Do"
        </motion.h2>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-y-0"
        >
          {units.map((unit, index) => (
            <div
              key={unit.label}
              className="relative flex flex-col items-center"
            >
              <p className="font-serif text-[3.5rem] font-light leading-none sm:text-[4.5rem]">
                {formatNumber(unit.value)}
              </p>

              <p className="mt-4 text-[7px] font-medium uppercase tracking-[0.35em] text-white/30 sm:text-[8px]">
                {unit.label}
              </p>

              {/* Separator */}
              {index < units.length - 1 && (
                <span className="absolute -right-1 top-3 hidden font-serif text-2xl text-white/20 sm:block">
                  :
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Date */}
        <p className="mt-16 font-serif text-[13px] italic text-white/40">
          {wedding.date} · 1:00 PM
        </p>
      </div>
    </section>
  );
}