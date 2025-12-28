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
    <div class="space-y-6 mb-12">
      <!-- Phone -->
      <UCard>
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-4">
            <div class="bg-primary-100 p-3 rounded-full">
              <UIcon name="i-mdi-phone" class="w-6 h-6 text-primary-600" />
            </div>
            <div>
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
                {{ BUSINESS_INFO.hours.schemaFormat.join(", ") }}
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

      <!-- Email -->
      <UCard>
        <div class="flex items-start gap-4">
          <div class="bg-secondary-100 p-3 rounded-full">
            <UIcon name="i-mdi-email" class="w-6 h-6 text-secondary-600" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-900 mb-2">E-mail</h3>
            <p class="text-neutral-600 mb-2">
              <ULink :href="getEmailLink()" class="hover:text-secondary-600">
                {{ BUSINESS_INFO.contact.email }}
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
              {{ BUSINESS_INFO.address.street }}
              {{ BUSINESS_INFO.address.houseNumber }}<br />
              {{ BUSINESS_INFO.address.postalCode }}
              {{ BUSINESS_INFO.address.city }}
            </p>
            <p class="text-sm text-neutral-500">Amsterdam Noord</p>
          </div>
        </div>
      </UCard>

      <!-- WhatsApp -->
      <UCard>
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-4">
            <div class="bg-green-100 p-3 rounded-full">
              <UIcon name="i-mdi-whatsapp" class="w-6 h-6 text-green-600" />
            </div>
            <div>
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
              <p class="text-sm text-neutral-500">Voor snelle vragen</p>
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
    </div>

    <!-- Quick Actions -->
    <div class="flex flex-col sm:flex-row gap-4">
      <UButton to="/boeken" size="lg" icon="i-mdi-calendar" block>
        Boek Direct Online
      </UButton>
    </div>
  </div>
</template>
