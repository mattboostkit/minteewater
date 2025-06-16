import HeroSection from "@/components/hero-section";
import BenefitsSection from "@/components/benefits-section";
import ShopSection from "@/components/shop-section";
import SubscriptionSection from "@/components/subscription-section";
import AboutSection from "@/components/about-section";
import SustainabilitySection from "@/components/sustainability-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <ShopSection />
      <SubscriptionSection />
      <AboutSection />
      <SustainabilitySection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
