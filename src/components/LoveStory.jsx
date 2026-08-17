import { motion } from "framer-motion";
import { wedding } from "../data/wedding";

export default function LoveStory() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[#090909] px-6 py-32 text-[#f5f2eb] sm:py-40 lg:py-44"
    >
      {/* Very subtle LA background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-[18rem] font-light tracking-[-0.12em] text-white/[0.018] sm:text-[25rem] md:text-[30rem]">
          L
          <span className="-ml-10">A</span>
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[9px] font-medium uppercase tracking-[0.45em] text-white/45 sm:text-[10px]"
        >
          A Love Story
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="
            mx-auto
            mt-7
            max-w-[760px]
            font-serif
            text-[3rem]
            font-light
            leading-[0.95]
            tracking-[-0.025em]
            text-[#f5f2eb]
            sm:text-[4rem]
            md:text-[4.7rem]
          "
        >
          Two Families,
          <br />
          One Celebration
        </motion.h2>

        {/* Bible verse */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-14"
        >
          <p className="font-serif text-[17px] italic leading-8 text-white/70 sm:text-[19px]">
            {wedding.story.quote}
          </p>

          <p className="mt-4 text-[8px] font-medium uppercase tracking-[0.4em] text-white/40">
            {wedding.story.reference}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto my-16 h-px w-10 bg-white/20"
        />

        {/* Family invitation */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="
            mx-auto
            max-w-[760px]
            font-serif
            text-[16px]
            leading-8
            text-white/75
            sm:text-[17px]
            sm:leading-9
          "
        >
          {wedding.story.text}
        </motion.p>

        {/* Couple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="
            mt-20
            flex
            items-start
            justify-center
            gap-16
            sm:gap-28
            md:gap-36
          "
        >
          {/* Bride */}
          <div className="text-center">
            <p className="font-serif text-[2.4rem] font-light sm:text-[2.8rem]">
              {wedding.story.bride.name}
            </p>

            <p className="mt-3 text-[8px] font-medium uppercase tracking-[0.35em] text-white/35">
              {wedding.story.bride.familyName}
            </p>
          </div>

          {/* Heart */}
          <div className="pt-4">
            <span className="font-serif text-xl text-[#b7ad9d]">
              ♥
            </span>
          </div>

          {/* Groom */}
          <div className="text-center">
            <p className="font-serif text-[2.4rem] font-light sm:text-[2.8rem]">
              {wedding.story.groom.name}
            </p>

            <p className="mt-3 text-[8px] font-medium uppercase tracking-[0.35em] text-white/35">
              {wedding.story.groom.familyName}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}