import { motion } from "framer-motion";
import { Church, Camera, Wine } from "lucide-react";
import { wedding } from "../data/wedding";

const icons = [Church, Camera, Wine];

export default function WeddingDetails() {
  return (
    <section
      id="details"
      className="bg-[#f5f2eb] px-6 py-32 sm:py-40"
    >
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[9px] font-medium uppercase tracking-[0.45em] text-black/40"
          >
            Celebration Details
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 font-serif text-[3rem] font-light leading-none tracking-[-0.02em] sm:text-[4rem]"
          >
            The Wedding Journey
          </motion.h2>

          <p className="mt-5 font-serif text-[13px] italic text-black/45">
            {wedding.date} · Gisenyi, Rwanda
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Center line */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-black/10 md:block" />

          <div>
            {wedding.events.map((event, index) => {
              const Icon = icons[index];
              const isRight = index % 2 !== 0;

              return (
                <motion.div
                  key={event.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.12,
                  }}
                  className="relative min-h-[250px] md:grid md:grid-cols-2"
                >

                  {/* LEFT EVENT */}
                  {!isRight && (
                    <div className="flex justify-end pr-20 text-right">
                      <EventContent event={event} />
                    </div>
                  )}

                  {/* RIGHT EVENT */}
                  {isRight && (
                    <div className="col-start-2 flex justify-start pl-20 text-left">
                      <EventContent event={event} />
                    </div>
                  )}

                  {/* Center icon */}
                  <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 md:block">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-[#f5f2eb]">
                      <Icon
                        size={17}
                        strokeWidth={1}
                        className="text-black/50"
                      />
                    </div>
                  </div>

                  {/* Mobile divider */}
                  <div className="mt-8 flex items-center gap-4 md:hidden">
                    <div className="h-px flex-1 bg-black/10" />

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10">
                      <Icon
                        size={14}
                        strokeWidth={1}
                        className="text-black/50"
                      />
                    </div>

                    <div className="h-px flex-1 bg-black/10" />
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventContent({ event }) {
  return (
    <div className="w-full max-w-sm">

      {/* Time */}
      <p className="font-serif text-[2.6rem] font-light leading-none sm:text-[3rem]">
        {event.time}
      </p>

      {/* Label */}
      <p className="mt-4 text-[8px] font-medium uppercase tracking-[0.38em] text-black/40">
        {event.label}
      </p>

      {/* Title */}
      <h3 className="mt-4 font-serif text-[1.7rem] font-light sm:text-[2rem]">
        {event.title}
      </h3>

      {/* Location */}
      <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.25em] text-black/55">
        {event.location}
      </p>

      <p className="mt-2 text-[11px] text-black/40">
        {event.address}
      </p>

    </div>
  );
}