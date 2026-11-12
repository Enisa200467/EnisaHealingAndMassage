<script setup lang="ts">
import {
  BUSINESS_INFO,
  getPhoneLink,
  getEmailLink,
} from "~/constants/businessInfo";

// Contact information display component
const whatsappLink = computed(() => {
  return `https://wa.me/${BUSINESS_INFO.contact.phoneInternational.replace("+", "")}`;
});
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-neutral-900 mb-8">Contactgegevens</h2>

    <!-- Contact Cards -->
    <div class="grid auto-rows-fr gap-6 mb-12">
      <!-- WhatsApp -->
      <UCard class="w-full bg-white">
        <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div class="flex flex-1 min-w-0 items-start gap-4">
            <div class="shrink-0 bg-green-100 p-3 rounded-full">
              <UIcon name="i-mdi-whatsapp" class="w-6 h-6 text-green-600" />
            </div>
            <div class="min-w-0">
              <h3 class="font-semibold text-neutral-900 mb-2">WhatsApp</h3>
              <p class="text-neutral-600 mb-2">
                <ULink
                  :href="whatsappLink"
                  target="_blank"
                  class="hover:text-green-600 font-medium"
                >
                  {{ BUSINESS_INFO.contact.phoneFormatted }}
                </ULink>
              </p>
              <p class="text-sm text-neutral-500">Ik reageer zo snel mogelijk.</p>
            </div>
          </div>
          <UButton
            :href="whatsappLink"
            target="_blank"
            size="sm"
            color="success"
            icon="i-mdi-whatsapp"
            aria-label="Open WhatsApp"
          >
            WhatsApp
          </UButton>
        </div>
      </UCard>

      <!-- Phone -->
      <UCard class="w-full bg-white">
        <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div class="flex flex-1 min-w-0 items-start gap-4">
            <div class="shrink-0 bg-primary-100 p-3 rounded-full">
              <UIcon name="i-mdi-phone" class="w-6 h-6 text-primary-600" />
            </div>
            <div class="min-w-0">
              <h3 class="font-semibold text-neutral-900 mb-2">Telefoon</h3>
              <p class="text-neutral-600 mb-2">
                <ULink
                  :href="getPhoneLink()"
                  class="hover:text-primary-600 font-medium"
                >
                  {{ BUSINESS_INFO.contact.phoneFormatted }}
                </ULink>
              </p>
              <p class="text-sm text-neutral-500">
                Tijdens behandelingen ben ik telefonisch niet bereikbaar. Stuur gerust een WhatsApp-bericht.
              </p>
            </div>
          </div>
          <UButton
            :href="getPhoneLink()"
            size="sm"
            icon="i-mdi-phone"
            aria-label="Bel nu"
          >
            Bel Nu
          </UButton>
        </div>
      </UCard>

      <!-- Practice opening hours -->
      <UCard class="w-full bg-white">
        <div class="flex min-w-0 items-start gap-4">
          <div class="shrink-0 bg-primary-100 p-3 rounded-full">
            <UIcon name="i-mdi-clock-outline" class="w-6 h-6 text-primary-600" />
          </div>
          <div class="min-w-0">
            <h3 class="font-semibold text-neutral-900 mb-2">Openingstijden praktijk</h3>
            <ul class="text-sm text-neutral-500 space-y-1">
              <li>Maandag t/m vrijdag: {{ BUSINESS_INFO.hours.monday.replace("-", "–") }}</li>
              <li>Zaterdag: {{ BUSINESS_INFO.hours.saturday.replace("-", "–") }}</li>
              <li>Zondag: {{ BUSINESS_INFO.hours.sunday }}</li>
            </ul>
          </div>
        </div>
      </UCard>

      <!-- Email -->
      <UCard class="w-full bg-white">
        <div class="flex min-w-0 items-start gap-4">
          <div class="shrink-0 bg-secondary-100 p-3 rounded-full">
            <UIcon name="i-mdi-email" class="w-6 h-6 text-secondary-600" />
          </div>
          <div class="min-w-0">
            <h3 class="font-semibold text-neutral-900 mb-2">E-mail</h3>
            <p class="text-neutral-600 mb-2">
              <ULink :href="getEmailLink()" class="break-all hover:text-secondary-600">
                {{ BUSINESS_INFO.contact.email }}
              </ULink>
            </p>
            <p class="text-sm text-neutral-500">Reactie binnen 24 uur</p>
          </div>
        </div>
      </UCard>

      <!-- KVK -->
      <UCard class="w-full bg-white">
        <div class="flex min-w-0 items-start gap-4">
          <div class="shrink-0 bg-secondary-100 p-3 rounded-full">
            <UIcon
              name="i-mdi-office-building"
              class="w-6 h-6 text-secondary-600"
            />
          </div>
          <div class="min-w-0">
            <h3 class="font-semibold text-neutral-900 mb-2">KVK nummer</h3>
            <p class="text-neutral-600 mb-2">62885081</p>
          </div>
        </div>
      </UCard>

      <!-- Location -->
      <UCard class="w-full bg-white">
        <div class="flex min-w-0 items-start gap-4">
          <div class="shrink-0 bg-green-100 p-3 rounded-full">
            <UIcon name="i-mdi-map-marker" class="w-6 h-6 text-green-600" />
          </div>
          <div class="min-w-0">
            <h3 class="font-semibold text-neutral-900 mb-2">Locatie</h3>
            <p class="text-neutral-600 mb-2">
              {{ BUSINESS_INFO.address.street }}
              {{ BUSINESS_INFO.address.houseNumber }}<br />
              {{ BUSINESS_INFO.address.postalCode }}
              {{ BUSINESS_INFO.address.city }}
            </p>
            <p class="text-sm text-neutral-500">Amsterdam Noord</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <div class="flex flex-col sm:flex-row gap-4">
      <UButton
        as="a"
        href="https://enisa-healing-massage.setmore.com"
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        icon="i-mdi-calendar"
        block
      >
        Boek Direct Online
      </UButton>
    </div>
  </div>
</template>
