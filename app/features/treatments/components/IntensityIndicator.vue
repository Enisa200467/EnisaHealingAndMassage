<script setup lang="ts">
const props = defineProps<{
  intensity: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}>();

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        text: 'text-sm',
        gap: 'space-y-2',
        label: 'text-xs',
        price: 'text-base',
      };
    case 'lg':
      return {
        text: 'text-base',
        gap: 'space-y-4',
        label: 'text-sm',
        price: 'text-xl',
      };
    default:
      return {
        text: 'text-sm',
        gap: 'space-y-3',
        label: 'text-xs',
        price: 'text-lg',
      };
  }
});
</script>

<template>
  <div class="flex justify-between items-center">
    <span class="text-neutral-600" :class="sizeClasses.text">
      Intensiteit:
    </span>
    <div class="flex items-center gap-2">
      <!-- Intensity dots -->
      <div
        class="flex items-center gap-1"
        role="img"
        :aria-label="`Intensiteit ${intensity} van 5`"
      >
        <div
          v-for="dot in 5"
          :key="dot"
          class="w-2 h-2 rounded-full"
          :class="dot <= intensity ? 'bg-primary-500' : 'bg-neutral-200'"
          :aria-hidden="true"
        />
      </div>
    </div>
  </div>
  <div class="text-right">
    <span class="text-neutral-500" :class="sizeClasses.label">
      {{ label }}
    </span>
  </div>
</template>
