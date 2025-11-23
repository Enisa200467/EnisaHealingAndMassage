<template>
  <div class="video-embed-container">
    <div
      v-if="embedUrl"
      class="relative w-full overflow-hidden rounded-lg shadow-lg"
      :style="{ paddingBottom: aspectRatio }"
    >
      <iframe
        :src="embedUrl"
        :title="title || 'Video'"
        class="absolute top-0 left-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
      />
    </div>
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
    >
      <UIcon name="i-mdi-alert-circle" class="w-8 h-8 mx-auto mb-2 text-red-500" />
      <p class="text-red-700">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  url: string;
  title?: string;
  aspectRatio?: string;
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: '56.25%', // 16:9 ratio
});

const embedUrl = ref<string | null>(null);
const error = ref<string | null>(null);

// Extract video ID and platform from URL
const parseVideoUrl = (url: string) => {
  // YouTube patterns
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);

  if (youtubeMatch) {
    return {
      platform: 'youtube',
      id: youtubeMatch[1],
    };
  }

  // Vimeo patterns
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);

  if (vimeoMatch) {
    return {
      platform: 'vimeo',
      id: vimeoMatch[1],
    };
  }

  return null;
};

// Generate embed URL based on platform
const generateEmbedUrl = () => {
  const parsed = parseVideoUrl(props.url);

  if (!parsed) {
    error.value = 'Ongeldige video URL. Gebruik een YouTube of Vimeo link.';
    return;
  }

  if (parsed.platform === 'youtube') {
    embedUrl.value = `https://www.youtube.com/embed/${parsed.id}?rel=0`;
  } else if (parsed.platform === 'vimeo') {
    embedUrl.value = `https://player.vimeo.com/video/${parsed.id}`;
  }
};

// Generate embed URL when component mounts or URL changes
watch(() => props.url, generateEmbedUrl, { immediate: true });
</script>

<style scoped>
.video-embed-container {
  @apply w-full;
}
</style>
