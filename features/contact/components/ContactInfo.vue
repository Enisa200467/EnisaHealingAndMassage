<script setup lang="ts">
// Contact information display component
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-neutral-900 mb-8">
      Contactgegevens
    </h2>

    <!-- Contact Cards -->
    <div class="space-y-6 mb-12">
      <!-- Phone -->
      <UCard>
        <div class="flex items-start gap-4">
          <div class="bg-primary-100 p-3 rounded-full">
            <UIcon name="i-mdi-phone" class="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-900 mb-2">Telefoon</h3>
            <p class="text-neutral-600 mb-2">
              <ULink href="tel:+31612345678" class="hover:text-primary-600">
                +31 6 12 34 56 78
              </ULink>
            </p>
            <p class="text-sm text-neutral-500">Ma-Za: 9:00 - 18:00 uur</p>
          </div>
        </div>
      </UCard>

      <!-- Email -->
      <UCard>
        <div class="flex items-start gap-4">
          <div class="bg-secondary-100 p-3 rounded-full">
            <UIcon name="i-mdi-email" class="w-6 h-6 text-secondary-600" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-900 mb-2">E-mail</h3>
            <p class="text-neutral-600 mb-2">
              <ULink href="mailto:info@enisahealing.nl" class="hover:text-secondary-600">
                info@enisahealing.nl
              </ULink>
            </p>
            <p class="text-sm text-neutral-500">Reactie binnen 24 uur</p>
          </div>
        </div>
      </UCard>

      <!-- Location -->
      <UCard>
        <div class="flex items-start gap-4">
          <div class="bg-green-100 p-3 rounded-full">
            <UIcon name="i-mdi-map-marker" class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-900 mb-2">Locatie</h3>
            <p class="text-neutral-600 mb-2">
              Voorbeeldstraat 123<br />
              1234 AB Amsterdam
            </p>
            <p class="text-sm text-neutral-500">Gratis parkeren beschikbaar</p>
          </div>
        </div>
      </UCard>

      <!-- WhatsApp -->
      <UCard>
        <div class="flex items-start gap-4">
          <div class="bg-green-100 p-3 rounded-full">
            <UIcon name="i-mdi-whatsapp" class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-900 mb-2">WhatsApp</h3>
            <p class="text-neutral-600 mb-2">
              <ULink href="https://wa.me/31612345678" target="_blank" class="hover:text-green-600">
                +31 6 12 34 56 78
              </ULink>
            </p>
            <p class="text-sm text-neutral-500">Voor snelle vragen</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <div class="flex flex-col sm:flex-row gap-4">
      <UButton to="/boeken" size="lg" icon="i-mdi-calendar" class="flex-1">
        Boek Direct Online
      </UButton>
      <UButton href="tel:+31612345678" size="lg" variant="outline" icon="i-mdi-phone" class="flex-1">
        Bel Nu
      </UButton>
    </div>
  </div>
</template>
