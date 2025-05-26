<script setup lang="ts">
import ContactHero from './components/ContactHero.vue'
import ContactInfo from './components/ContactInfo.vue'
import ContactForm from './components/ContactForm.vue'
import ContactFAQ from './components/ContactFAQ.vue'
import ContactMap from './components/ContactMap.vue'
import { useContact } from './composables/useContact'

const { submitContactForm } = useContact()

useSeoMeta({
  title: 'Contact - Enisa Healing & Massage',
  description:
    'Neem contact op met Enisa voor vragen over behandelingen, tarieven of om een afspraak in te plannen. Bel, mail of gebruik ons contactformulier.',
})
</script>

<template>
  <div>
    <ContactHero />
    
    <!-- Main Content -->
    <UContainer class="py-16 sm:py-24">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm @submit="submitContactForm" />
        </div>
      </div>
    </UContainer>

    <ContactFAQ />
    <ContactMap />
  </div>
</template>
