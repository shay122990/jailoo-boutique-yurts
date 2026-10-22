import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="bg-[#f8f6f0] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        {/* Contact information */}
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#7c8067]">
            Get in touch
          </p>

          <h2 className="font-marcellus text-4xl leading-tight text-[#414938] md:text-5xl">
            Let&apos;s make
            <br />
            it memorable.
          </h2>

          <p className="mt-6 max-w-md text-sm leading-7 text-[#686a60] md:text-base">
            Every great journey begins with a conversation. Tell us what you
            have in mind, and let&apos;s start planning your time in the
            mountains of Kyrgyzstan.
          </p>

          <div className="mt-12 space-y-8">
            <div className="border-t border-[#dedbce] pt-6">
              <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[#7c8067]">
                Find us
              </p>
              <p className="font-marcellus text-xl text-[#414938]">
                Kyrgyzstan
              </p>
              <p className="mt-2 text-sm leading-6 text-[#686a60]">
                A mountain retreat inspired by the beauty and traditions of the
                Kyrgyz landscape.
              </p>
            </div>

            <div className="border-t border-[#dedbce] pt-6">
              <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[#7c8067]">
                Planning your stay?
              </p>
              <p className="font-marcellus text-xl text-[#414938]">
                We&apos;re here to help.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#686a60]">
                Ask us about accommodation, experiences, or creating a stay that
                feels uniquely yours.
              </p>
            </div>
          </div>
        </div>

        {/* Enquiry form */}
        <div className="bg-white p-6 shadow-sm sm:p-10 md:p-12">
          <div className="mb-8">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#7c8067]">
              Send us a message
            </p>

            <h3 className="font-marcellus text-3xl text-[#414938]">
              How can we help?
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#686a60]">
              Share a few details and tell us about your plans.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
