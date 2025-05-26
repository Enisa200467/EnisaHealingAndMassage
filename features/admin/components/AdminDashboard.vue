<script setup lang="ts">
// Admin dashboard component
const stats = ref({
  totalBookings: 142,
  pendingReviews: 8,
  monthlyRevenue: 4250,
  upcomingAppointments: 23
})

const recentBookings = ref([
  { id: 1, client: 'Emma S.', treatment: 'Chakra Balancering', date: '2024-01-15', time: '10:00', status: 'confirmed' },
  { id: 2, client: 'Lotte M.', treatment: 'Sportmassage', date: '2024-01-15', time: '14:00', status: 'pending' },
  { id: 3, client: 'Jan P.', treatment: 'Zweedse Massage', date: '2024-01-16', time: '11:00', status: 'confirmed' }
])

const pendingReviews = ref([
  { id: 1, client: 'Maria K.', treatment: 'Energetische Healing', rating: 5, content: 'Geweldige ervaring, zeer ontspannend...' },
  { id: 2, client: 'Peter J.', treatment: 'Klassieke Massage', rating: 4, content: 'Goed geholpen, professioneel...' }
])
</script>

<template>
  <div class="space-y-8">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600">Boekingen Deze Maand</p>
            <p class="text-2xl font-bold text-neutral-900">{{ stats.totalBookings }}</p>
          </div>
          <UIcon name="i-mdi-calendar-check" class="w-8 h-8 text-primary-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600">Reviews Te Beoordelen</p>
            <p class="text-2xl font-bold text-neutral-900">{{ stats.pendingReviews }}</p>
          </div>
          <UIcon name="i-mdi-comment-processing" class="w-8 h-8 text-orange-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600">Omzet Deze Maand</p>
            <p class="text-2xl font-bold text-neutral-900">€{{ stats.monthlyRevenue.toLocaleString() }}</p>
          </div>
          <UIcon name="i-mdi-currency-eur" class="w-8 h-8 text-green-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600">Komende Afspraken</p>
            <p class="text-2xl font-bold text-neutral-900">{{ stats.upcomingAppointments }}</p>
          </div>
          <UIcon name="i-mdi-clock-outline" class="w-8 h-8 text-blue-500" />
        </div>
      </UCard>
    </div>

    <!-- Recent Bookings -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Recente Boekingen</h2>
          <UButton variant="outline" size="sm" to="/admin/bookings">
            Alle Boekingen
          </UButton>
        </div>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-neutral-200">
              <th class="text-left py-3 text-sm font-medium text-neutral-600">Klant</th>
              <th class="text-left py-3 text-sm font-medium text-neutral-600">Behandeling</th>
              <th class="text-left py-3 text-sm font-medium text-neutral-600">Datum</th>
              <th class="text-left py-3 text-sm font-medium text-neutral-600">Tijd</th>
              <th class="text-left py-3 text-sm font-medium text-neutral-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in recentBookings" :key="booking.id" class="border-b border-neutral-100">
              <td class="py-3 text-sm text-neutral-900">{{ booking.client }}</td>
              <td class="py-3 text-sm text-neutral-600">{{ booking.treatment }}</td>
              <td class="py-3 text-sm text-neutral-600">{{ booking.date }}</td>
              <td class="py-3 text-sm text-neutral-600">{{ booking.time }}</td>
              <td class="py-3">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                ]">
                  {{ booking.status === 'confirmed' ? 'Bevestigd' : 'In afwachting' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <!-- Pending Reviews -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Reviews Te Beoordelen</h2>
          <UButton variant="outline" size="sm" to="/admin/reviews">
            Alle Reviews
          </UButton>
        </div>
      </template>

      <div class="space-y-4">
        <div v-for="review in pendingReviews" :key="review.id" class="border border-neutral-200 rounded-lg p-4">
          <div class="flex items-start justify-between mb-3">
            <div>
              <h4 class="font-medium text-neutral-900">{{ review.client }}</h4>
              <p class="text-sm text-neutral-600">{{ review.treatment }}</p>
            </div>
            <StarRating :rating="review.rating" size="sm" />
          </div>
          
          <p class="text-sm text-neutral-700 mb-4">{{ review.content }}</p>
          
          <div class="flex gap-2">
            <UButton size="sm" variant="outline" color="green">
              Goedkeuren
            </UButton>
            <UButton size="sm" variant="outline" color="red">
              Afwijzen
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
