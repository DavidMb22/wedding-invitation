import { motion } from "framer-motion";
import { wedding } from "../data/wedding";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#f5f2eb] px-[18px] pt-[18px]"
    >
      {/* Page frame */}
      <div className="absolute inset-[18px] border border-black/[0.10]" />

      {/* Background monogram */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="font-serif text-[18rem] font-light leading-none tracking-[-0.12em] text-black/[0.025] sm:text-[25rem] md:text-[31rem]">
          {wedding.groom.charAt(0)}
          <span className="-ml-12">
            {wedding.bride.charAt(0)}
          </span>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-16 pt-28">
        <div className="w-full max-w-4xl text-center">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-10 text-[7px] font-medium uppercase tracking-[0.48em] text-black/40 sm:text-[8px]"
          >
            {wedding.hero.eyebrow}
          </motion.p>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15 }}
          >
            <h1
              className="
                font-serif
                text-[clamp(4.8rem,8vw,7.8rem)]
                font-light
                leading-[0.72]
                tracking-[-0.045em]
              "
            >
              {wedding.groom}
            </h1>

            <div
              className="
                my-6
                font-serif
                text-[3.8rem]
                font-light
                italic
                leading-none
                text-[#b7ad9d]
                sm:my-7
                sm:text-[4.5rem]
              "
            >
              &
            </div>

            <h1
              className="
                font-serif
                text-[clamp(4.8rem,8vw,7.8rem)]
                font-light
                leading-[0.72]
                tracking-[-0.045em]
              "
            >
              {wedding.bride}
            </h1>
          </motion.div>

          {/* Date and location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-16"
          >
            <p className="text-[8px] font-medium uppercase tracking-[0.38em] text-black/45 sm:text-[9px]">
              {wedding.date}
            </p>

            <p className="mt-4 text-[7px] font-medium uppercase tracking-[0.32em] text-black/35 sm:text-[8px]">
              {wedding.location.full}
            </p>
          </motion.div>

          {/* Invitation message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto mt-10 max-w-[280px] font-serif text-[11px] italic leading-6 text-black/50 sm:max-w-sm"
          >
            {wedding.hero.message}
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[6px] uppercase tracking-[0.4em] text-black/30">
          Scroll
        </span>

        <span className="h-7 w-px bg-black/15" />
      </motion.a>
    </section>
  );
}