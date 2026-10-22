"use client";

import { useState } from "react";

const inputClass =
  "mt-2 w-full border border-[#dedbce] bg-[#fdfcf9] px-4 py-3 text-sm text-[#414938] outline-none transition-colors placeholder:text-[#aaa99e] focus:border-[#7c8067]";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    // Connect this handler to your email service before launch.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="border border-[#dedbce] bg-[#f8f6f0] p-8 text-center"
      >
        <p className="font-marcellus text-2xl text-[#414938]">
          Thank you for reaching out.
        </p>
        <p className="mt-3 text-sm leading-7 text-[#686a60]">
          The form is not connected to an email service yet, so your message has
          not been sent. Please connect the form before accepting enquiries.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 border-b border-[#858772] pb-1 text-xs uppercase tracking-[0.15em] text-[#414938]"
        >
          Return to form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-xs uppercase tracking-[0.15em] text-[#686a60]"
          >
            Your name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-xs uppercase tracking-[0.15em] text-[#686a60]"
          >
            Email address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="enquiry"
          className="text-xs uppercase tracking-[0.15em] text-[#686a60]"
        >
          What are you enquiring about? *
        </label>
        <select
          id="enquiry"
          name="enquiry"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Select an enquiry
          </option>
          <option value="accommodation">Accommodation</option>
          <option value="experiences">Experiences and activities</option>
          <option value="booking">An existing booking</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="arrival"
            className="text-xs uppercase tracking-[0.15em] text-[#686a60]"
          >
            Arrival date
          </label>
          <input
            id="arrival"
            name="arrival"
            type="date"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="guests"
            className="text-xs uppercase tracking-[0.15em] text-[#686a60]"
          >
            Number of guests
          </label>
          <select
            id="guests"
            name="guests"
            defaultValue="2"
            className={inputClass}
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5+">5 or more</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-xs uppercase tracking-[0.15em] text-[#686a60]"
        >
          Your message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us a little about the stay you have in mind..."
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-3 bg-[#414938] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#30372a] sm:w-auto"
      >
        Send your enquiry
        <span aria-hidden="true">↗</span>
      </button>

      <p className="text-xs leading-5 text-[#858579]">
        Fields marked with * are required.
      </p>
    </form>
  );
}
