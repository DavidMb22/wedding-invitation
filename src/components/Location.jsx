import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { wedding } from "../data/wedding";

export default function Location() {
  return (
    <section
      id="location"
      className="bg-[#f5f2eb] px-6 py-32 sm:py-40"
    >
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-semibold uppercase tracking-[0.4em] text-black/55 sm:text-[11px]"
          >
            Find Us Here
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-xl font-serif text-base italic leading-7 text-black/65 sm:text-lg sm:leading-8"
          >
            Our Locations
          </motion.h2>

          <p className="mx-auto mt-6 max-w-xl font-serif text-base italic leading-7 text-black/65 sm:text-lg sm:leading-8">
            We would be delighted to have you with us as we celebrate
            this special day.
          </p>
        </div>

        {/* Location cards */}
        <div className="mt-20 grid gap-px bg-black/10 md:grid-cols-2">

          {/* Church */}
          <LocationCard
            time="1:00 PM"
            label="CHURCH SERVICE"
            location={wedding.locations.church}
          />

          {/* Reception */}
          <LocationCard
            time="4:00 PM"
            label="RECEPTION"
            location={wedding.locations.reception}
          />

        </div>

      </div>
    </section>
  );
}

function LocationCard({ time, label, location }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#f5f2eb] p-10 sm:p-14"
    >
      <div className="flex h-full flex-col">

        {/* Time */}
        <p className="font-serif text-[2.7rem] font-light leading-none">
          {time}
        </p>

        {/* Label */}
        <p className="mt-5 text-[8px] font-medium uppercase tracking-[0.4em] text-black/40">
          {label}
        </p>

        {/* Location */}
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <MapPin
              size={17}
              strokeWidth={1}
              className="text-black/50"
            />

            <h3 className="font-serif text-[2rem] font-light">
              {location.name}
            </h3>
          </div>

          <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-black/45">
            {location.city}
          </p>

          <p className="mt-2 text-sm text-black/55">
            {location.country}
          </p>
        </div>

        {/* Map button */}
        <div className="mt-auto pt-12">
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-b border-black/20 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-black/65 transition hover:border-black hover:text-black"
          >
            Get Directions

            <ExternalLink
              size={12}
              strokeWidth={1}
            />
          </a>
        </div>

      </div>
    </motion.div>
  );
}