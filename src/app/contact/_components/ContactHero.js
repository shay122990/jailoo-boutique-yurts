import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden md:min-h-[55vh]">
      <Image
        src="/contact.jpg"
        alt="The peaceful mountain landscapes of Kyrgyzstan"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white">
        <p className="mb-5 text-xs uppercase tracking-[0.35em]">
          We&apos;d love to hear from you
        </p>

        <h1 className="font-marcellus text-5xl leading-tight md:text-7xl">
          Your Journey
          <br />
          Starts Here
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
          Have a question, dreaming of a mountain escape, or ready to plan
          something unforgettable? We are here to help.
        </p>
      </div>
    </section>
  );
}
