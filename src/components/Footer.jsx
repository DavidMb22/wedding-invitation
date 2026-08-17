import { motion } from "framer-motion";
import { wedding } from "../data/wedding";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#090909] px-6 py-24 text-[#f5f2eb] sm:py-32">

      {/* Subtle background initials */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-[16rem] font-light tracking-[-0.12em] text-white/[0.018] sm:text-[24rem] md:text-[28rem]">
          L
          <span className="-ml-8">A</span>
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">

        {/* Closing message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-[1.4rem] font-light italic leading-8 text-white/65 sm:text-[1.7rem]"
        >
          Two hearts, one journey,
          <br />
          one beautiful beginning.
        </motion.p>

        {/* Names */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-12 font-serif text-[3.5rem] font-light leading-none tracking-[-0.03em] sm:text-[5rem]"
        >
          {wedding.groom}
          <span className="mx-3 text-[#b7ad9d]">
            &
          </span>
          {wedding.bride}
        </motion.h2>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <p className="text-[8px] font-medium uppercase tracking-[0.4em] text-white/40">
            {wedding.date}
          </p>

          <p className="mt-4 text-[8px] uppercase tracking-[0.3em] text-white/25">
            {wedding.location.full}
          </p>
        </motion.div>

        {/* Divider */}
        <div className="mx-auto my-12 h-px w-10 bg-white/15" />

        {/* Thank you */}
        <p className="text-[9px] leading-6 text-white/30">
          Thank you for being part of our special day.
        </p>

        {/* Copyright / closing */}
        <p className="mt-10 text-[6px] uppercase tracking-[0.35em] text-white/20">
          With love · Lionel & Aline
        </p>
      </div>
    </footer>
  );
}