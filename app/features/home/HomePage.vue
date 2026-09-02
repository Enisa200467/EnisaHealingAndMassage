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
import { useVideos } from '~/composables/useVideos';

const VideoCarousel = defineAsyncComponent(
  () => import('~/components/VideoCarousel.vue')
);

const { promotionalVideos } = useVideos();
</script>
