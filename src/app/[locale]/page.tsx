import Hero from "@/components/sections/Hero";
import PresentationSection from "@/components/sections/PresentationSection";
import AmenitiesBanner from "@/components/sections/AmenitiesBanner";
import ExteriorHighlights from "@/components/sections/ExteriorHighlights";
import ExteriorCarousel from "@/components/sections/ExteriorCarousel";
import InteriorSection from "@/components/sections/InteriorSection";
import BedroomsSection from "@/components/sections/BedroomsSection";
import LocationSection from "@/components/sections/LocationSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import SeasonalSection from "@/components/sections/SeasonalSection";
import EventsSection from "@/components/sections/EventsSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import BrandingCollage from "@/components/sections/BrandingCollage";
import PlatformsSection from "@/components/sections/PlatformsSection";
import TravelGuideTeaser from "@/components/sections/TravelGuideTeaser";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PresentationSection />
      <AmenitiesBanner />
      <ExteriorHighlights />
      <ExteriorCarousel />
      <InteriorSection />
      <BedroomsSection />
      <LocationSection />
      <WelcomeSection />
      <SeasonalSection />
      <EventsSection />
      <MarqueeSection />
      <BrandingCollage />
      <PlatformsSection />
      <TravelGuideTeaser />
      <ContactSection />
    </>
  );
}
