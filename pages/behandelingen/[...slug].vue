<script setup lang="ts">
const slug = useRoute().params.slug;
const { data: treatment } = await useAsyncData(`treatment-${slug}`, () => {
  return queryCollection('treatments').path(`/treatments/${slug}`).first();
});

// Enhanced SEO meta with proper error handling
useSeoMeta({
  title: treatment.value?.title
    ? `${treatment.value.title} - Enisa Healing & Massage`
    : 'Behandeling - Enisa Healing & Massage',
  description:
    treatment.value?.description ||
    'Ontdek onze professionele healing en massage behandelingen voor ontspanning en welzijn.',
});

const routes = useRoutes();
</script>

<template>
  <article v-if="treatment">
    <!-- Treatment Content -->
    <ContentRenderer :value="treatment" />

    <!-- Call-to-Action Section -->
    <section
      class="bg-gradient-to-br from-primary-50 to-secondary-50 py-16 sm:py-24"
    >
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

    <!-- Related Treatments -->
    <section class="py-16 sm:py-24">
      <UContainer>
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-neutral-900 mb-4">
              Andere Behandelingen
            </h2>
            <p class="text-neutral-600 max-w-2xl mx-auto">
              Ontdek onze andere healing en massage behandelingen die perfect
              kunnen aanvullen op jouw welzijnsreis.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Healing Treatment -->
            <UCard class="group hover:shadow-lg transition-shadow duration-300">
              <template #header>
                <div class="flex items-center gap-3">
                  <UIcon
                    name="i-mdi-sparkles"
                    class="w-6 h-6 text-primary-500"
                  />
                  <h3 class="text-lg font-semibold">Healing Behandelingen</h3>
                </div>
              </template>

              <div class="space-y-3">
                <p class="text-neutral-600 text-sm">
                  Energetische behandelingen voor diepere genezing en balans.
                </p>
                <ul class="space-y-1 text-xs text-neutral-500">
                  <li>• Chakra Balancering</li>
                  <li>• Energetische Healing</li>
                  <li>• Reiki Behandeling</li>
                </ul>
              </div>

              <template #footer>
                <UButton to="/behandelingen" variant="ghost" size="sm" block>
                  Bekijk Healing
                  <UIcon name="i-mdi-arrow-right" class="w-4 h-4 ml-1" />
                </UButton>
              </template>
            </UCard>

            <!-- Massage Treatment -->
            <UCard class="group hover:shadow-lg transition-shadow duration-300">
              <template #header>
                <div class="flex items-center gap-3">
                  <UIcon
                    name="i-mdi-account-group"
                    class="w-6 h-6 text-secondary-500"
                  />
                  <h3 class="text-lg font-semibold">Massage Behandelingen</h3>
                </div>
              </template>

              <div class="space-y-3">
                <p class="text-neutral-600 text-sm">
                  Traditionele massages voor ontspanning en herstel.
                </p>
                <ul class="space-y-1 text-xs text-neutral-500">
                  <li>• Klassieke Massage</li>
                  <li>• Zweedse Massage</li>
                  <li>• Sportmassage</li>
                </ul>
              </div>

              <template #footer>
                <UButton to="/behandelingen" variant="ghost" size="sm" block>
                  Bekijk Massages
                  <UIcon name="i-mdi-arrow-right" class="w-4 h-4 ml-1" />
                </UButton>
              </template>
            </UCard>

            <!-- All Treatments -->
            <UCard
              class="group hover:shadow-lg transition-shadow duration-300 border-2 border-primary-200"
            >
              <template #header>
                <div class="flex items-center gap-3">
                  <UIcon name="i-mdi-heart" class="w-6 h-6 text-green-500" />
                  <h3 class="text-lg font-semibold">Alle Behandelingen</h3>
                </div>
              </template>

              <div class="space-y-3">
                <p class="text-neutral-600 text-sm">
                  Bekijk ons complete aanbod aan healing en massage
                  behandelingen.
                </p>
                <div class="bg-green-50 p-3 rounded-lg">
                  <p class="text-xs text-green-700 font-medium">
                    💡 Niet zeker welke behandeling het beste bij je past?
                    Bekijk alle opties!
                  </p>
                </div>
              </div>

              <template #footer>
                <UButton to="/behandelingen" size="sm" block>
                  Alle Behandelingen
                  <UIcon name="i-mdi-arrow-right" class="w-4 h-4 ml-1" />
                </UButton>
              </template>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>
  </article>

  <!-- Error State -->
  <div
    v-else
    class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center"
  >
    <UContainer>
      <div class="max-w-2xl mx-auto text-center">
        <UCard class="shadow-xl">
          <template #header>
            <div class="flex items-center justify-center">
              <div class="bg-red-100 p-4 rounded-full">
                <UIcon name="i-mdi-alert-circle" class="w-8 h-8 text-red-600" />
              </div>
            </div>
          </template>

          <div class="space-y-6">
            <div>
              <h1 class="text-3xl font-bold text-neutral-900 mb-3">
                Behandeling Niet Gevonden
              </h1>
              <p class="text-neutral-600 leading-relaxed">
                De opgevraagde behandeling bestaat niet of is momenteel niet
                beschikbaar. Bekijk ons complete aanbod van healing en massage
                behandelingen.
              </p>
            </div>

            <div class="bg-neutral-50 p-4 rounded-lg">
              <h3 class="font-semibold text-neutral-900 mb-2">
                Populaire behandelingen:
              </h3>
              <ul class="space-y-1 text-sm text-neutral-600">
                <li class="flex items-center gap-2">
                  <UIcon
                    name="i-mdi-sparkles"
                    class="w-4 h-4 text-primary-500"
                  />
                  <span>Chakra Balancering</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon
                    name="i-mdi-account-group"
                    class="w-4 h-4 text-secondary-500"
                  />
                  <span>Klassieke Ontspanningsmassage</span>
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-mdi-dumbbell" class="w-4 h-4 text-green-500" />
                  <span>Sportmassage</span>
                </li>
              </ul>
            </div>
          </div>

          <template #footer>
            <div class="flex flex-col sm:flex-row gap-3">
              <UButton
                to="/behandelingen"
                icon="i-mdi-format-list-bulleted"
                block
              >
                Alle Behandelingen
              </UButton>
              <UButton to="/" variant="outline" icon="i-mdi-home" block>
                Naar Homepage
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
