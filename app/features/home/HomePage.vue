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
    "Enisa Healing & Massage - Helende Massages & Ontspanning in Amsterdam Noord",
  description:
    "Ervaar diepe ontspanning en heling in Amsterdam Noord met persoonlijke massages en behandelingen door Enisa. Boek vandaag nog uw sessie voor rust en balans.",
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

useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: "/images/hero.webp",
      fetchpriority: "high",
    },
  ],
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
