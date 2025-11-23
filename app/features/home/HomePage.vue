<template>
  <div>
    <HomeHero />
    <HomeIntro />
    <HomeTreatments />

    <!-- Video Section -->
    <PageSection>
      <VideoCarousel
        :videos="promotionalVideos"
        heading="Ontdek Enisa Healing & Massage"
        aria-label="Promotionele video's over Enisa Healing & Massage"
      />
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import { useVideos } from "~/composables/useVideos";
import { BUSINESS_INFO, getSchemaAddress, getSchemaContactPoint } from "~/constants/businessInfo";

const { promotionalVideos } = useVideos();

// SEO Meta tags for the homepage
useSeoMeta({
  title:
    "Enisa Healing & Massage - Helende Massages & Ontspanning in Nederland",
  description:
    "Ervaar diepe ontspanning en heling met persoonlijke massages en behandelingen door Enisa. Boek vandaag nog uw sessie voor rust en balans.",
  ogTitle: "Enisa Healing & Massage - Helende Massages & Ontspanning",
  ogDescription:
    "Ontdek de kracht van helende aanraking. Persoonlijke massages en energetische behandelingen voor lichaam en geest.",
  ogImage: "/images/hero-banner.jpg",
  ogType: "website",
  ogUrl: "https://enisahealingmassage.nl",
  twitterCard: "summary_large_image",
  twitterTitle: "Enisa Healing & Massage - Helende Massages & Ontspanning",
  twitterDescription:
    "Ontdek de kracht van helende aanraking. Persoonlijke massages en energetische behandelingen voor lichaam en geest.",
  twitterImage: "/images/hero-banner.jpg",
});

// Add structured data for the business
useSchemaOrg([
  defineOrganization({
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: "/images/logo.jpg",
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: getSchemaContactPoint(),
    address: getSchemaAddress(),
  }),
  defineLocalBusiness({
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    image: "/images/hero-banner.jpg",
    telephone: BUSINESS_INFO.contact.phoneInternational,
    url: BUSINESS_INFO.url,
    priceRange: BUSINESS_INFO.priceRange,
    openingHours: BUSINESS_INFO.hours.schemaFormat,
    address: getSchemaAddress(),
    serviceArea: {
      "@type": "City",
      name: BUSINESS_INFO.address.city,
    },
  }),
]);
</script>
