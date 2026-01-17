<template>
  <div class="video-carousel-container">
    <!-- Heading if provided -->
    <h2
      v-if="heading"
      :id="headingId"
      class="text-3xl font-bold text-neutral-900 mb-8 text-center"
    >
      {{ heading }}
    </h2>

    <!-- Live region for carousel announcements -->
    <div
      v-if="videos.length > 0"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ currentVideoAnnouncement }}
    </div>

    <!-- Video Carousel -->
    <UCarousel
      v-if="videos.length > 0"
      v-slot="{ item }"
      :items="videos"
      :ui="{ item: 'basis-full' }"
      dots
      arrows
      indicators
      class="w-full max-w-4xl mx-auto"
      :aria-label="ariaLabel || 'Video carousel'"
      aria-roledescription="carousel"
      @update:modelValue="onVideoChange"
    >
      <VideoEmbed :url="item.url" :title="item.title" />
    </UCarousel>

    <!-- Empty state -->
    <div
      v-else
      class="text-center py-12 text-neutral-500 dark:text-neutral-400"
    >
      <UIcon name="i-mdi-video-off" class="w-12 h-12 mx-auto mb-4" />
      <p>Geen video's beschikbaar.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Video {
  url: string;
  title: string;
}

interface Props {
  videos?: Video[];
  heading?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  videos: () => [],
  heading: undefined,
  ariaLabel: undefined,
});

// Generate heading ID for accessibility
const headingId = computed(() => {
  if (props.heading) {
    return props.heading.toLowerCase().replace(/\s+/g, "-");
  }
  return undefined;
});

// Track current video for accessibility announcements
const currentVideoIndex = ref(0);
const currentVideoAnnouncement = computed(() => {
  const total = props.videos.length;
  if (total > 0 && props.videos[currentVideoIndex.value]) {
    const currentVideo = props.videos[currentVideoIndex.value];
    return `Video ${currentVideoIndex.value + 1} van ${total}: ${currentVideo.title}`;
  }
  return "";
});

const onVideoChange = (index: number) => {
  currentVideoIndex.value = index;
};
</script>

<style scoped>
.video-carousel-container {
  @apply w-full;
}
</style>
