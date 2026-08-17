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
      className="bg-[#f5f2eb] px-6 py-32 sm:py-40"
    >
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[9px] font-medium uppercase tracking-[0.45em] text-black/40"
          >
            Kindly Respond
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-serif text-[3rem] font-light leading-none sm:text-[4rem]"
          >
            Will You Join Us?
          </motion.h2>

          <p className="mx-auto mt-6 max-w-md font-serif text-[14px] italic leading-7 text-black/50">
            Your presence would mean so much to us. Please let us know
            if you will be joining us on our special day.
          </p>
        </div>

        {/* Success message */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-16 max-w-lg border border-black/10 px-8 py-14 text-center"
          >
            <p className="font-serif text-3xl">
              Thank You
            </p>

            <p className="mt-4 text-[11px] leading-6 text-black/50">
              Your RSVP has been received. We look forward to
              celebrating with you!
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 text-[8px] uppercase tracking-[0.3em] text-black/50 underline underline-offset-4"
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
            <div className="border-b border-black/15 pb-3">
              <label
                htmlFor="name"
                className="block text-[8px] font-medium uppercase tracking-[0.3em] text-black/40"
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
                className="mt-3 w-full bg-transparent font-serif text-[18px] outline-none placeholder:text-black/25"
              />
            </div>

            {/* Phone */}
            <div className="mt-10 border-b border-black/15 pb-3">
              <label
                htmlFor="phone"
                className="block text-[8px] font-medium uppercase tracking-[0.3em] text-black/40"
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
                className="mt-3 w-full bg-transparent font-serif text-[18px] outline-none placeholder:text-black/25"
              />
            </div>

            {/* Attendance */}
            <div className="mt-10">
              <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-black/40">
                Will you attend?
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
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

                  <div className="border border-black/10 py-4 text-center transition peer-checked:border-black peer-checked:bg-black peer-checked:text-[#f5f2eb]">
                    <span className="text-[9px] uppercase tracking-[0.25em]">
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

                  <div className="border border-black/10 py-4 text-center transition peer-checked:border-black peer-checked:bg-black peer-checked:text-[#f5f2eb]">
                    <span className="text-[9px] uppercase tracking-[0.25em]">
                      Regretfully Decline
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Number of guests */}
            <div className="mt-10 border-b border-black/15 pb-3">
              <label
                htmlFor="guests"
                className="block text-[8px] font-medium uppercase tracking-[0.3em] text-black/40"
              >
                Number of Guests
              </label>

              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="mt-3 w-full bg-transparent font-serif text-[18px] outline-none"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
              </select>
            </div>

            {/* Message */}
            <div className="mt-10 border-b border-black/15 pb-3">
              <label
                htmlFor="message"
                className="block text-[8px] font-medium uppercase tracking-[0.3em] text-black/40"
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
                className="mt-3 w-full resize-none bg-transparent font-serif text-[18px] leading-7 outline-none placeholder:text-black/25"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-12 w-full bg-[#0b0b0b] py-5 text-[9px] font-medium uppercase tracking-[0.35em] text-[#f5f2eb] transition hover:bg-black/80"
            >
              Send RSVP
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}