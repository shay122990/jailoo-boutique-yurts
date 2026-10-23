import PageHero from "../_components/PageHero";
import ContactSection from "./_components/ContactSection";

export const metadata = {
  title: "Contact | Jailoo",
  description:
    "Plan your stay at Jailoo. Get in touch with us to enquire about your mountain retreat in Kyrgyzstan.",
};

export default function Contact() {
  return (
    <main>
      <PageHero
        image="/contact.jpg"
        imageAlt="The peaceful mountain landscapes of Kyrgyzstan"
        eyebrow="We'd love to hear from you"
        title={
          <>
            Your Journey
            <br />
            Starts Here
          </>
        }
        description="Have a question, dreaming of a mountain escape, or ready to plan something unforgettable? We are here to help."
      />
      <ContactSection />
    </main>
  );
}
