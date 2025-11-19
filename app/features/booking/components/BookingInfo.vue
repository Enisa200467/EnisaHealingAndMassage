<script setup lang="ts">
import { BUSINESS_INFO } from '~/constants/businessInfo';

// Information sidebar for booking
</script>

<template>
  <div class="space-y-6">
    <!-- Contact Information -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-mdi-information" class="w-5 h-5 text-primary-500" />
          <h3 class="text-lg font-semibold">Praktische Informatie</h3>
        </div>
      </template>

      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <UIcon
            name="i-mdi-clock-outline"
            class="w-5 h-5 text-neutral-400 mt-0.5"
          />
          <div>
            <p class="font-medium text-neutral-900">Openingstijden</p>
            <div class="text-sm text-neutral-600 space-y-1">
              <p>Ma - Vr: {{ BUSINESS_INFO.hours.monday }}</p>
              <p>Za: {{ BUSINESS_INFO.hours.saturday }}</p>
              <p>Zo: {{ BUSINESS_INFO.hours.sunday }}</p>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <UIcon
            name="i-mdi-map-marker"
            class="w-5 h-5 text-neutral-400 mt-0.5"
          />
          <div>
            <p class="font-medium text-neutral-900">Locatie</p>
            <p class="text-sm text-neutral-600">
              {{ BUSINESS_INFO.address.street }} {{ BUSINESS_INFO.address.houseNumber }}<br />
              {{ BUSINESS_INFO.address.postalCode }} {{ BUSINESS_INFO.address.city }}
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <UIcon name="i-mdi-phone" class="w-5 h-5 text-neutral-400 mt-0.5" />
          <div>
            <p class="font-medium text-neutral-900">Contact</p>
            <div class="text-sm text-neutral-600 space-y-1">
              <p>{{ BUSINESS_INFO.contact.phoneFormatted }}</p>
              <p>{{ BUSINESS_INFO.contact.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Behandeling Info -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-mdi-sparkles" class="w-5 h-5 text-secondary-500" />
          <h3 class="text-lg font-semibold">Behandelingen</h3>
        </div>
      </template>

      <div class="space-y-3">
        <div class="border-l-4 border-primary-200 pl-4">
          <h4 class="font-medium text-neutral-900">Healing</h4>
          <p class="text-sm text-neutral-600">
            Energetische behandelingen voor balans en welzijn
          </p>
          <p class="text-sm text-primary-600 font-medium">Vanaf € 65</p>
        </div>

        <div class="border-l-4 border-secondary-200 pl-4">
          <h4 class="font-medium text-neutral-900">Massage</h4>
          <p class="text-sm text-neutral-600">
            Ontspanning en herstel voor lichaam en geest
          </p>
          <p class="text-sm text-secondary-600 font-medium">Vanaf € 70</p>
        </div>
      </div>
    </UCard>

    <!-- Cancellation Policy -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-mdi-calendar-remove" class="w-5 h-5 text-orange-500" />
          <h3 class="text-lg font-semibold">Afzeggingsbeleid</h3>
        </div>
      </template>

      <div class="space-y-3 text-sm text-neutral-600">
        <div class="flex items-start gap-2">
          <UIcon name="i-mdi-check" class="w-4 h-4 text-green-500 mt-0.5" />
          <p>Gratis annuleren tot 24 uur voor je afspraak</p>
        </div>
        <div class="flex items-start gap-2">
          <UIcon name="i-mdi-alert" class="w-4 h-4 text-orange-500 mt-0.5" />
          <p>
            Bij annulering binnen 24 uur rekenen we 50% van de
            behandelingskosten
          </p>
        </div>
        <div class="flex items-start gap-2">
          <UIcon name="i-mdi-close" class="w-4 h-4 text-red-500 mt-0.5" />
          <p>Bij no-show rekenen we de volledige behandelingskosten</p>
        </div>
      </div>
    </UCard>

    <!-- Help -->
    <UCard class="bg-gradient-to-br from-primary-50 to-secondary-50">
      <div class="text-center">
        <UIcon
          name="i-mdi-help-circle"
          class="w-8 h-8 text-primary-500 mx-auto mb-3"
        />
        <h3 class="font-semibold text-neutral-900 mb-2">Hulp Nodig?</h3>
        <p class="text-sm text-neutral-600 mb-4">
          Heb je vragen over het boeken of over onze behandelingen?
        </p>
        <UButton to="/contact" size="sm" variant="outline">
          Neem Contact Op
        </UButton>
      </div>
    </UCard>
  </div>
</template>
