<script setup lang="ts">
defineProps<{
  title?: string;
  image?: string;
  imageAlt?: string;
  items?: string[];
}>();
</script>

<template>
  <section class="not-prose py-16 sm:py-24">
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
        <!-- Image -->
        <div class="lg:col-span-1">
          <div class="relative">
            <NuxtImg
              v-if="image"
              :src="image"
              :alt="imageAlt || 'Behandeling'"
              class="w-full h-64 sm:h-80 lg:h-64 object-cover rounded-xl shadow-lg"
              format="webp"
              quality="80"
              loading="lazy"
              sizes="sm:100vw lg:33vw"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"/>
          </div>
        </div>

        <!-- Content -->
        <div class="lg:col-span-2">
          <h2 v-if="title" class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            {{ title }}
          </h2>
          
          <div class="prose prose-lg prose-neutral max-w-none mb-6">
            <slot />
          </div>

          <ul v-if="items && items.length" class="space-y-3">
            <li 
              v-for="(item, index) in items" 
              :key="index"
              class="flex items-start gap-3"
            >
              <UIcon
                name="i-mdi-check-circle" 
                class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
              />
              <span class="text-neutral-700 text-lg">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </UContainer>
  </section>
</template>
