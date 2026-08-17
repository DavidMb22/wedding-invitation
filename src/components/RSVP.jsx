import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendance: "",
    guests: "1",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { error } = await supabase
      .from("wedding_rsvps")
      .insert({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        attendance: formData.attendance,
        guests: Number(formData.guests),
        message: formData.message.trim() || null,
      });

    if (error) {
      console.error("RSVP submission error:", error);

      alert(
        "Something went wrong while submitting your RSVP. Please try again."
      );

      return;
    }

    setSubmitted(true);
  }

  return (
    <section
      id="rsvp"
      className="bg-[#f5f2eb] px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-semibold uppercase tracking-[0.4em] text-black/55 sm:text-[11px]"
          >
            Kindly Respond
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-serif text-[2.7rem] font-light leading-tight text-black/90 sm:text-[4rem]"
          >
            Will You Join Us?
          </motion.h2>

          <p className="mx-auto mt-6 max-w-xl font-serif text-base italic leading-7 text-black/65 sm:text-lg sm:leading-8">
            Your presence would mean so much to us. Please let us know
            if you will be joining us on our special day.
          </p>
        </div>

        {/* Success message */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-16 max-w-lg border border-black/15 px-8 py-14 text-center"
          >
            <p className="font-serif text-3xl text-black/90">
              Thank You
            </p>

            <p className="mt-4 text-sm leading-7 text-black/65">
              Your RSVP has been received. We look forward to
              celebrating with you!
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 text-[10px] font-medium uppercase tracking-[0.3em] text-black/60 underline underline-offset-4 transition hover:text-black"
            >
              Edit RSVP
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            onSubmit={handleSubmit}
            className="mx-auto mt-16 max-w-lg"
          >

            {/* Name */}
            <div className="border-b border-black/20 pb-4">
              <label
                htmlFor="name"
                className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60 sm:text-[11px]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="mt-3 w-full bg-transparent font-serif text-lg text-black/85 outline-none placeholder:text-black/45 sm:text-xl"
              />
            </div>

            {/* Phone */}
            <div className="mt-10 border-b border-black/20 pb-4">
              <label
                htmlFor="phone"
                className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60 sm:text-[11px]"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+250 ..."
                className="mt-3 w-full bg-transparent font-serif text-lg text-black/85 outline-none placeholder:text-black/45 sm:text-xl"
              />
            </div>

            {/* Attendance */}
            <div className="mt-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60 sm:text-[11px]">
                Will you attend?
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === "yes"}
                    onChange={handleChange}
                    required
                    className="peer sr-only"
                  />

                  <div className="flex min-h-[68px] items-center justify-center border border-black/15 px-4 text-center transition hover:border-black/30 peer-checked:border-black peer-checked:bg-black peer-checked:text-[#f5f2eb]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px]">
                      Joyfully Accept
                    </span>
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === "no"}
                    onChange={handleChange}
                    className="peer sr-only"
                  />

                  <div className="flex min-h-[68px] items-center justify-center border border-black/15 px-4 text-center transition hover:border-black/30 peer-checked:border-black peer-checked:bg-black peer-checked:text-[#f5f2eb]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px]">
                      Regretfully Decline
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Number of guests */}
            <div className="mt-10 border-b border-black/20 pb-4">
              <label
                htmlFor="guests"
                className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60 sm:text-[11px]"
              >
                Number of Guests
              </label>

              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="mt-3 w-full bg-transparent font-serif text-lg text-black/85 outline-none sm:text-xl"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
              </select>
            </div>

            {/* Message */}
            <div className="mt-10 border-b border-black/20 pb-4">
              <label
                htmlFor="message"
                className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/60 sm:text-[11px]"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Leave a message for the couple..."
                className="mt-3 w-full resize-none bg-transparent font-serif text-lg leading-7 text-black/85 outline-none placeholder:text-black/45 sm:text-xl"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-12 w-full bg-[#0b0b0b] py-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f5f2eb] transition hover:bg-black/80 sm:text-[11px]"
            >
              Send RSVP
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}