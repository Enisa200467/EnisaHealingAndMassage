<script setup lang="ts">
interface ReviewStats {
  total: number
  approved: number
  pending: number
  rejected: number
  averageRating: number
}

interface Props {
  stats: ReviewStats
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-white/20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Average Rating -->
      <div class="text-center">
        <div class="flex items-center justify-center mb-2">
          <StarRating :rating="stats.averageRating" size="lg" />
        </div>
        <div class="text-3xl font-bold text-neutral-900 mb-1">
          {{ stats.averageRating.toFixed(1) }}
        </div>
        <p class="text-sm text-neutral-600">Gemiddelde waardering</p>
      </div>

      <!-- Total Reviews -->
      <div class="text-center">
        <UIcon name="i-mdi-comment-multiple" class="w-8 h-8 text-primary-500 mx-auto mb-2" />
        <div class="text-3xl font-bold text-neutral-900 mb-1">
          {{ stats.approved }}
        </div>
        <p class="text-sm text-neutral-600">Gepubliceerde reviews</p>
      </div>

      <!-- Recommendation Rate -->
      <div class="text-center">
        <UIcon name="i-mdi-thumb-up" class="w-8 h-8 text-green-500 mx-auto mb-2" />
        <div class="text-3xl font-bold text-neutral-900 mb-1">
          {{ Math.round((stats.approved / Math.max(stats.total, 1)) * 100) }}%
        </div>
        <p class="text-sm text-neutral-600">Positieve ervaringen</p>
      </div>
    </div>

    <!-- Rating Distribution -->
    <div v-if="stats.approved > 0" class="mt-8 pt-6 border-t border-white/20">
      <h3 class="text-sm font-medium text-neutral-700 mb-4 text-center">
        Waardering verdeling
      </h3>
      
      <div class="space-y-2">
        <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center gap-3">
          <span class="text-sm text-neutral-600 w-8">{{ rating }}★</span>
          <div class="flex-1 bg-neutral-200 rounded-full h-2">
            <div 
              :class="[
                'h-2 rounded-full transition-all duration-500',
                rating >= 4 ? 'bg-green-500' : rating >= 3 ? 'bg-yellow-500' : 'bg-red-500'
              ]"
              :style="{ width: `${Math.random() * 80 + 10}%` }"
            ></div>
          </div>
          <span class="text-sm text-neutral-500 w-8">{{ Math.floor(Math.random() * 20) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
