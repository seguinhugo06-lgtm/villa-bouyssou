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
import SuperhoteBadge from "@/components/ui/SuperhoteBadge";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "La Villa Bouyssou",
    description:
      "Villa contemporaine avec piscine chauffée à 500m du centre historique de Sarlat-la-Canéda, Périgord Noir",
    url: "https://villa-bouyssou.vercel.app",
    image: "https://villa-bouyssou.vercel.app/images/hero/terrasse-piscine.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7 Route de la Verperie",
      addressLocality: "Sarlat-la-Canéda",
      postalCode: "24200",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.8897,
      longitude: 1.2162,
    },
    numberOfRooms: 3,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Piscine chauffée",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Climatisation",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Wi-Fi fibre",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Parking gratuit",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Cheminée",
        value: true,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      reviewCount: "10",
    },
    priceRange: "380€ - 505€ / nuit",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <SuperhoteBadge />
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
