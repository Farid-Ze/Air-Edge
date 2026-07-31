import HeroSection from "@/components/HeroSection";
import EventInfo from "@/components/EventInfo";
import SpeakerSection from "@/components/SpeakerSection";
import RegistrationForm from "@/components/RegistrationForm";
import PartnersFooter from "@/components/PartnersFooter";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Section 1: Hero — Title, Models, CTA */}
      <HeroSection />

      {/* Section 2: Event Schedule Cards */}
      <EventInfo />

      {/* Section 3: Guest Speakers */}
      <SpeakerSection />

      {/* Section 4: Registration Form */}
      <RegistrationForm />

      {/* Section 5: Partners & Footer */}
      <PartnersFooter />
    </main>
  );
}
