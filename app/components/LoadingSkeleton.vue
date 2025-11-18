<script setup lang="ts">
interface Props {
  type?: 'text' | 'card' | 'image' | 'circle' | 'button';
  width?: string;
  height?: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  width: '100%',
  height: 'auto',
  count: 1,
});

const skeletonClasses = computed(() => {
  const base = 'animate-pulse bg-gray-200 rounded';

  switch (props.type) {
    case 'text':
      return `${base} h-4`;
    case 'card':
      return `${base} h-48`;
    case 'image':
      return `${base} aspect-video`;
    case 'circle':
      return `${base} rounded-full`;
    case 'button':
      return `${base} h-10`;
    default:
      return base;
  }
});
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="i in count"
      :key="i"
      :class="skeletonClasses"
      :style="{ width, height }"
      role="status"
      aria-label="Laden..."
    />
  </div>
</template>
