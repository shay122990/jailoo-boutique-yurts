import ContactHero from "./_components/ContactHero";
import ContactSection from "./_components/ContactSection";

export const metadata = {
  title: "Contact | Jailoo",
  description:
    "Plan your stay at Jailoo. Get in touch with us to enquire about your mountain retreat in Kyrgyzstan.",
};

export default function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactSection />
    </main>
  );
}
