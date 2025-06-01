<script setup lang="ts">
interface Props {
  treatment: any;
}

const props = defineProps<Props>();
const routes = useRoutes();
</script>

<template>
  <div class="bg-gradient-to-br from-primary-50 to-secondary-50">
    <!-- Call-to-Action Section -->
    <section class="py-16 sm:py-24">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-neutral-900 mb-4">
              Klaar voor jouw {{ treatment.title?.toLowerCase() }}?
            </h2>
            <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
              Boek vandaag nog je afspraak en ervaar de voordelen van deze
              transformerende behandeling.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Quick Booking Card -->
            <UCard class="shadow-lg">
              <template #header>
                <div class="flex items-center gap-3">
                  <UIcon
                    name="i-mdi-calendar-check"
                    class="w-6 h-6 text-primary-500"
                  />
                  <h3 class="text-xl font-semibold">Snel Boeken</h3>
                </div>
              </template>

              <div class="space-y-4">
                <p class="text-neutral-600">
                  Plan direct je {{ treatment.title?.toLowerCase() }} in via ons
                  boekingssysteem.
                </p>
                <ul class="space-y-2 text-sm text-neutral-600">
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-mdi-check-circle"
                      class="w-4 h-4 text-green-500"
                    />
                    <span>Beschikbaarheid in real-time</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-mdi-check-circle"
                      class="w-4 h-4 text-green-500"
                    />
                    <span>Directe bevestiging</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-mdi-check-circle"
                      class="w-4 h-4 text-green-500"
                    />
                    <span>Eenvoudig wijzigen</span>
                  </li>
                </ul>
              </div>

              <template #footer>
                <UButton
                  :to="routes.pages.booking"
                  size="lg"
                  block
                  icon="i-mdi-calendar"
                >
                  Boek Nu
                </UButton>
              </template>
            </UCard>

            <!-- Contact Card -->
            <UCard class="shadow-lg">
              <template #header>
                <div class="flex items-center gap-3">
                  <UIcon
                    name="i-mdi-phone"
                    class="w-6 h-6 text-secondary-500"
                  />
                  <h3 class="text-xl font-semibold">Vragen?</h3>
                </div>
              </template>

              <div class="space-y-4">
                <p class="text-neutral-600">
                  Heb je specifieke vragen over deze behandeling? Neem gerust
                  contact op.
                </p>
                <ul class="space-y-2 text-sm text-neutral-600">
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-mdi-phone"
                      class="w-4 h-4 text-secondary-500"
                    />
                    <span>+31 6 12 34 56 78</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-mdi-email"
                      class="w-4 h-4 text-secondary-500"
                    />
                    <span>info@enisahealing.nl</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-mdi-clock-outline"
                      class="w-4 h-4 text-secondary-500"
                    />
                    <span>Reactie binnen 24 uur</span>
                  </li>
                </ul>
              </div>

              <template #footer>
                <UButton
                  to="/contact"
                  size="lg"
                  block
                  variant="outline"
                  color="secondary"
                  icon="i-mdi-email"
                >
                  Neem Contact Op
                </UButton>
              </template>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
