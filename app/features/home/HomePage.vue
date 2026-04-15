<template>
  <div>
    <HomeHero />
    <HomeIntro />
    <HomeTreatments />

    <!-- Video Section -->
    <PageSection>
      <ClientOnly>
        <VideoCarousel
          :videos="promotionalVideos"
          heading="Ontdek Enisa Healing & Massage"
          aria-label="Promotionele video's over Enisa Healing & Massage"
        />
        <template #fallback>
          <div
            class="w-full max-w-4xl mx-auto aspect-video rounded-lg bg-neutral-100"
            aria-hidden="true"
          />
        </template>
      </ClientOnly>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import { useVideos } from "~/composables/useVideos";
import { BUSINESS_INFO, getSchemaAddress, getSchemaContactPoint } from "~/constants/businessInfo";

const VideoCarousel = defineAsyncComponent(
  () => import("~/components/VideoCarousel.vue"),
);

const { promotionalVideos } = useVideos();

// SEO Meta tags for the homepage
useSeoMeta({
  title:
    "Enisa Healing & Massage | Massage Amsterdam Noord & Healing Amsterdam Noord",
  description:
    "Professionele Massage Amsterdam Noord en Healing Amsterdam Noord bij Enisa Healing & Massage. Ervaar diepe ontspanning, balans en persoonlijke aandacht in een rustige praktijk.",
  ogTitle: "Enisa Healing & Massage - Helende Massages in Amsterdam Noord",
  ogDescription:
    "Ontdek de kracht van helende aanraking in Amsterdam Noord. Persoonlijke massages en energetische behandelingen voor lichaam en geest.",
  ogImage: "/images/hero.webp",
  ogType: "website",
  ogUrl: "https://enisahealingmassage.nl",
  twitterCard: "summary_large_image",
  twitterTitle: "Enisa Healing & Massage - Helende Massages in Amsterdam Noord",
  twitterDescription:
    "Ontdek de kracht van helende aanraking in Amsterdam Noord. Persoonlijke massages en energetische behandelingen voor lichaam en geest.",
  twitterImage: "/images/hero.webp",
});

// Add structured data for the business
useSchemaOrg([
  defineOrganization({
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: "/images/logo.webp",
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: getSchemaContactPoint(),
    address: getSchemaAddress(),
  }),
  defineLocalBusiness({
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    image: "/images/hero.webp",
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
