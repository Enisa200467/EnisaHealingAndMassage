<script setup lang="ts">
interface Props {
  title?: string;
  icon?: string;
  variant?: 'info' | 'success' | 'warning';
  ctaText?: string;
  ctaLink?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Belangrijk',
  icon: 'i-mdi-information',
  variant: 'info',
  ctaText: '',
  ctaLink: ''
});

// Color schemes based on variant
const colorSchemes = {
  info: {
    bg: 'bg-blue-50/80',
    border: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    buttonColor: 'primary'
  },
  success: {
    bg: 'bg-green-50/80',
    border: 'border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-900',
    buttonColor: 'success'
  },
  warning: {
    bg: 'bg-amber-50/80',
    border: 'border-amber-200',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
    buttonColor: 'warning'
  }
};

const colorScheme = computed(() => colorSchemes[props.variant]);
const showCta = computed(() => props.ctaText && props.ctaLink);
</script>

<template>
  <section class="not-prose w-full my-8">
    <UContainer>
      <div class="max-w-4xl">
        <div
          class="p-6 rounded-xl border-2 shadow-sm"
          :class="[colorScheme.bg, colorScheme.border]"
          role="note"
          aria-live="polite"
        >
          <div class="flex items-start gap-4">
            <UIcon
              :name="icon"
              class="w-6 h-6 flex-shrink-0 mt-1"
              :class="colorScheme.iconColor"
              aria-hidden="true"
            />
            <div class="flex-1 space-y-4">
              <h3
                class="text-xl font-semibold"
                :class="colorScheme.titleColor"
              >
                {{ title }}
              </h3>
              <div class="prose prose-lg max-w-none info-blok-content">
                <slot />
              </div>
              <div v-if="showCta" class="pt-2">
                <UButton
                  :to="ctaLink"
                  :color="colorScheme.buttonColor"
                  size="lg"
                  icon="i-mdi-calendar-check"
                  trailing
                >
                  {{ ctaText }}
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
/* Style slot content (markdown) within info-blok */
.info-blok-content :deep(p) {
  color: rgb(55 65 81); /* gray-700 */
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

.info-blok-content :deep(p:last-child) {
  margin-bottom: 0;
}

.info-blok-content :deep(strong) {
  font-weight: 600;
  color: rgb(17 24 39); /* gray-900 */
}

.info-blok-content :deep(a) {
  color: rgb(59 130 246); /* blue-500 */
  text-decoration: underline;
  transition: color 0.2s;
}

.info-blok-content :deep(a:hover) {
  color: rgb(37 99 235); /* blue-600 */
}

.info-blok-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}

.info-blok-content :deep(li) {
  color: rgb(55 65 81);
  line-height: 1.6;
  margin-bottom: 0.25rem;
}

/* Responsive adjustments */
@media (min-width: 640px) {
  .info-blok-content :deep(p) {
    font-size: 1.0625rem;
  }
}
</style>
