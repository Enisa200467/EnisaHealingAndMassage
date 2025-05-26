<script setup lang="ts">
// Error state component for treatments
</script>

<template>
  <!-- Error State -->
  <div
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
