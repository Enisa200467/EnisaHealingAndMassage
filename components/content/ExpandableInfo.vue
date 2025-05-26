<script setup lang="ts">
interface Props {
  title?: string;
  expanded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Meer informatie',
  expanded: false
});

const isExpanded = ref(props.expanded);
</script>

<template>
  <section class="additional-info bg-primary-50 w-full">
    <UContainer class="sm:pb-12 sm:pt-6 py-10">
      <div class="max-w-4xl ">
        <UButton
          variant="subtle"
          size="lg"
          class="w-full justify-between text-left p-6 bg-white/80 hover:bg-white border border-pink-200 rounded-xl shadow-sm"
          @click="isExpanded = !isExpanded"
        >
          <div class="flex items-center gap-3">
            <UIcon name="i-mdi-information" size="24" class="text-primary-500" />
            <h2 class="text-xl font-semibold">{{ title }}</h2>
          </div>
          <UIcon 
            :name="isExpanded ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'" 
            size="24"
            class="text-primary-500 transition-transform duration-200"
          />
        </UButton>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-[1000px]"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 max-h-[1000px]"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-show="isExpanded" class="overflow-hidden">
            <div class="mt-4 p-8 bg-white/80 rounded-xl border border-pink-200 shadow-sm">
              <div class="prose prose-lg prose-gray max-w-none">
                <slot />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </UContainer>
  </section>
</template>


<style scoped>
/* Use :deep() to style nested markdown content */
.additional-info :deep(h3) {
  color: rgb(126 34 206); /* primary-600 equivalent */
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.additional-info :deep(h4) {
  color: rgb(31 41 55); /* gray-800 equivalent */
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
  line-height: 1.3;
}

.additional-info :deep(p) {
  color: rgb(55 65 81); /* gray-700 equivalent */
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.additional-info :deep(ul) {
  margin-bottom: 1rem;
}

.additional-info :deep(li) {
  color: rgb(55 65 81); /* gray-700 equivalent */
  line-height: 1.6;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.additional-info :deep(strong) {
  font-weight: 600;
  color: rgb(17 24 39); /* gray-900 equivalent */
}

/* Specific styling for expandable info content */
.additional-info :deep(.prose) {
  max-width: none;
}

.additional-info :deep(.prose h3) {
  color: rgb(126 34 206);
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.additional-info :deep(.prose h3:first-child) {
  margin-top: 0;
}

.additional-info :deep(.prose h4) {
  color: rgb(31 41 55);
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.additional-info :deep(.prose ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}

.additional-info :deep(.prose li) {
  margin-bottom: 0.25rem;
}

/* Responsive adjustments */
@media (min-width: 1024px) {
  .additional-info :deep(h3) {
    font-size: 2.5rem;
  }

  .additional-info :deep(h4) {
    font-size: 1.75rem;
  }

  .additional-info :deep(p) {
    font-size: 1.25rem;
  }
}
</style>